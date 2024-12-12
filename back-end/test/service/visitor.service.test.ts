import { Visitor } from "../../model/Visitor";
import { Event } from "../../model/Event";
import { EventInput, LocationInput, MatchesInput, SportInput, UserInput, VisitorInput } from "../../types";
import visitorService from "../../service/visitor.service";
import { Matches } from "../../model/Matches";
import { Location } from "../../model/Location";
import { User } from "../../model/User";
import { vi } from "date-fns/locale";

const userInput: UserInput = {
    id: 1,
    fullName: 'Test User',
    phoneNumber: '123456789',
    email: 'test@gmail.com',
    password: 'password',
    role: 'visitor'
}

const user = new User({
    ...userInput
});

const locationInput: LocationInput = {
    city: 'Test City',
    cityCode: 'TC',
    street: 'Test Street',
    number: 1,
};

const location = new Location({
    ...locationInput,
})

const sportInput: SportInput = {
    id: 1,
    name: 'Test Sport',
    playerCount: 10,
};

const eventInput: EventInput = {
    name: 'Test Event',
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-01-02'),
    sportId: sportInput,
    locationId: locationInput,
    matches: [],
};

const matchesInput: MatchesInput = {
    id: 1,
    winner: 'Team 1',
    result: '1-0',
    date: new Date('2021-01-01'),
    hour: '12:00',
    team1: 'Team 1',
    team2: 'Team 2',
};

const matches = new Matches({
    ...matchesInput,
});

const event = new Event({
    ...eventInput,
    matches: [matches],
});

const visitorInput : VisitorInput = {
    address: locationInput,
    event: [],
}


let mockGetVisitorByEmail: jest.Mock;
let mockRegisterForEvent: jest.Mock;
let mockDeregisterFromEvent: jest.Mock;
let mockGetRegisteredEvents: jest.Mock;

beforeEach(() => {
    mockGetVisitorByEmail = jest.fn();
    mockRegisterForEvent = jest.fn();
    mockDeregisterFromEvent = jest.fn();
    mockGetRegisteredEvents = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: visitor email, when: get visitor by email is called, then: return visitor', async () => {
    mockGetVisitorByEmail.mockResolvedValue(visitorInput);

    expect(await mockGetVisitorByEmail('test@example.com')).toEqual(visitorInput);

    expect(mockGetVisitorByEmail).toHaveBeenCalledTimes(1);
    expect(mockGetVisitorByEmail).toHaveBeenCalledWith('test@example.com');
});

test('given: wrong visitor email, when: get visitor by email is called, then: throw error', async () => {
    await expect(visitorService.getMyRegisteredEvents('wrong@example.com')).rejects.toThrow('Visitor not found with email');
});


test('given: visitor email and non-existing event, when: add for event is called, then: throw error', async () => {
    await expect(visitorService.addEventToVisitor('test@example.com', 1)).rejects.toThrow('Visitor not found with email');
});



test('given: visitor email and non-existing event, when: remove from event is called, then: throw error', async () => {
    await expect(visitorService.removeEventFromVisitor('test@example.com', 1)).rejects.toThrow('Visitor not found with email');
});

test('given: wrong visitor email, when: get registered events is called, then: throw error', async () => {
    await expect(visitorService.checkVisitorRegistration('wrong@example.com', 1)).rejects.toThrow('Visitor not found with email');
});
