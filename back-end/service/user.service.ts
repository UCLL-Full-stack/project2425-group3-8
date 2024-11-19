import { User } from "@prisma/client"
import userDb from "../repository/user.db"
import { UserInput } from "../types"
import { Admin } from "../model/Admin"
import bcrypt from 'bcrypt';

const getUserByEmail = async (userInput: UserInput): Promise<Admin | null> => {
    const tempUser = await userDb.getUserByEmail(userInput.email);
    
    if (tempUser && await bcrypt.compare(userInput.password, tempUser.password)) {
        return tempUser;
    }
    
    return null;
};

export default{
    getUserByEmail
}
