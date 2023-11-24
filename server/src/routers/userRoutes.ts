import  express  from "express";
const userRouter = express();

import { register, login, googleLogin } from "../controller/userController";
import { isAuth } from "../middleware/isAuth";

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/google", googleLogin)

export default userRouter;