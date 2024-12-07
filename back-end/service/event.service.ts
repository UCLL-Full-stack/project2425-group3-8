import { Event } from "../model/Event"
import eventDb from "../repository/event.db"

const getAllEvents = async (): Promise<Event[]> => {
    try {
        const events = await eventDb.getAllEvents();
        return events;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all events');
    }
}

const getEventByName = async (name: string): Promise<Event | null> => {
    if (!name) {
        throw new Error('Name needs to be correct');
    }
    try {
        const event = await eventDb.getEventByName(name);
        return event;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting event by name');
    }

}


const updateEvent = async (id: string, updateData: any): Promise<Event | null> => {
    if (!id) {
        throw new Error('Id needs to be correct');
    }
    if (!updateData) {
        throw new Error('Update data is required');
    }

    if(updateData.startDate && updateData.endDate && updateData.startDate > updateData.endDate) {
        throw new Error('Start date must be before end date');
    }
    
    try {
        const updatedEvent = await eventDb.updateEvent(id, updateData);
        return updatedEvent;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating event');
    }
};

const deleteEvent = async (id: string): Promise<Event | null> => {
    if (!id) {
        throw new Error('Id needs to be correct');
    }
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
    if (!eventData) {
        throw new Error('Event data is required');
    }
    if (!eventData.name) {
        throw new Error('Name is required');
    }
    if (!eventData.startDate) {
        throw new Error('Start date is required');
    }
    if (!eventData.endDate) {
        throw new Error('End date is required');
    }
    if (!eventData.sport) {
        throw new Error('Sport is required');
    }
    if (!eventData.sport.name) {
        throw new Error('Sport name is required');
    }
    if (!eventData.sport.playerCount) {
        throw new Error('Sport player count is required');
    }
    if (!eventData.location) {
        throw new Error('Location is required');
    }
    if (!eventData.location.city) {
        throw new Error('City is required');
    }
    if (!eventData.location.cityCode) {
        throw new Error('City code is required');
    }
    if (!eventData.location.street) {
        throw new Error('Street is required');
    }
    if (!eventData.location.number) {
        throw new Error('Number is required');
    }
    if(eventData.startDate > eventData.endDate) {
        throw new Error('Start date must be before end date');
    }
    return await eventDb.addEvent(eventData);
}


export default {
    getAllEvents,
    getEventByName,
    updateEvent,
    deleteEvent,
    addEvent
}