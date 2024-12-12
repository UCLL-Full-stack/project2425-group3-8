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
 *           type: integer
 *         name:
 *           type: string
 *         startDate:
 *           type: string
 *         endDate:
 *           type: string
 *         sport:
 *           $ref: '#/components/schemas/Sport'
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         matches:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Matches'
 *         visitors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Visitor'
 */

import { Router } from "express";
import visitorService from "../service/visitor.service";

const VistorRouter = Router();

/**
 * @swagger
 * /visitor/{email}:
 *   get:
 *     security:
 *      - bearerAuth: [] 
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
 *     security:
 *      - bearerAuth: []
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
    console.log(req)
    const { email, eventId } = req.params;
    try {
        const addedEventToVisitor = await visitorService.addEventToVisitor(email, parseInt(eventId));
        res.status(200).json(addedEventToVisitor);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error adding event to visitor");
    }
});


/**
 * @swagger
 * /visitor/{email}/{eventId}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Check visitor registration
 *     description: Check if the visitor is registered for the event.
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
 *         description: Visitor registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 registered:
 *                   type: boolean
 *       400:
 *         description: Error checking visitor registration
 */
VistorRouter.get("/:email/:eventId", async (req, res) => {
    const { email, eventId } = req.params;
    try {
        const visitorRegistration = await visitorService.checkVisitorRegistration(email, parseInt(eventId));
        res.status(200).json(visitorRegistration);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error checking visitor registration");
    }
});


/**
 * @swagger
 * /visitor/{email}/{eventId}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Remove event from visitor
 *     description: Remove an event from the visitor's list of registered events.
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
 *         description: Event removed from visitor
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
 *         description: Error removing event from visitor
 */
VistorRouter.delete("/:email/:eventId", async (req, res) => {
    const { email, eventId } = req.params;
    try {
        const removedEventFromVisitor = await visitorService.removeEventFromVisitor(email, parseInt(eventId));
        res.status(200).json(removedEventFromVisitor);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error removing event from visitor");
    }
});
export default VistorRouter;