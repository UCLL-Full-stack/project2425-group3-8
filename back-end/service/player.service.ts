import playerDb from "../repository/player.db"

const addPlayerToMatch = async (playerId: number, matchesId: number ) => {
    try {
        const addedPlayerToMatch = await playerDb.addPlayerToMatch(playerId, matchesId);
        return addedPlayerToMatch;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding player to match');
    }
}

const removedPlayerFromMatch = async (playerId: number, matchId: number) => {
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

const getPlayerMatches = async (playerId: number) => {
    try {
        const playerMatches = await playerDb.getPlayerMatches(playerId);
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