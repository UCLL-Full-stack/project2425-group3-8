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
            const role = await userService.getRole(userInput)

            res.status(200).json({result, role})
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

export { userRouter }

