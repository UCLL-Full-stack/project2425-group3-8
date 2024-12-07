import playerDb from "../repository/player.db"

const addPlayerToMatch = async (playerId: number, matchesId: number ) => {
    if (!playerId) {
        throw new Error('Player Id is required');
    }
    if (!matchesId) {
        throw new Error('Match Id is required');
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
    if (!playerId) {
        throw new Error('Player Id is required');
    }
    if (!matchId) {
        throw new Error('Match Id is required');
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
    if (!playerEmail) {
        throw new Error('Player email is required');
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