
const getVisitorMatches = async (visitorEmail: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor/${visitorEmail}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}

const addEventToVisitor = async (visitorEmail: string, eventId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor/${visitorEmail}/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
}

const checkVisitorRegistration = async (visitorEmail: string, eventId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor/${visitorEmail}/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}

const removeEventFromVisitor = async (visitorEmail: string, eventId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor/${visitorEmail}/${eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
}
export {
    getVisitorMatches,
    addEventToVisitor,
    checkVisitorRegistration,
    removeEventFromVisitor
}