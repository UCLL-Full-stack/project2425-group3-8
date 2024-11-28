import { Router } from "express";
import playerService from "../service/player.service";


const playerRouter = Router();

/**
 * @swagger
 * /player/{matchId}/{playerId}:
 *   post:
 *     summary: Add player to match
 *     description: Add a player to a match
 *     parameters:
 *       - name: matchId
 *         in: path
 *         description: ID of the match
 *         required: true
 *         schema:
 *           type: integer
 *       - name: playerId
 *         in: path
 *         description: ID of the player
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player added to match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playerId:
 *                   type: integer
 *                 matchesId:
 *                   type: integer
 *       400:
 *         description: Error adding player to match
 */
playerRouter.post("/:matchId/:playerId", async (req, res) => {
    const { matchId, playerId } = req.params;
    try {
        const addedPlayerToMatch = await playerService.addPlayerToMatch(parseInt(playerId), parseInt(matchId));
        res.status(200).json(addedPlayerToMatch);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error adding player to match");
    }
});

/**
 * @swagger
 * /player/{matchId}/{playerId}:
 *   delete:
 *     summary: Remove player from match
 *     description: Remove a player from a match
 *     parameters:
 *       - name: matchId
 *         in: path
 *         description: ID of the match
 *         required: true
 *         schema:
 *           type: integer
 *       - name: playerId
 *         in: path
 *         description: ID of the player
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player removed from match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playerId:
 *                   type: integer
 *                 matchesId:
 *                   type: integer
 *       400:
 *         description: Error removing player from match
 */
playerRouter.delete("/:matchId/:playerId", async (req, res) => {
    const { matchId, playerId } = req.params;
    try {
        const removedPlayerFromMatch = await playerService.removedPlayerFromMatch(parseInt(playerId), parseInt(matchId));
        res.status(200).json(removedPlayerFromMatch);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error removing player from match");
    }
});

/**
 * @swagger
 * /player:
 *   get:
 *     summary: Get all players
 *     description: Get all players
 *     responses:
 *       200:
 *         description: All players
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
 *                   age:
 *                     type: integer
 *                   team:
 *                     type: string
 *       400:
 *         description: Error getting players
 */
playerRouter.get("/", async (req, res) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error getting players");
    }
});

/**
 * @swagger
 * /player/{playerId}:
 *   get:
 *     summary: Get player matches
 *     description: Get all matches of a player
 *     parameters:
 *       - name: playerId
 *         in: path
 *         description: ID of the player
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   winner:
 *                     type: string
 *                   result:
 *                     type: string
 *                   date:
 *                     type: string
 *                   hour:
 *                     type: string
 *                   team1:
 *                     type: string
 *                   team2:
 *                     type: string
 *       400:
 *         description: Error getting player matches
 */
playerRouter.get("/:playerId", async (req, res) => {
    const { playerId } = req.params;
    try {
        const playerMatches = await playerService.getPlayerMatches(parseInt(playerId));
        res.status(200).json(playerMatches);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error getting player matches");
    }
});


export default playerRouter;