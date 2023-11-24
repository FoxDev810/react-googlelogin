import {Response,Request ,NextFunction } from "express"
export const isAuth = async(req:Request, res:Response, next:NextFunction)=>{
    if(req.session){
    }else{
        res.status(401).send({message:"Login First"})
    }
    next();
}