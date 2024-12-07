
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
        // Check if the match exists before attempting to delete
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
        throw new Error('Error deleting matches');
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
    
    if (!match) {
        throw new Error('Match not found');
    }

    const event = await database.event.findUnique({
        where: {
            id: match.eventId || 0, 
        },
        select: {
            name: true,
        },
    });
       
   

    return event;
}

export default {
    getPlayersByTeamAndMatch,
    addMatches,
    editMatches,
    deleteMatches,
    getEventNameByMatch,
}