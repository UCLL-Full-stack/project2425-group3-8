import database from "./database"

const addPlayerToMatch = async (playerId: number, matchesId: number ) => {
    try {
        const player = await database.player.findUnique({
            where: { playerId: playerId },
        });

        if (!player) {
            throw new Error('Player not found');
        }

        const match = await database.matches.findUnique({
            where: { id : matchesId },
        });

        if (!match) {
            throw new Error('Match not found');
        }

        const existingPlayerMatch = await database.playerMatches.findFirst({
            where: {
                playerId: playerId,
                matchesId: matchesId,
            },
        });

        if (existingPlayerMatch) {
            throw new Error('Player already in match');
        }

        const newPlayerMatch = await database.playerMatches.create({
            data: {
                playerId: playerId,
                matchesId: matchesId,
            },
        });

        return newPlayerMatch;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding player to match');
    }
}

const removePlayerFromMatch = async (playerId: number, matchId: number) => {
    try {
        const playerMatch = await database.playerMatches.findFirst({
            where: {
                playerId: playerId,
                matchesId: matchId,
            },
        });

        if (!playerMatch) {
            throw new Error('Player is not part of this match');
        }

        const removedPlayerFromMatch = await database.playerMatches.delete({
            where: {
                id: playerMatch.id,
            },
        });

        return removedPlayerFromMatch;
    } catch (error) {
        console.error(error);
        throw new Error('Error removing player from match');
    }
}

const getAllPlayers = async () => {
    try {
        const players = await database.player.findMany({
            include: {
                user: true,    
            },
        });

        return players;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting players');
    }
}

const getPlayerByEmail = async (email: string): Promise<boolean> => {
    try {

        const UserPrisma = await database.user.findFirst({
            where:{
                email: email
            }
        })  

        const playerPrisma = await database.player.findFirst({
            where:{
                userId: UserPrisma?.id
            },
            include: {
                user: true,
                address: true
            }
        })

        if (playerPrisma === null) {
            return false
        }

        return true
    } catch (error) {
        throw error
    }
}

const getPlayerMatches = async (userId: number) => {
    try {
        const player = await database.player.findUnique({
            where: { userId: userId },
        });

        if (!player) {
            throw new Error('Player not found');
        }

        const playerMatches = await database.playerMatches.findMany({
            where: {
                playerId: player.playerId,
            },
        });

      


        const matches = await database.matches.findMany({
            where: {
                id: {
                    in: playerMatches.map((playerMatch) => playerMatch.matchesId),
                },
            },
        });


        return matches;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting player matches');
    }
}

export default {
    addPlayerToMatch,
    removePlayerFromMatch,
    getAllPlayers,
    getPlayerByEmail,
    getPlayerMatches,
}