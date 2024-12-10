import { Admin } from "../model/Admin";
import adminDb from "../repository/admin.db";
import { UserInput } from "../types";
import bcrypt from 'bcrypt';

const getAdminByEmail = async (userInput: UserInput): Promise<boolean> => {
    try {
        return await adminDb.getAdminByEmail(userInput.email);
    } catch (error) {
        throw error;
    }
};

export default {
    getAdminByEmail
}