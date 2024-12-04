
const addPlayerToMatch = async (playerId: number, matchesId: number ) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${matchesId}/${playerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
}

const removedPlayerFromMatch = async (playerId: number, matchId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${matchId}/${playerId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
}

const getAllPlayers = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}

const getPlayerMatches = async (playerEmail: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${playerEmail}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}


export {
    removedPlayerFromMatch,
    addPlayerToMatch,
    getAllPlayers,
    getPlayerMatches
}