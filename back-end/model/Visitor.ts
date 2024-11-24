import { User } from "./User";
import { Location } from "./Location";
import {Visitor as VisitorPrisma, User as UserPrisma, Location as LocationPrisma } from '@prisma/client';

export class Visitor extends User {
    private visitorId?: number;
    private address?: Location;

    constructor(visitor: { user: User; visitorId?: number; address?: Location }) {
        super({
            id: visitor.user.getId(), fullName: visitor.user.getFullName(), phoneNumber: visitor.user.getPhoneNumber(), email: visitor.user.getEmail(),
            password: visitor.user.getPassword()
        });

        this.visitorId = visitor.visitorId;
    }

    static fromVisitor({
        user,
        address
    }: VisitorPrisma & {address: LocationPrisma; user: UserPrisma;}): Visitor {
        const userObj = User.from(user);
        const locationObj = address ? Location.from(address) : undefined;
        return new Visitor({
            user: userObj,
            address: locationObj
        })
    }

    getVisitorId(): number | undefined {
        return this.visitorId;
    }
}
