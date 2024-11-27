import userDb from "../repository/user.db"
import { UserInput } from "../types"
import { Admin } from "../model/Admin"
import bcrypt from 'bcrypt';
import { User } from "../model/User";
import adminDb from "../repository/admin.db";
import playerDb from "../repository/player.db";
import visitorDb from "../repository/visitor.db";

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

const getRole = async (userInput: UserInput): Promise<String> =>{
    try{
        const isAdmin = await  adminDb.getAdminByEmail(userInput.email)
        if(isAdmin){
            return "admin"
        }

        const isPlayer = await playerDb.getPlayerByEmail(userInput.email)
        if(isPlayer){
            return "player"
        }

        const isVisitor = await visitorDb.getVisitorByEmail(userInput.email)
        if(isVisitor){
            return "visitor"
        }

        return "guest"
    }
    catch(error){
        throw error
    }
}

export default {
    getUserByEmail,
    getRole
}
