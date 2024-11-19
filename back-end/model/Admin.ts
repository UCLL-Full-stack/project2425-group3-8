import { User } from "./User";
import { Location } from "./Location";
import { Admin as AdminPrisma, Location as LocationPrisma} from '@prisma/client'


export class Admin extends User {
    private adminId?: number;
    private address?: Location;

    constructor(admin: { id?: number; adminId?: number; fullName: string; phoneNumber: string; email: string; password: string; address?: Location }) {
        super({ id: admin.id, fullName: admin.fullName, phoneNumber: admin.phoneNumber, email: admin.email, password: admin.password });

        this.adminId = admin.adminId;
        this.address = admin.address;
    }

    static from({
        id,
        fullName,
        phoneNumber,
        email,
        address,
        password

    }: AdminPrisma & { address: LocationPrisma}){
        return new Admin({
            id,
            fullName,
            phoneNumber,
            email,
            password,	
            address: Location.from(address),
        })
    } 

    getAdminId(): number | undefined {
        return this.adminId;
    }

    getAddress(): Location | undefined {
        return this.address;
    }

    setAddress(address: Location): void {
        this.address = address;
    }
}
