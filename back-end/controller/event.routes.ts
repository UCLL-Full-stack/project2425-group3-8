import express, { Request, Response } from "express";
import eventService from "../service/event.service";

const eventRouter = express.Router();

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get a list of all events
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   endDate:
 *                     type: string
 *                   locationId:
 *                     type: number
 *                   sportId:
 *                     type: number
 */
eventRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await eventService.getAllEvents();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events' });
    }
});

/**
 * @swagger
 * /event/{name}:
 *   get:
 *     summary: Get event by name
 *     parameters:
 *       - name: name
 *         in: path
 *         description: Name of the event to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                 endDate:
 *                   type: string
 *                 locationId:
 *                   type: number
 *                 sportId:
 *                   type: number
 *       404:
 *         description: Event not found
 */
eventRouter.get('/:name', async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const event = await eventService.getEventByName(name);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving event' });
    }
});

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update an event
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The event ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start date of the event (ISO 8601 format)
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: The end date of the event (ISO 8601 format)
 *               location:
 *                 type: object
 *                 description: The location of the event
 *                 properties:
 *                   city:
 *                     type: string
 *                     description: The city where the event is held
 *                   cityCode:
 *                     type: string
 *                     description: The city code (e.g., postal code)
 *                   street:
 *                     type: string
 *                     description: The street address of the event location
 *                   number:
 *                     type: number
 *                     description: The street number
 *               sport:
 *                 type: object
 *                 description: The sport related to the event
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the sport
 *                   playerCount:
 *                     type: number
 *                     description: The number of players in the sport
 *     responses:
 *       400:
 *         description: Event successfully updated
 *         content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: The unique identifier of the event
 *               name:
 *                 type: string
 *                 description: The updated name of the event
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated start date of the event (ISO 8601 format)
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated end date of the event (ISO 8601 format)
 *               location:
 *                 type: object
 *                 description: The updated location of the event
 *                 properties:
 *                   city:
 *                     type: string
 *                     description: The city where the event is held
 *                   cityCode:
 *                     type: string
 *                     description: The city code (e.g., postal code)
 *                   street:
 *                     type: string
 *                     description: The street address of the event location
 *                   number:
 *                     type: number
 *                     description: The street number
 *               sport:
 *                 type: object
 *                 description: The updated sport related to the event
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the sport
 *                   playerCount:
 *                     type: number
 *                     description: The number of players in the sport
 */
eventRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedEvent = await eventService.updateEvent(id, updateData);
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating event' });
    }
});

/**
 * @swagger
 * /event/delete/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Deletes an event by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 location:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                     cityCode:
 *                       type: string
 *                     street:
 *                       type: string
 *                     number:
 *                       type: integer
 *                 sport:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     playerCount:
 *                       type: integer
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
eventRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedEvent = await eventService.deleteEvent(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(deletedEvent);
    } catch (error) {
        console.error(error); 
        if (error instanceof Error) {
            res.status(400).json({ message: 'Failed to delete event', error: error.message });
        } else {
            res.status(400).json({ message: 'Internal Server Error', error: String(error) });
        }
    }
}
);

/**
 * @swagger
 * /event/add:
 *   post:
 *     summary: Add a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   cityCode:
 *                     type: string
 *                   street:
 *                     type: string
 *                   number:
 *                     type: number
 *               sport:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   playerCount:
 *                     type: number
 *     responses:
 *       200:
 *         description: Event added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
 *                 location:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                     cityCode:
 *                       type: string
 *                     street:
 *                       type: string
 *                     number:
 *                       type: number
 *                 sport:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     playerCount:
 *                       type: number
 */
eventRouter.post('/add', async (req: Request, res: Response) => {
    const event = req.body;
    try {
        const newEvent = await eventService.addEvent(event);
        res.status(200).json(newEvent);
    } catch (error) {
        console.error(error); 
        if (error instanceof Error) {
            res.status(400).json({ message: 'Failed to add event', error: error.message });
        } else {
            res.status(400).json({ message: 'Internal Server Error', error: String(error) });
        }
    }
}
);


export { eventRouter };
