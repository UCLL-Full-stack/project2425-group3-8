
const addPlayerToMatch = async (playerId: number, matchesId: number ) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${matchesId}/${playerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token }
    })
}

const removedPlayerFromMatch = async (playerId: number, matchId: number) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${matchId}/${playerId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token }
    })
}

const getAllPlayers = async () => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token }
    })
}

const getPlayerMatches = async (playerEmail: string) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${playerEmail}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token }
    })
}


export {
    removedPlayerFromMatch,
    addPlayerToMatch,
    getAllPlayers,
    getPlayerMatches
}