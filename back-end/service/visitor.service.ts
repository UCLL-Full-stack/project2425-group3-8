import visitorDb from "../repository/visitor.db"


const getMyRegisteredEvents = async (visitorEmail: string) => {
    try {
        const myEvents = await visitorDb.getMyRegisteredEvents(visitorEmail);
        return myEvents;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting my registered events');
    }
}

const addEventToVisitor = async (visitorEmail: string, eventId: number) => {
    try {
        const addedEventToVisitor = await visitorDb.addEventToVisitor(visitorEmail, eventId);
        return addedEventToVisitor;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding event to visitor');
    }
}

export default {
    getMyRegisteredEvents,
    addEventToVisitor
}