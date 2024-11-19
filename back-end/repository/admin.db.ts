import database from "./database"
import { Admin } from "../model/Admin"
import { Location } from "../model/Location"
import { User } from "../model/User"

const getAdminByEmail = async (email: string): Promise<Admin> => {
    try {

        const UserPrisma = await database.user.findFirst({
            where:{
                email: email
            }
        })  

        const AdminPrisma = await database.admin.findFirst({
            where:{
                userId: UserPrisma?.id
            },
            include: {
                user: true,
                address: true
            }
        })

        if (AdminPrisma === null) {
            throw new Error('Admin not found')
        }

        return Admin.fromAdmin(AdminPrisma)
    } catch (error) {
        throw error
    }
}

export default {
    getAdminByEmail
}