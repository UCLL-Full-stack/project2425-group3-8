import e from "cors"
import database from "./database"


const getVisitorByEmail = async (email: string): Promise<boolean> => {
    try {

        const UserPrisma = await database.user.findFirst({
            where:{
                email: email
            }
        })  

        const vistorPrisma = await database.visitor.findFirst({
            where:{
                userId: UserPrisma?.id
            },
            include: {
                user: true,
                address: true
            }
        })

        if (vistorPrisma === null) {
            return false
        }

        return true
    } catch (error) {
        throw error
    }
}

const getMyRegisteredEvents = async (visitorEmail: string) => {
    try {
        const visitor = await database.visitor.findFirst({
            where: {
                user: {
                    email: visitorEmail
                }
            }
        })
        if (!visitor) {
            throw new Error("Visitor not found");
        }

        const findEventVisitor = await database.visitorEvent.findMany({
            where: {
                visitorId: visitor.visitorId  
            }
        })

        const events = await database.event.findMany({
            where: {
                id: {
                    in: findEventVisitor.map((event) => event.eventId)
                }
                
            },
            include: {
                sport: true,
                location: true,
                matches: true
            }
        })



        return events
    } catch (error) {
        throw error
    }
}

const addEventToVisitor = async (visitorEmail: string, eventId: number) => {
    const visitor = await database.visitor.findFirst({
        where: {
            user: {
                email: visitorEmail
            }
        }
    })

    if (!visitor) {
        throw new Error("Visitor not found");
    }

    const event = await database.event.findFirst({
        where: {
            id: eventId
        }
    })

    if (!event) {
        throw new Error("Event not found");
    }

    const visitorEvent = await database.visitorEvent.create({
        data: {
            visitor: {
                connect: {
                    visitorId: visitor.visitorId
                }
            },
            event: {
                connect: {
                    id: eventId
                }
            }
        }
    })

    return visitorEvent
}

const checkVisitorRegistration = async (visitorEmail: string, eventId: number) => {
    const visitor = await database.visitor.findFirst({
        where: {
            user: {
                email: visitorEmail
            }
        }
    })

    if (!visitor) {
        throw new Error("Visitor not found");
    }

    const visitorEvent = await database.visitorEvent.findFirst({
        where: {
            visitorId: visitor.visitorId,
            eventId: eventId
        }
    })

    if (!visitorEvent) {
        return false
    }

    return true
}

const removeEventFromVisitor = async (visitorEmail: string, eventId: number) => {
    const visitor = await database.visitor.findFirst({
        where: {
            user: {
                email: visitorEmail
            }
        }
    })

    if (!visitor) {
        throw new Error("Visitor not found");
    }

    const visitorEvent = await database.visitorEvent.findFirst({
        where: {
            visitorId: visitor.visitorId,
            eventId: eventId
        }
    })

    if (!visitorEvent) {
        throw new Error("Event not found");
    }

    await database.visitorEvent.delete({
        where: {
            id: visitorEvent.id
        }
    })

    return true
}


export default {
    getVisitorByEmail,
    getMyRegisteredEvents,
    addEventToVisitor,
    checkVisitorRegistration,
    removeEventFromVisitor
}