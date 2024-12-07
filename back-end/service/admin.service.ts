import { Admin } from "../model/Admin";
import adminDb from "../repository/admin.db";
import { UserInput } from "../types";
import bcrypt from 'bcrypt';

const getAdminByEmail = async (userInput: UserInput): Promise<boolean> => {
    if (!userInput.email) {
        throw new Error('Email is required');
    }
    if (!userInput.password) {
        throw new Error('Password is required');
    }

    if (!userInput.email.includes('@')) {
        throw new Error('Invalid email');
    }
    try {
        return await adminDb.getAdminByEmail(userInput.email);
    } catch (error) {
        throw error
    }

}


export default {
    getAdminByEmail
}