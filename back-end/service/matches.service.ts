import matchesDb from "../repository/matches.db"

const getPlayersByTeamAndMatch = async ( matchId: number, teamName: string) => {
    if (!matchId) {
        throw new Error('Match Id is required');
    }
    if (!teamName) {
        throw new Error('Team Name is required');
    }

    try {
        const players = await matchesDb.getPlayersByTeamAndMatch(matchId, teamName);
        return players;
    }catch (error) {
        console.error(error);
        throw new Error('Error getting players');
    }
}

const addMatches = async (matches: any, eventId: number) => {
    if (!matches) {
        throw new Error('Matches are required');
    }
    if (!eventId) {
        throw new Error('Event Id is required');
    }
    try {
    const newMatches = await matchesDb.addMatches(matches, eventId);
    return newMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error adding matches');
    }
}

const editMatches = async (matches: any, eventId: number, matchesId: number) => {
    if (!matches) {
        throw new Error('Matches are required');
    }
    if (!eventId) {
        throw new Error('Event Id is required');
    }
    if (!matchesId) {
        throw new Error('Matches Id is required');
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
    if (!matchesId) {
        throw new Error('Matches Id is required');
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
