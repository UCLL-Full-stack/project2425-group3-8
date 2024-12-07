import e from "cors";
import database from "./database";
import { Visitor } from "../model/Visitor"; // Import the Visitor model

const getVisitorByEmail = async (email: string): Promise<boolean> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!userPrisma) {
            return false;
        }

        const visitorPrisma = await database.visitor.findFirst({
            where: {
                userId: userPrisma.id,
            },
            include: {
                user: true,
                address: true,
            },
        });

        return visitorPrisma !== null;
    } catch (error) {
        console.error(error);
        throw new Error("Error finding visitor by email");
    }
};

const getMyRegisteredEvents = async (visitorEmail: string) => {
    try {
        const visitor = await database.visitor.findFirst({
            where: {
                user: {
                    email: visitorEmail,
                },
            },
        });

        if (!visitor) {
            throw new Error("Visitor not found");
        }

        const findEventVisitor = await database.visitorEvent.findMany({
            where: {
                visitorId: visitor.visitorId,
            },
        });

        const events = await database.event.findMany({
            where: {
                id: {
                    in: findEventVisitor.map((event) => event.eventId),
                },
            },
            include: {
                sport: true,
                location: true,
                matches: true,
            },
        });

        return events;
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving registered events");
    }
};

const addEventToVisitor = async (visitorEmail: string, eventId: number) => {
    try {
        const visitor = await database.visitor.findFirst({
            where: {
                user: {
                    email: visitorEmail,
                },
            },
        });

        if (!visitor) {
            throw new Error("Visitor not found");
        }

        const event = await database.event.findFirst({
            where: {
                id: eventId,
            },
        });

        if (!event) {
            throw new Error("Event not found");
        }

        const visitorEvent = await database.visitorEvent.create({
            data: {
                visitor: {
                    connect: {
                        visitorId: visitor.visitorId,
                    },
                },
                event: {
                    connect: {
                        id: eventId,
                    },
                },
            },
        });

        return visitorEvent;
    } catch (error) {
        console.error(error);
        throw new Error("Error adding event to visitor");
    }
};

const checkVisitorRegistration = async (visitorEmail: string, eventId: number) => {
    try {
        const visitor = await database.visitor.findFirst({
            where: {
                user: {
                    email: visitorEmail,
                },
            },
        });

        if (!visitor) {
            throw new Error("Visitor not found");
        }

        const visitorEvent = await database.visitorEvent.findFirst({
            where: {
                visitorId: visitor.visitorId,
                eventId: eventId,
            },
        });

        return visitorEvent !== null;
    } catch (error) {
        console.error(error);
        throw new Error("Error checking visitor registration");
    }
};

const removeEventFromVisitor = async (visitorEmail: string, eventId: number) => {
    try {
        const visitor = await database.visitor.findFirst({
            where: {
                user: {
                    email: visitorEmail,
                },
            },
        });

        if (!visitor) {
            throw new Error("Visitor not found");
        }

        const visitorEvent = await database.visitorEvent.findFirst({
            where: {
                visitorId: visitor.visitorId,
                eventId: eventId,
            },
        });

        if (!visitorEvent) {
            throw new Error("Event not found");
        }

        await database.visitorEvent.delete({
            where: {
                id: visitorEvent.id,
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        throw new Error("Error removing event from visitor");
    }
};

export default {
    getVisitorByEmail,
    getMyRegisteredEvents,
    addEventToVisitor,
    checkVisitorRegistration,
    removeEventFromVisitor,
};
