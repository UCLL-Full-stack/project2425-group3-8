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

const getMyRegisteredEvents = async (visitorId: number) => {
    try {
        const findEventVisitor = await database.visitorEvent.findMany({
            where: {
                visitorId: visitorId
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

export default {
    getVisitorByEmail,
    getMyRegisteredEvents
}