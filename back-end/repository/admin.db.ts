import database from "./database"
import { Admin } from "../model/Admin"
import { Location } from "../model/Location"
import { User } from "../model/User"

const getAdminByEmail = async (email: string): Promise<boolean> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { email: email }
        });

        if (!userPrisma) {
            return false;
        }

        const adminPrisma = await database.admin.findFirst({
            where: { userId: userPrisma.id },
            include: { user: true, address: true }
        });

        if (adminPrisma === null) {
            return false;
        }

        const admin = Admin.fromAdmin(adminPrisma);  
        return true;
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving admin data");
    }
}

export default {
    getAdminByEmail
}
