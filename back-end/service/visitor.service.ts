import visitorDb from "../repository/visitor.db"


const getMyRegisteredEvents = async (visitorEmail: string) => {
    if (!visitorEmail) {
        throw new Error('Visitor email is required');
    }

    try {
        const myEvents = await visitorDb.getMyRegisteredEvents(visitorEmail);
        return myEvents;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting my registered events');
    }
}

const addEventToVisitor = async (visitorEmail: string, eventId: number) => {
    if (!visitorEmail) {
        throw new Error('Visitor email is required');
    }
    if (!eventId) {
        throw new Error('Event id is required');
    }

    try {
        const addedEventToVisitor = await visitorDb.addEventToVisitor(visitorEmail, eventId);
        return addedEventToVisitor;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding event to visitor');
    }
}

const checkVisitorRegistration = async (visitorEmail: string, eventId: number) => {
    if (!visitorEmail) {
        throw new Error('Visitor email is required');
    }
    if (!eventId) {
        throw new Error('Event id is required');
    }

    try {
        const visitorRegistration = await visitorDb.checkVisitorRegistration(visitorEmail, eventId);
        return visitorRegistration;
    } catch (error) {
        console.error(error);
        throw new Error('Error checking visitor registration');
    }
}

const removeEventFromVisitor = async (visitorEmail: string, eventId: number) => {
    if (!visitorEmail) {
        throw new Error('Visitor email is required');
    }
    if (!eventId) {
        throw new Error('Event id is required');
    }
    
    try {
        const removedEventFromVisitor = await visitorDb.removeEventFromVisitor(visitorEmail, eventId);
        return removedEventFromVisitor;
    } catch (error) {
        console.error(error);
        throw new Error('Error removing event from visitor');
    }
}

export default {
    getMyRegisteredEvents,
    addEventToVisitor,
    checkVisitorRegistration,
    removeEventFromVisitor
}