import { Event } from "../model/Event"
import eventDb from "../repository/event.db"

const getAllEvents = async (): Promise<Event[]> => eventDb.getAllEvents();

const getEventByName = async (name: string): Promise<Event | null> => eventDb.getEventByName(name);

const updateEvent = async (id: string, updateData: any): Promise<Event | null> => {
    try {
        const updatedEvent = await eventDb.updateEvent(id, updateData);
        return updatedEvent;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating event');
    }
};

const deleteEvent = async (id: string): Promise<Event | null> => {
    try {
        const deletedEvent = await eventDb.deleteEvent(id);
        return deletedEvent;
    } catch (error) {
        console.error(error); 
        throw new Error('Error deleting event');
    }
};


const addEvent = async (eventData: {
    name: string;
    startDate: Date;
    endDate: Date;
    sport: { name: string; playerCount: number };
    location: { city: string; cityCode: string; street: string; number: number };
}): Promise<Event> => {
    return await eventDb.addEvent(eventData);
}


export default {
    getAllEvents,
    getEventByName,
    updateEvent,
    deleteEvent,
    addEvent
}