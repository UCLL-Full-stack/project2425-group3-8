import { Event } from "../model/Event"
import { Sport } from "../model/Sport"
import { Location } from "../model/Location"
import database from "./database"

const getAllEvents = async (): Promise<Event[]> => {
    try {
        const eventPrisma = await database.event.findMany({
            include: { sport: true, location: true, matches: true }
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
            include: { sport: true, location: true, matches: true }
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

const getEventById = async (id: number): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findUnique({
            where: {
                id: id
            },
            include: { sport: true, location: true, matches: true }
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

const updateEvent = async (id: number, updateData: any): Promise<Event | null> => {
    try {
        const existingEvent = await database.event.findUnique({
            where: { id: id },
            include: { sport: true, location: true, matches: true },
        });

        if (!existingEvent) {
            throw new Error('Event not found');
        }

        const updatedEvent = await database.event.update({
            where: { id: id },
            data: {
                name: updateData.name || existingEvent.name,
                startDate: updateData.startDate || existingEvent.startDate,
                endDate: updateData.endDate || existingEvent.endDate,
                sport: updateData.sport
                    ? {
                          connectOrCreate: {
                              where: { name: updateData.sport.name },
                              create: {
                                  name: updateData.sport.name,
                                  playerCount: updateData.sport.playerCount,
                              },
                          },
                      }
                    : undefined,
                location: updateData.location
                    ? {
                          connectOrCreate: {
                              where: { city: updateData.location.city },
                              create: {
                                  city: updateData.location.city,
                                  cityCode: updateData.location.cityCode,
                                  street: updateData.location.street,
                                  number: updateData.location.number,
                              },
                          },
                      }
                    : undefined,
            },
            include: { sport: true, location: true, matches: true },
        });

        return Event.from(updatedEvent);
    } catch (error) {
        console.error(error);
        throw new Error('Error updating event');
    }
};


const deleteEvent = async (id: number): Promise<Event | null> => {
    try {
        await database.visitorEvent.deleteMany({
            where: { eventId: id },
        });

        const matchIds = await database.matches.findMany({
            where: { eventId: id },
            select: { id: true },
        });
        const matchIdList = matchIds.map(match => match.id);

        await database.playerMatches.deleteMany({
            where: { matchesId: { in: matchIdList } },
        });

        await database.matches.deleteMany({
            where: { eventId: id },
        });

        const deletedEvent = await database.event.delete({
            where: { id: id },
            include: { sport: true, location: true, matches: true },
        });

        return Event.from(deletedEvent);
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting event from database');
    }
};



const addEvent = async (eventData: { 
    name: string; 
    startDate: Date; 
    endDate: Date; 
    sport: { name: string; playerCount: number }; 
    location: { city: string; cityCode: string; street: string; number: number };
  }): Promise<Event> => {
    try {
      const newEvent = await database.event.create({
        data: {
          name: eventData.name,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          sport: {
            connectOrCreate: {
              where: { name: eventData.sport.name },
              create: {
                name: eventData.sport.name,
                playerCount: eventData.sport.playerCount,
              },
            },
          },
          location: {
            connectOrCreate: {
              where: { city: eventData.location.city },
              create: {
                city: eventData.location.city,
                cityCode: eventData.location.cityCode,
                street: eventData.location.street,
                number: eventData.location.number,
              },
            },
          },
        },
        include: { sport: true, location: true, matches: true },
      });
      return Event.from(newEvent);
    } catch (error) {
      console.error(error); 
      throw new Error('Error adding event');
    }
  };
  

export default {
    getAllEvents,
    getEventByName,
    updateEvent,
    deleteEvent,
    addEvent,
    getEventById
}