import { Router } from "express";
import visitorService from "../service/visitor.service";

const VistorRouter = Router();


/**
 * @swagger
 * /visitor/{id}:
 *   get:
 *     summary: Get Events by visitor id
 *     description: Get events by visitor id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the visitor
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: events found for visitor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fullName:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 visitorId:
 *                   type: integer
 *                 address:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     street:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     zip:
 *                       type: string
 *       400:
 *         description: Error getting events for the visitor
 */
VistorRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const visitor = await visitorService.getMyRegisteredEvents(parseInt(id));
        res.status(200).json(visitor);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error getting visitor");
    }
});

export default VistorRouter;