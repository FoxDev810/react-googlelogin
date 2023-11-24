import { IEmploy } from "../interface/employeeInterface";
import mongoose, { Schema, model } from "mongoose";

const employSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    age: {
        type: "string",
        required: true
    },
    salary: {
        type: "string",
        required: true
    }
});

const employeeModel = model<IEmploy>("Employees", employSchema);
export default employeeModel;