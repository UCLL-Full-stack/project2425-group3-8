import express, { Request, Response } from "express";
import userService from "../service/user.service";
import { UserInput } from "../types";

const userRouter = express.Router()

userRouter.get('/', async (req: Request, res: Response) => {
    try{
        const userInput: UserInput = req.body;
        const result = await userService.getUserByEmail(userInput);
        res.status(200).json(result) 
    }catch{

    }
})

// scheduleRouter.post('/', async (req: Request, res: Response) => {
//     try {
//         const scheduleInput: ScheduleInput = req.body;
//         const newSchedule = await scheduleService.createSchedule(scheduleInput);
//         return res.status(200).json(newSchedule);
//     }catch (error) {
//         return res.status(404).json({ message: (error as Error).message });
//     }
// });


export { userRouter }