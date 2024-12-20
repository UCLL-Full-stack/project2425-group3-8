/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         locationId:
 *           type: number
 *         sportId:
 *           type: number
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         sport:
 *           $ref: '#/components/schemas/Sport'
 *     Location:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *         cityCode:
 *           type: string
 *         street:
 *           type: string
 *         number:
 *           type: number
 *     Sport:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         playerCount:
 *           type: number
 *     Matches:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         winner:
 *           type: string
 *         result:
 *           type: string
 *         date:
 *           type: Date
 *         hour:
 *           type: string
 *         team1:
 *           type: string
 *         team2:
 *           type: string
 *         eventId:
 *           type: number
 *     Visitor:
 *       type: object
 *       properties:
 *         visitorId:
 *           type: number
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             cityCode:
 *               type: string
 *             street:
 *               type: string
 *             number:
 *               type: number
 *         event:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             startDate:
 *               type: string
 *               format: date-time
 *             endDate:
 *               type: string
 *               format: date-time
 *             location:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                 cityCode:
 *                   type: string
 *                 street:
 *                   type: string
 *                 number:
 *                   type: number
 *             sport:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 playerCount:
 *                   type: number
 */

import express, { Request, Response } from "express";
import eventService from "../service/event.service";
import { EventInput, EventInputPost } from "../types";

const eventRouter = express.Router();

/**
 * @swagger
 * /event:
 *   get:
 *     security:
 *      - bearerAuth: [] 
 *     summary: Get a list of all events
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
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
 *     security:
 *      - bearerAuth: [] 
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
 *               $ref: '#/components/schemas/Event'
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
 *     security:
 *      - bearerAuth: [] 
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
 *         description: Event successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */
eventRouter.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updateData: EventInput = req.body;

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
 *     security:
 *      - bearerAuth: []
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
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */
eventRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
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
});

/**
 * @swagger
 * /event/add:
 *   post:
 *     security:
 *      - bearerAuth: []
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
 *               $ref: '#/components/schemas/Event'
 */
eventRouter.post('/add', async (req: Request, res: Response) => {
    const event: EventInputPost = req.body;
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
});

export { eventRouter };
