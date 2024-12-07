import {Event as EventPrisma, Sport as SportPrisma, Location as LocationPrisma} from '@prisma/client';
export class Location{
    private id?: number;
    private city: string;
    private cityCode: string;
    private street: string;
    private number: number;

    constructor(location: {id?: number, city: string, cityCode: string, street: string, number: number}){
        this.id = location.id;
        this.city = location.city;
        this.cityCode = location.cityCode;
        this.street = location.street;
        this.number = location.number;
    }

static from({
    id,
    city,
    cityCode,
    street,
    number
}: LocationPrisma) {
    return new Location({
        id,
        city,
        cityCode,
        street,
        number,
    });
}

    getId(): number | undefined{
        return this.id;
    }

    getCity(): string{
        return this.city;
    }

    getCityCode(): string{
        return this.cityCode;
    }

    getStreet(): string{
        return this.street;
    }

    getNumber(): number{
        return this.number;
    }
}