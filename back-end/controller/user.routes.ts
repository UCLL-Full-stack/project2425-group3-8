import express, { Request, Response } from "express";
import userService from "../service/user.service";
import { UserInput } from "../types";
import adminService from "../service/admin.service";

const userRouter = express.Router()

userRouter.post('/', async (req: Request, res: Response) => {
    try{
        try{
            const userInput: UserInput = req.body;
            const result = await userService.getUserByEmail(userInput);
            res.status(200).json(result)
        } catch(error){
            throw error
        }
        try{
            const userInput: UserInput = req.body;
            const result = await adminService.getAdminByEmail(userInput);
            res.status(200).json(result)
        } catch(error){
            throw error
        }


    }catch(error){
        
       res.status(400).json({ message: error })
    }
})

export { userRouter }