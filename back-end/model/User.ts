export class User{
    private id?: number;
    private fullName: string;
    private phoneNumber: string;
    private email: string;

    constructor(user: {id?: number,  fullName: string, phoneNumber: string, email: string}){
        this.id = user.id;
        this.fullName = user.fullName;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
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
}