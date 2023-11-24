import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import config from "config";
import IUser from "../interface/userInterface";
import {
  findAndUpdateUser,
  getGoogleUser,
  getGoogleOauthTokens,
} from "../services/users.services";
import { Request, Response } from "express";

import "express-session";
declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    let user = await userModel.findOne({ email });


    if (user) {
      res.json({ msg: "User Already Exists..." });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      user = new userModel({
        ...req.body,
        password: hashPassword,
      });

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      user.rf_token = refresh_token;
      const result = await user.save();

      console.log(result)

      res.json({
        msg: "Register Success!",
        access_token,
        user: result,
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Initial Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      const userData = await userModel.findById({ _id: user._id });

      const access_token = generateAccessToken({ id: userData?._id });
      const refresh_token = generateRefreshToken({ id: userData?._id }, res);

      await userModel.findOneAndUpdate(
        { _id: userData?._id },
        {
          rf_token: refresh_token,
        }
      );
      res
        .status(200)
        .send({ user: userData, msg: "Login Success...", access_token });
    } else {
      res.status(404).send({ error: "User Not Found..." });
    }
  } catch (error) {
    res.status(500).send({ msg: "Initial Server Error" });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    const { access_token, id_token } = await getGoogleOauthTokens({ code });
    const googleUser = await getGoogleUser({ access_token, id_token });

    if (!googleUser.verified_email)
      return res.status(403).send("Email is not verified");

    const user = await findAndUpdateUser(
      { email: googleUser.email },
      { email: googleUser.email, name: googleUser.name },
      { new: true, upsert: true }
    );

    if (!user) return res.status(404).send("User not found");

    const accessToken = generateAccessToken({ id: user?._id });
    const refreshToken = generateRefreshToken({ id: user?._id }, res);

    return res.redirect(`${config.get("origin")}`);
  } catch (e) {
    console.log(e);
    return res.redirect(`${config.get("origin")}/users/login`);
  }
};
