import { Event } from "../model/Event"
import eventDb from "../repository/event.db"
import { EventInput, EventInputPost } from "../types";
import matchesService from "./matches.service";

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
        const event = await eventDb.getEventByName(name);
        if (!event) {
            throw new Error('Event not found with this name');
        }
        return event;
}


const updateEvent = async (id: number, updateData: EventInput) => {
    if(updateData.startDate && updateData.endDate && updateData.startDate > updateData.endDate) {
        throw new Error('Start date must be before end date');
    }

    const eventId = await eventDb.getEventById(id);
    if (!eventId) {
        throw new Error('Event not found');
    }
    try {
        const updatedEvent = await eventDb.updateEvent(id, updateData);
        return updatedEvent;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating event');
    }
};

const deleteEvent = async (id: number): Promise<Event | null> => {
        const eventId = await eventDb.getEventById(id);
        if (!eventId) {
            throw new Error('Event not found with this id');
        }
        const deletedEvent = await eventDb.deleteEvent(id);
        return deletedEvent;

};


const addEvent = async (eventData: EventInputPost): Promise<Event> => {
    if(eventData.startDate > eventData.endDate) {
        throw new Error('Start date must be before end date');
    }
    const searchEvent = await eventDb.getEventByName(eventData.name);
    if(searchEvent) {
        throw new Error('Event already exists');
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