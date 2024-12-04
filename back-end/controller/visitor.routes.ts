import { Router } from "express";
import visitorService from "../service/visitor.service";

const VistorRouter = Router();

/**
 * @swagger
 * /visitor/{email}:
 *   get:
 *     summary: Get visitor by email
 *     description: Retrieve all events that the visitor has registered for.
 *     parameters:
 *       - name: email
 *         in: path
 *         description: Email of the visitor
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events that the visitor has registered for
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   sport:
 *                     type: string
 *                   location:
 *                     type: string
 *                   date:
 *                     type: string
 *                   time:
 *                     type: string
 *                   price:
 *                     type: number
 *                   capacity:
 *                     type: integer
 *                   registered:
 *                     type: integer
 *       400:
 *         description: Error getting visitor
 */
VistorRouter.get("/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const visitor = await visitorService.getMyRegisteredEvents(email);
        res.status(200).json(visitor);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error getting visitor");
    }
});


/**
 * @swagger
 * /visitor/{email}/{eventId}:
 *   post:
 *     summary: Add event to visitor
 *     description: Add an event to the visitor's list of registered events.
 *     parameters:
 *       - name: email
 *         in: path
 *         description: Email of the visitor
 *         required: true
 *         schema:
 *           type: string
 *       - name: eventId
 *         in: path
 *         description: ID of the event
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event added to visitor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 sport:
 *                   type: string
 *                 location:
 *                   type: string
 *                 date:
 *                   type: string
 *                 time:
 *                   type: string
 *                 price:
 *                   type: number
 *                 capacity:
 *                   type: integer
 *                 registered:
 *                   type: integer
 *       400:
 *         description: Error adding event to visitor
 */
VistorRouter.post("/:email/:eventId", async (req, res) => {
    const { email, eventId } = req.params;
    try {
        const addedEventToVisitor = await visitorService.addEventToVisitor(email, parseInt(eventId));
        res.status(200).json(addedEventToVisitor);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error adding event to visitor");
    }
});
export default VistorRouter;