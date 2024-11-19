import userDb from "../repository/user.db"
import { UserInput } from "../types"
import { Admin } from "../model/Admin"
import bcrypt from 'bcrypt';
import { User } from "../model/User";

const getUserByEmail = async (userInput: UserInput): Promise<User> => {
    try {
        const tempUser = await userDb.getUserByEmail(userInput.email);

        if (tempUser && await bcrypt.compare(userInput.password, tempUser.password)) {
            return tempUser;
        }
        throw new Error('Email or password is incorrect.')
    } catch (error) {
        throw error
    }
};

export default {
    getUserByEmail
}
