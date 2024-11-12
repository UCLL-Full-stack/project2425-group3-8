import { Event } from "../model/Event"
import eventDb from "../repository/event.db"

const getAllEvents = async (): Promise<Event[]> => eventDb.getAllEvents();

const getEventByName = async (name: string): Promise<Event | null> => eventDb.getEventByName(name);

export default{
    getAllEvents,
    getEventByName
}