export type Event = {
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
}

export type Location = {
    id?: number;
    city: string;
    cityCode: string;
    street: string;
    number: number;
}

export type Matches = {
    id?: number;
    winner: string;
    result: string;
    date: Date;
    hour: string;
}

export type Player = {
    id?: number;
    address: string;
    age: number;
    experience: number;
}

export type Sport = {
    id?: number;
    playerCount: number;
    name: string;
}

export type User = {
    id?: number;
    fullName: string;
    phoneNumber: string;
    email: string;
}

