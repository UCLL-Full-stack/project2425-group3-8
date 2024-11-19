import { User as UserPrisma} from '@prisma/client';

export class User{
    private id?: number;
    private fullName: string;
    private phoneNumber: string;
    private email: string;
    public password: string;

    constructor(user: {id?: number,  fullName: string, phoneNumber: string, email: string, password: string}){
        this.id = user.id;
        this.fullName = user.fullName;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
        this.password = user.password;
    }

static from({
    id,
    fullName,
    phoneNumber,
    email,
    password
}: UserPrisma) {
    return new User({
        id,
        fullName,
        phoneNumber,
        email,
        password
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
}