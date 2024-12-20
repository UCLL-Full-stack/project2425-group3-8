import MatchesOverview from '@components/matches/MatchesOverview';

const getPlayersByTeamAndMatch = async (matchesId: number, teamName: string) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${matchesId}/${teamName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token },
    });
};

const addMatches = async (matches: any, eventId: number) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token },
        body: JSON.stringify(matches),
    });
};

const editMatches = async (matches: any, eventId: number, matchesId: number) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${eventId}/${matchesId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token },
        body: JSON.stringify(matches),
    });
};

const deleteMatches = async (matchesId: number) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${matchesId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token },
    });
};

const getMatchesForEvent = async (eventId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

const getEventNameByMatch = async (matchId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${matchId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export {
    getPlayersByTeamAndMatch,
    addMatches,
    editMatches,
    deleteMatches,
    getMatchesForEvent,
    getEventNameByMatch,
};
