type Role = 'admin' | 'visitor' | 'player';

type EventInput = {
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
    sportId?: number;
    locationId?: number;
    matches?: MatchesInput[];
};

type LocationInput = {
    id?: number;
    city: string;
    cityCode: string;
    street: string;
    number: number;
};

type MatchesInput = {
    id?: number;
    winner?: string;
    result?: string;
    date: Date;
    hour: string;
    team1: string;
    team2: string;
    eventId?: number;
};

type PlayerInput = {
    playerId?: number;
    userId: number;
    addressId: number;
    age: number;
    experience: number;
    team: string;
};

type SportInput = {
    id?: number;
    playerCount: number;
    name: string;
};

type UserInput = {
    id?: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: Role;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: Role;
};

export {
    UserInput,
    SportInput,
    PlayerInput,
    MatchesInput,
    LocationInput,
    EventInput, AuthenticationResponse, Role
};

