import IUser from "../interface/userInterface";
import mongoose, {model} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    companyname: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true
    },
    rf_token: {
        type: "string",
    }
});

const userModel = model<IUser>("Users", userSchema);
export default userModel;