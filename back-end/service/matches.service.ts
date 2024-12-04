import matchesDb from "../repository/matches.db"

const getPlayersByTeamAndMatch = async ( matchId: number, teamName: string) => {
    try {
        const players = await matchesDb.getPlayersByTeamAndMatch(matchId, teamName);
        return players;
    }catch (error) {
        console.error(error);
        throw new Error('Error getting players');
    }
}

const addMatches = async (matches: any, eventId: number) => {
    try {
    const newMatches = await matchesDb.addMatches(matches, eventId);
    return newMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error adding matches');
    }
}

const editMatches = async (matches: any, eventId: number, matchesId: number) => {
    try {
    const newMatches = await matchesDb.editMatches(matches, eventId, matchesId);
    return newMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error editing matches');
    }
}

const deleteMatches = async (matchesId: number) => {
    try {
        const deletedMatches = await matchesDb.deleteMatches(matchesId);
        return deletedMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error deleting matches');
    }
}

const getEventNameByMatch = async (matchId: number) => {
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
