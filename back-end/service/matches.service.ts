import eventDb from "../repository/event.db";
import matchesDb from "../repository/matches.db"
import playerDb from "../repository/player.db";
import { MatchesInput } from "../types";

const getPlayersByTeamAndMatch = async ( matchId: number, teamName: string) => {
 
    const IdMatches = await matchesDb.getMatchesById(matchId);

    if (!IdMatches) {
        throw new Error('Match not found');
    }

    try {
        const players = await matchesDb.getPlayersByTeamAndMatch(matchId, teamName);
        return players;
    }catch (error) {
        console.error(error);
        throw new Error('Error getting players');
    }
}

const addMatches = async (matches: MatchesInput, eventId: number) => {
    
    const IdEvent = await eventDb.getEventById(eventId);

    if (!IdEvent) {
        throw new Error('Event not found with id');
    }
    try {
    const newMatches = await matchesDb.addMatches(matches, eventId);
    return newMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error adding matches');
    }
}

const editMatches = async (matches: MatchesInput, eventId: number, matchesId: number) => {

    const IdMatches = await matchesDb.getMatchesById(matchesId);
    if (!IdMatches) {
        throw new Error('Matches not found with id');
    }
    const IdEvent = await eventDb.getEventById(eventId);
    if (!IdEvent) {
        throw new Error('Event not found with id');
    }
    try {
    const newMatches = await matchesDb.editMatches(matches, eventId, matchesId);
    return newMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error editing matches');
    }
}

const deleteMatches = async (matchesId: number) => {
    const IdMatches = await matchesDb.getMatchesById(matchesId);
    if (!IdMatches) {
        throw new Error('Matches not found with id');
    }
    try {
        const deletedMatches = await matchesDb.deleteMatches(matchesId);
        return deletedMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error deleting matches');
    }
}

const getEventNameByMatch = async (matchId: number) => {
    const IdMatches = await matchesDb.getMatchesById(matchId);
    if (!IdMatches) {
        throw new Error('Matches not found with id');
    }
    if (!matchId) {
        throw new Error('Match Id is required');
    }
    const event = await matchesDb.getEventNameByMatch(matchId);
    return event;
}


export default {   
    getPlayersByTeamAndMatch,
    addMatches,
    editMatches,
    deleteMatches,
    getEventNameByMatch,
}
