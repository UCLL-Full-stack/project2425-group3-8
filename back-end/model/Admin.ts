import { User } from "./User";
import { Location } from "./Location";
import { Admin as AdminPrisma, Location as LocationPrisma, User as UserPrisma} from '@prisma/client'


export class Admin extends User {
    private adminId?: number;
    private address?: Location;

    constructor(admin: {user: User; adminId?: number;address?: Location }) {
        super({ id: admin.user.getId(), fullName: admin.user.getFullName(), phoneNumber: admin.user.getPhoneNumber(), email: admin.user.getEmail(), password: admin.user.getPassword() });

        this.adminId = admin.adminId;
        this.address = admin.address;
    }

    static fromAdmin({
        user,
        adminId,
        address,
    }: AdminPrisma & { user: UserPrisma; address: LocationPrisma }): Admin {
        const userObj = User.from(user);
    
        const locationObj = address ? Location.from(address) : undefined;
    
        return new Admin({
            user: userObj,
            adminId,
            address: locationObj,
        });
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
