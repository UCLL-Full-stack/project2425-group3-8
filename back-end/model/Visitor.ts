import { User } from "./User";
import {Visitor as VisitorPrisma } from '@prisma/client';

export class Visitor extends User {
    private visitorId: number;

    constructor(visitor: { id: number; visitorId: number; fullName: string; phoneNumber: string; email: string }) {
        super({ id: visitor.id, fullName: visitor.fullName, phoneNumber: visitor.phoneNumber, email: visitor.email });

        this.visitorId = visitor.id;
    }

    static from({
        id,
        fullName,
        phoneNumber,
        email,
        visitorId
    }: VisitorPrisma) {
        return new Visitor({
            id,
            fullName,
            phoneNumber,
            email,
            visitorId
        });
    }

    getVisitorId(): number {
        return this.visitorId;
    }
}
