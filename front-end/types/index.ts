export type CustomEvent = {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    sport: Sport;
    location: Location;
}

export type Location = {
    id?: number;
    city: string;
    cityCode: string;
    street: string;
    number: number | undefined;
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
    playerCount: number | undefined;
    name: string;
}

export type User = {
    id?: number;
    fullName: string;
    phoneNumber: string;
    email: string;
}

