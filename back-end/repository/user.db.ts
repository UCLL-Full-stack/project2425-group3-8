import database from "./database"
import { Admin } from "../model/Admin"
import { Location } from "../model/Location"
import { User } from "../model/User"

const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const UserPrisma = await database.user.findFirst({
            where: {
                email: email
            }
        })

        if (UserPrisma === null) {
            throw new Error('User not found')
        }

        return User.from(UserPrisma)
    } catch (error) {
        throw error
    }
}


export default {
    getUserByEmail
    
}