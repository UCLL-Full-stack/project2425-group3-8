import { Admin } from "../model/Admin";
import adminDb from "../repository/admin.db";
import { UserInput } from "../types";
import bcrypt from 'bcrypt';

const getAdminByEmail = async (userInput: UserInput): Promise<Admin> => {
    try {
        const tempUser = await adminDb.getAdminByEmail(userInput.email);

        if (tempUser && await bcrypt.compare(userInput.password, tempUser.password)) {
            return tempUser;
        }
        throw new Error("Invalid email or password");
    } catch (error) {
        throw error
    }

}


export default {
    getAdminByEmail
}