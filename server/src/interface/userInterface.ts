export default interface IUser{
    _id: string;
    name: string;
    companyname: string;
    email:string;
    password:string;
    rf_token?: string
}