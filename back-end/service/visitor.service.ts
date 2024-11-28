import visitorDb from "../repository/visitor.db"


const getMyRegisteredEvents = async (visitorId: number) => {
    try {
        const myEvents = await visitorDb.getMyRegisteredEvents(visitorId);
        return myEvents;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting my registered events');
    }
}

export default {
    getMyRegisteredEvents
}