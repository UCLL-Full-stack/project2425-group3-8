import database from "./database";
import { Player } from "../model/Player"; 
import { Event } from "../model/Event";    

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
        const newMatchesPrisma = await database.matches.create({
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

        const newMatches = {
            id: newMatchesPrisma.id,
            date: newMatchesPrisma.date,
            hour: newMatchesPrisma.hour,
            team1: newMatchesPrisma.team1,
            team2: newMatchesPrisma.team2,
            winner: newMatchesPrisma.winner,
            result: newMatchesPrisma.result,
            eventId: newMatchesPrisma.eventId,
        };

        return newMatches;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding match');
    }
};

const editMatches = async (matches: any, eventId: number, matchId: number) => {
    try {
        const updatedMatchPrisma = await database.matches.update({
            where: {
                id: matchId,
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

        const updatedMatch = {
            id: updatedMatchPrisma.id,
            date: updatedMatchPrisma.date,
            hour: updatedMatchPrisma.hour,
            team1: updatedMatchPrisma.team1,
            team2: updatedMatchPrisma.team2,
            winner: updatedMatchPrisma.winner,
            result: updatedMatchPrisma.result,
            eventId: updatedMatchPrisma.eventId,
        };

        return updatedMatch;
    } catch (error) {
        console.error(error);
        throw new Error('Error editing match');
    }
};

const deleteMatches = async (matchesId: number) => {
    try {
        const matchExists = await database.matches.findUnique({
            where: { id: matchesId },
        });

        if (!matchExists) {
            console.log(`Match with ID ${matchesId} does not exist.`);
            return { success: false, message: 'Match not found' };
        }

        await database.playerMatches.deleteMany({
            where: { matchesId },
        });

        const deletedMatches = await database.matches.delete({
            where: { id: matchesId },
        });

        return { success: true, deletedMatches };
    } catch (error) {
        console.error('Error during deletion:', error);
        throw new Error('Error deleting match');
    }
};

const getEventNameByMatch = async (matchId: number) => {
    const match = await database.matches.findUnique({
        where: {
            id: matchId,
        },
        select: {
            eventId: true,
        },
    });

    if (!match || !match.eventId) {
        throw new Error('Match or Event not found');
    }

    const eventPrisma = await database.event.findUnique({
        where: {
            id: match.eventId, 
        },
        select: {
            id: true,
            name: true,
            startDate: true,
            endDate: true,
            sportid: true,
            locationid: true,
        },
    });

    if (!eventPrisma) {
        throw new Error('Event not found');
    }

    const event = Event.from(eventPrisma); 
    return event;
};


export default {
    getPlayersByTeamAndMatch,
    addMatches,
    editMatches,
    deleteMatches,
    getEventNameByMatch,
};
