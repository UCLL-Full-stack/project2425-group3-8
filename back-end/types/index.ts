type EventInput = {
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
    sport?: SportInput;
    location?: LocationInput
}

type LocationInput = {
    id?: number;
    city: string;
    cityCode: string;
    street: string;
    number: number;
}

type MatchesInput = {
    id?: number;
    winner: string;
    result: string;
    date: Date;
    hour: string;
}

type PlayerInput = {
    id?: number;
    address: string;
    age: number;
    experience: number;
}

type SportInput = {
    id?: number;
    playerCount: number;
    name: string;
}

type UserInput = {
    id?: number;
    fullName: string;
    phoneNumber: string;
    email: string;
}

export {
    UserInput,
    SportInput,
    PlayerInput,
    MatchesInput,
    LocationInput,
    EventInput
}

