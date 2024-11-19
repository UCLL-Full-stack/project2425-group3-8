import { User } from "@prisma/client"
import database from "./database"
import { Admin } from "../model/Admin"
import { Location } from "../model/Location"

const getUserByEmail = async (email: string): Promise<Admin | null> => {
    try{
        const AdminPrisma = await database.admin.findFirst({
            where: {
                email: email
            },
            include: { address: true }
        })
        if(AdminPrisma === null){
            return null
        }
        return Admin.from(AdminPrisma)
    } catch(error){
        console.log(error);
        throw new Error('Database error for events. See server log for details.')
    }
}

export default{
    getUserByEmail
}