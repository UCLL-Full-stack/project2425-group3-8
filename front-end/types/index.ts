export type CustomEvent = {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    sport: Sport;
    location: Location;
    matches: Matches[];
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
    winner?: string;
    result?: string;
    date: string;
    hour: string;
    team1: string;
    team2: string;
}

export type Player = {
    id?: number;
    address: string;
    name: string;
    age: number;
    experience: number;
    team: string;
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

