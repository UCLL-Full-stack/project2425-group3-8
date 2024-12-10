import { te } from "date-fns/locale";
import { Event } from "../../model/Event";
import { Location } from "../../model/Location";
import { Matches } from "../../model/Matches";
import { Player } from "../../model/Player";
import { Sport } from "../../model/Sport";
import { User } from "../../model/User";
import { EventInput, LocationInput, MatchesInput, PlayerInput, SportInput, UserInput } from "../../types";


const userInput: UserInput = {
    id: 1,
    fullName: 'Test User',
    phoneNumber: '123456789',
    email: 'testUser@gmail.com',
    password: 'password',
    role: 'player'
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

const playerInput: PlayerInput = {
    userId: 1,
    addressId: 1,
    age: 20,
    experience: 2,
    team: 'Test Team',
};

const player = new Player({
    ...playerInput,
    user: user,
    address: location,
});

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

const sportInput: SportInput = {
    id: 1,
    name: 'Voetbal',
    playerCount: 10,
};

const eventInput: EventInput = {
    name: 'Test Event',
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-01-01'),
    sportId: 1,
    locationId: 1,
    matches: [matchesInput],
};

const sport = new Sport({
    ...sportInput,
});

const event = new Event({
    ...eventInput,
    sport,
    location,
    matches: [matches],
});

let mockGetPlayersByTeamAndMatch: jest.Mock;
let mockAddMatches: jest.Mock;
let mockEditMatches: jest.Mock;
let mockDeleteMatches: jest.Mock;
let mockGetEventNameByMatch: jest.Mock;
let mockGetMatchesById: jest.Mock;

beforeEach(() => {
    mockGetPlayersByTeamAndMatch = jest.fn();
    mockAddMatches = jest.fn();
    mockEditMatches = jest.fn();
    mockDeleteMatches = jest.fn();
    mockGetEventNameByMatch = jest.fn();
    mockGetMatchesById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: matches input, when: get players by team and match is called, then: return players', async () => {
    mockGetPlayersByTeamAndMatch.mockResolvedValue(player);

    expect(await mockGetPlayersByTeamAndMatch(matchesInput)).toEqual(player);

    expect(mockGetPlayersByTeamAndMatch).toHaveBeenCalledTimes(1);
    expect(mockGetPlayersByTeamAndMatch).toHaveBeenCalledWith(matchesInput);
});

test('given: wrong id for matches, when: get players by match and team, then: throw error', async () => {

    await expect(mockGetPlayersByTeamAndMatch(6)).toBe(undefined);
});

test('given: matches input, when: add matches is called, then: return matches', async () => {
    mockAddMatches.mockResolvedValue(matches);

    expect(await mockAddMatches(matchesInput)).toEqual(matches);

    expect(mockAddMatches).toHaveBeenCalledTimes(1);
    expect(mockAddMatches).toHaveBeenCalledWith(matchesInput);
});

test('given: wrong id for event, when: add matches is called, then: throw error', async () => {

    await expect(mockAddMatches(6)).toBe(undefined);
});

test('given: matches input, when: edit matches is called, then: return matches', async () => {
    mockEditMatches.mockResolvedValue(matches);

    expect(await mockEditMatches(matchesInput)).toEqual(matches);

    expect(mockEditMatches).toHaveBeenCalledTimes(1);
    expect(mockEditMatches).toHaveBeenCalledWith(matchesInput);
});

test('given: wrong id for event, when: edit matches is called, then: throw error', async () => {

    await expect(mockEditMatches(6)).toBe(undefined);
});

test('given: matches input, when: delete matches is called, then: return matches', async () => {
    mockDeleteMatches.mockResolvedValue(matches);

    expect(await mockDeleteMatches(matchesInput)).toEqual(matches);

    expect(mockDeleteMatches).toHaveBeenCalledTimes(1);
    expect(mockDeleteMatches).toHaveBeenCalledWith(matchesInput);
});

test('given: wrong id for event, when: delete matches is called, then: throw error', async () => {

    await expect(mockDeleteMatches(6)).toBe(undefined);
});

test('given: matches input, when: get event name by match is called, then: return event name', async () => {
    mockGetEventNameByMatch.mockResolvedValue(event);

    expect(await mockGetEventNameByMatch(matchesInput)).toEqual(event);

    expect(mockGetEventNameByMatch).toHaveBeenCalledTimes(1);
    expect(mockGetEventNameByMatch).toHaveBeenCalledWith(matchesInput);
});

test('given: wrong id for matches, when: get event name by match is called, then: throw error', async () => {

    await expect(mockGetEventNameByMatch(6)).toBe(undefined);
});
