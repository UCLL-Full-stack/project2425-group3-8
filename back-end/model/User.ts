import { User as UserPrisma} from '@prisma/client';
import { Role } from '../types';
export class User{
    private id?: number;
    private fullName: string;
    private phoneNumber: string;
    private email: string;
    public password: string;
    private role: Role;

    constructor(user: {id?: number,  fullName: string, phoneNumber: string, email: string, password: string, role: Role}){
        this.id = user.id;
        this.fullName = user.fullName;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role
    }

static from({
    id,
    fullName,
    phoneNumber,
    email,
    password,
    role
}: UserPrisma) {
    return new User({
        id,
        fullName,
        phoneNumber,
        email,
        password,
        role: role as Role, 
    });
}

    getId(): number | undefined{
        return this.id;
    }

    getFullName(): string{
        return this.fullName;
    }

    getPhoneNumber(): string{
        return this.phoneNumber;
    }

    getEmail(): string{
        return this.email
    }

    getPassword(): string{
        return this.password;
    }

    getRole(): Role{
        return this.role
    }
}