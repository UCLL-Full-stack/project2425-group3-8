
import database from "./database";

const getPlayersByTeamAndMatch = async ( matchId: number, teamName: string) => {
    const players = await database.player.findMany({
        where: {
            matches: {
                some: {
                    matchesId: matchId, 
                },
            },
            team: teamName, 
        },
        include: {
            user: true, 
            address: true, 
            matches: {
                include: {
                    match: true, 
                },
            },
        },
    });

    return players;
}

const addMatches = async (matches: any, eventId: number) => {
    try {
    const newMatches = await database.matches.create({
        data: {
            date: matches.date,
            hour: matches.hour,
            event: {
                connect: {
                    id: eventId, 
                },
            },
            team1: matches.team1,
            team2: matches.team2,
        },
    });
    return newMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error adding matches');
    }
}

const editMatches = async (matches: any, eventId: number, matchesId: number) => {
    try {
    const newMatches = await database.matches.update({
        where: {
            id: matchesId,
        },
        data: {
            date: matches.date,
            hour: matches.hour,
            event: {
                connect: {
                    id: eventId, 
                },
            },
            team1: matches.team1,
            team2: matches.team2,
            winner: matches.winner,
            result: matches.result,
        },
    });
    return newMatches;
    }catch (error) {
        console.error(error);
        throw new Error('Error adding matches');
    }
}

const deleteMatches = async (matchesId: number) => {
    try {
        await database.playerMatches.deleteMany({
            where: {
                matchesId: matchesId,
            },
        });

        const deletedMatches = await database.matches.delete({
            where: {
                id: matchesId,
            },
        });

        return deletedMatches;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting matches');
    }
};

export default {
    getPlayersByTeamAndMatch,
    addMatches,
    editMatches,
    deleteMatches,
}