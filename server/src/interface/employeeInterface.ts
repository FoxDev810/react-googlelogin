import { Document } from "mongoose"

export interface IEmploy extends Document{
    _id: string,
    name: string,
    age: string,
    salary: string
}