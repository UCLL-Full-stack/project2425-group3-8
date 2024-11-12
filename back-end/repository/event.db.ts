import { set } from "date-fns"
import { Event } from "../model/Event"
import { Sport } from "../model/Sport"
import { Location } from "../model/Location"
import database from "./database"

const getAllEvents = async (): Promise<Event[]> => {
    try {
        const eventPrisma = await database.event.findMany({
            include: { sport: true, location: true }
    });
        return eventPrisma.map((eventPrisma): Event => Event.from(eventPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error for events. See server log for details.')
    }
}

const getEventByName = async (name: string): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findFirst({
            where: {
                name: name
            },
            include: { sport: true, location: true }
        });
        if (eventPrisma === null) {
            return null;
        }
        return Event.from(eventPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error for events. See server log for details.')
    }
    
} 


export default {
    getAllEvents,
    getEventByName,
}