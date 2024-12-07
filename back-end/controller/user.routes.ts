import express, { NextFunction, Request, Response } from "express";
import userService from "../service/user.service";
import { UserInput } from "../types";
import adminService from "../service/admin.service";

const userRouter = express.Router()

userRouter.post('/', async (req: Request, res: Response) => {
    try{
        try{
            const userInput: UserInput = req.body;
            const result1 = await userService.getUserByEmail(userInput);
            const role = await userService.getRole(userInput)
            
            res.status(200).json({result1, role, id: result1.getId()})
        } catch(error){
            throw error
        }
    }catch(error){
        if (error instanceof Error) {
            console.log(error.message); // Now TypeScript is happy
            res.status(400).json({ message: error.message });
        } else {
            console.log("An unknown error occurred", error);
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
})

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({message: 'Authentication succesful', ...response })
    } catch (error){
        next(error)
    }
})

export { userRouter }

