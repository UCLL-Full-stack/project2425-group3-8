import MatchesOverview from "@components/matches/MatchesOverview"

const getPlayersByTeamAndMatch = async (matchesId: number, teamName: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${matchesId}/${teamName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}

const addMatches = async (matches: any, eventId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matches)
    })
}

const editMatches = async (matches: any, eventId: number, matchesId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${eventId}/${matchesId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matches)
    })
}

const deleteMatches = async (matchesId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${matchesId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
}

const getMatchesForEvent = async (eventId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}

const getEventNameByMatch = async (matchId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${matchId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}

export { 
    getPlayersByTeamAndMatch,
    addMatches,
    editMatches,
    deleteMatches,
    getMatchesForEvent,
    getEventNameByMatch
 }

