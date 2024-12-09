import userDb from "../repository/user.db"
import { AuthenticationResponse, UserInput } from '../types';
import { Admin } from "../model/Admin"
import bcrypt from 'bcrypt';
import { User } from "../model/User";
import adminDb from "../repository/admin.db";
import playerDb from "../repository/player.db";
import visitorDb from "../repository/visitor.db";
import { generateJwtToken } from "../util/jwt";


const authenticate = async ({email, password }: UserInput): Promise<AuthenticationResponse> => {

    const user = await userDb.getUserByEmail(email)
    const role = user.getRole()
    if(!user){
        throw new Error(`User with email: ${email} does not exist.`);
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
        throw new Error('Incorrect password.')
    }
    return{
        token: generateJwtToken({ email, role}),
        email: email,
        role: role
    }
};


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
        const user = await userDb.getUserByEmail(userInput.email)
        return user.getRole()
    }
    catch(error){
        throw error
    }
}

export default {
    getUserByEmail,
    getRole,
    authenticate
}
