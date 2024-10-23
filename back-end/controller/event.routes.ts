import express, { Request, Response } from "express";
import eventService from "../service/event.service";

const eventRouter = express.Router()

eventRouter.get('/', async (req: Request, res: Response) => {
    try{
        const result = await eventService.getAllEvents();
        res.status(200).json(result) 
    }catch{

    }
})

eventRouter.get('/:name', async (req: Request, res: Response) => {
    const name = req.params.name
    try{
        const event = await eventService.getEventByName(name);
        res.status(200).json(event)
    }catch{
        
    }
})

export { eventRouter }