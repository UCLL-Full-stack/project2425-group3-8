import database from './database';
import { Admin } from '../model/Admin';
import { Location } from '../model/Location';
import { User } from '../model/User';
import { Role, UserInput } from '../types';

const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const UserPrisma = await database.user.findFirst({
            where: {
                email: email,
            },
        });

        if (UserPrisma === null) {
            throw new Error('User not found');
        }

        return User.from(UserPrisma);
    } catch (error) {
        throw error;
    }
};

const userExistsByEmail = async (email: string): Promise<boolean> => {
    try {
        const UserPrisma = await database.user.findFirst({
            where: {
                email: email,
            },
        });

        if (UserPrisma) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

const createUser = async (user: UserInput): Promise<User> => {
    try {
        const tempAddress = await database.location.findFirst({
            where: {
                city: 'Vilvoorde',
            },
        });
        const newUser = await database.user.create({
            data: {
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                password: user.password,
                role: user.role,
            },
        });
        if (tempAddress) {
            const newVisitor = await database.visitor.create({
                data: {
                    userId: newUser.id,
                    addressid: tempAddress?.id,
                },
            });
        }
        console.log(newUser);
        return User.from(newUser);
    } catch (error) {
        console.error(error);
        throw new Error('Error adding user');
    }
};

const getUserByJustEmail = async (email: string): Promise<User> => {
    try {
        const UserPrisma = await database.user.findFirst({
            where: {
                email: email,
            },
        });

        if (UserPrisma === null) {
            throw new Error('User not found');
        }

        return User.from(UserPrisma);
    } catch (error) {
        throw error;
    }
};

const getUsers = async (): Promise<UserInput[]> => {
    try {
        const users = await database.user.findMany();
        
        return users.map(user => ({
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            password: user.password,
            role: user.role as Role,
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getAllEmails = async (): Promise<string[]> => {
    try {
        const emails = await database.user.findMany({
            select: {
                email: true,
            },
        });

        return emails.map((email) => email.email);
    } catch (error) {
        console.error('Error fetching emails:', error);
        throw error;
    }
}


export default {
    getUserByEmail,
    userExistsByEmail,
    createUser,
    getUserByJustEmail,
    getUsers,
    getAllEmails,
};
