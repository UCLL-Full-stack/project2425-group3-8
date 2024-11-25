import express, { Request, Response } from "express";
import matchesService from "../service/matches.service";

const matchesRouter = express.Router();

/**
 * @swagger
 * /matches/{matchesid}/{teamname}:
 *   get:
 *     summary: Get players by match ID and team name
 *     description: Retrieve all players from a specific team playing in a specific match.
 *     parameters:
 *       - name: matchesid
 *         in: path
 *         description: ID of the match
 *         required: true
 *         schema:
 *           type: integer
 *       - name: teamname
 *         in: path
 *         description: Name of the team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of players for the team in the match
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
 *                   team:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   experience:
 *                     type: integer
 *       404:
 *         description: Players not found
 *       400:
 *         description: Error fetching players
 */
matchesRouter.get("/:matchesid/:teamname", async (req: Request, res: Response) => {
    const { matchesid, teamname } = req.params;
    try{
        const players = await matchesService.getPlayersByTeamAndMatch(parseInt(matchesid), teamname);
        if(players){
            res.status(200).json(players);
        }else{
            res.status(404).json("Players not found");
        }
    }catch(error){
        console.error(error);
        res.status(400).json("error getting players");
    }
});

/**
 * @swagger
 * /matches/{id}:
 *   post:
 *     summary: Add matches
 *     description: Add matches to an event
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the event
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               team1:
 *                 type: string
 *               team2:
 *                 type: string
 *     responses:
 *       200:
 *         description: New matches added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date
 *                 time:
 *                   type: string
 *                 team1:
 *                   type: string
 *                 team2:
 *                   type: string
 *       400:
 *         description: Error adding matches
 */
matchesRouter.post("/:id", async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id);
    const matches = req.body;
    try {
        const newMatches = await matchesService.addMatches(matches, eventId);
        res.status(200).json(newMatches);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error adding matches");
    }
});

/**
 * @swagger
 * /matches/{EventId}/{MatchesId}:
 *   put:
 *     summary: Edit matches
 *     description: Edit matches from an event, including winner and result.
 *     parameters:
 *       - name: EventId
 *         in: path
 *         description: ID of the event
 *         required: true
 *         schema:
 *           type: integer
 *       - name: MatchesId
 *         in: path
 *         description: ID of the matches
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               team1:
 *                 type: string
 *               team2:
 *                 type: string
 *               winner:
 *                 type: string
 *                 description: The team that won the match
 *               result:
 *                 type: string
 *                 description: The result of the match (e.g., score)
 *     responses:
 *       200:
 *         description: Matches edited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date
 *                 time:
 *                   type: string
 *                 team1:
 *                   type: string
 *                 team2:
 *                   type: string
 *                 winner:
 *                   type: string
 *                 result:
 *                   type: string
 *       400:
 *         description: Error editing matches
 */
matchesRouter.put("/:EventId/:MatchesId", async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.EventId);
    const matchesId = parseInt(req.params.MatchesId);
    const matches = req.body;
    try {
        const newMatches = await matchesService.editMatches(matches, eventId, matchesId);
        res.status(200).json(newMatches);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error editing matches");
    }
});

/**
 * @swagger
 * /matches/{MatchesId}:
 *   delete:
 *     summary: Delete matches
 *     description: Delete matches from an event
 *     parameters:
 *       - name: MatchesId
 *         in: path
 *         description: ID of the matches
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matches deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date
 *                 time:
 *                   type: string
 *                 team1:
 *                   type: string
 *                 team2:
 *                   type: string
 *                 winner:
 *                   type: string
 *                 result:
 *                   type: string
 *       400:
 *         description: Error deleting matches
 */
matchesRouter.delete("/:MatchesId", async (req: Request, res: Response) => {
    const matchesId = parseInt(req.params.MatchesId);
    try {
        const deletedMatches = await matchesService.deleteMatches(matchesId);
        res.status(200).json(deletedMatches);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error deleting matches");
    }
}
);

export default matchesRouter;
