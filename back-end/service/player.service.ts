import matchesDb from "../repository/matches.db";
import playerDb from "../repository/player.db"

const addPlayerToMatch = async (playerId: number, matchesId: number ) => {
    const IdPlayer = await playerDb.getPlayerById(playerId);
    if (!IdPlayer) {
        throw new Error('Player not found with id');
    }
    const IdMatches = await matchesDb.getMatchesById(matchesId);
    if (!IdMatches) {
        throw new Error('Matches not found with id');
    }
    try {
        const addedPlayerToMatch = await playerDb.addPlayerToMatch(playerId, matchesId);
        return addedPlayerToMatch;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding player to match');
    }
}

const removedPlayerFromMatch = async (playerId: number, matchId: number) => {
    const IdPlayer = await playerDb.getPlayerById(playerId);
    if (!IdPlayer) {
        throw new Error('Player not found with id');
    }

    const IdMatches = await matchesDb.getMatchesById(matchId);
    if (!IdMatches) {
        throw new Error('Match not found with id');
    }

    try {
        const removedPlayerFromMatch = await playerDb.removePlayerFromMatch(playerId, matchId);
        return removedPlayerFromMatch;
    } catch (error) {
        console.error(error);
        throw new Error('Error removing player from match');
    }
}

const getAllPlayers = async () => {
    try {
        const players = await playerDb.getAllPlayers();
        return players;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting players');
    }
}

const getPlayerMatches = async (playerEmail: string) => {
    const IdPlayer = await playerDb.getPlayerByEmail(playerEmail);
    if (!IdPlayer) {
        throw new Error('Player not found with email');
    }
    
    try {
        const playerMatches = await playerDb.getPlayerMatches(playerEmail);
        return playerMatches;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting player matches');
    }
}

export default {
    addPlayerToMatch,
    removedPlayerFromMatch,
    getAllPlayers,
    getPlayerMatches
}