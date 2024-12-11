
const getVisitorMatches = async (visitorEmail: string) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor/${visitorEmail}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token }
    })
}

const addEventToVisitor = async (visitorEmail: string, eventId: number) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor/${visitorEmail}/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token }
    })
}

const checkVisitorRegistration = async (visitorEmail: string, eventId: number) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor/${visitorEmail}/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token }
    })
}

const removeEventFromVisitor = async (visitorEmail: string, eventId: number) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitor/${visitorEmail}/${eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token }
    })
}
export {
    getVisitorMatches,
    addEventToVisitor,
    checkVisitorRegistration,
    removeEventFromVisitor
}