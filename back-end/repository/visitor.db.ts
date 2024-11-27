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

export default {
    getVisitorByEmail
}