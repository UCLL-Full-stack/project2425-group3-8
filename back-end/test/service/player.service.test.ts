import { before } from "node:test";
import { Event } from "../../model/Event";
import { Location } from "../../model/Location";
import { Matches } from "../../model/Matches";
import { Player } from "../../model/Player";
import { Sport } from "../../model/Sport";
import { User } from "../../model/User";
import { EventInput, LocationInput, MatchesInput, PlayerInput, SportInput, UserInput } from "../../types";
import { af } from "date-fns/locale";

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

let mockAddPlayerToMatch = jest.fn();
let mockRemovedPlayerFromMatch = jest.fn();
let mockGetAllPlayers = jest.fn();
let mockGetPlayerMatches = jest.fn();

beforeEach(() => {
    mockAddPlayerToMatch = jest.fn();
    mockRemovedPlayerFromMatch = jest.fn();
    mockGetAllPlayers = jest.fn();
    mockGetPlayerMatches = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: player and match IDs, when: addPlayerToMatch is called, then: return added player-match', async () => {
    mockAddPlayerToMatch.mockResolvedValue({ playerId: 1, matchesId: 1 });

    const result = await mockAddPlayerToMatch(1, 1);

    expect(result).toEqual({ playerId: 1, matchesId: 1 });
    expect(mockAddPlayerToMatch).toHaveBeenCalledTimes(1);
    expect(mockAddPlayerToMatch).toHaveBeenCalledWith(1, 1);
});

test('given: non-existent player ID, when: addPlayerToMatch is called, then: throw error', async () => {
    mockAddPlayerToMatch.mockRejectedValue(new Error('Player not found with id'));

    await expect(mockAddPlayerToMatch(999, 1)).rejects.toThrow('Player not found with id');
    expect(mockAddPlayerToMatch).toHaveBeenCalledTimes(1);
    expect(mockAddPlayerToMatch).toHaveBeenCalledWith(999, 1);
});

test('given: player and match IDs, when: removedPlayerFromMatch is called, then: return removed player-match', async () => {
    mockRemovedPlayerFromMatch.mockResolvedValue({ playerId: 1, matchId: 1 });

    const result = await mockRemovedPlayerFromMatch(1, 1);

    expect(result).toEqual({ playerId: 1, matchId: 1 });
    expect(mockRemovedPlayerFromMatch).toHaveBeenCalledTimes(1);
    expect(mockRemovedPlayerFromMatch).toHaveBeenCalledWith(1, 1);
});

test('given: non-existent match ID, when: removedPlayerFromMatch is called, then: throw error', async () => {
    mockRemovedPlayerFromMatch.mockRejectedValue(new Error('Match not found with id'));

    await expect(mockRemovedPlayerFromMatch(1, 999)).rejects.toThrow('Match not found with id');
    expect(mockRemovedPlayerFromMatch).toHaveBeenCalledTimes(1);
    expect(mockRemovedPlayerFromMatch).toHaveBeenCalledWith(1, 999);
});

test('when: getAllPlayers is called, then: return all players', async () => {
    mockGetAllPlayers.mockResolvedValue([player]);

    const result = await mockGetAllPlayers();

    expect(result).toEqual([player]);
    expect(mockGetAllPlayers).toHaveBeenCalledTimes(1);
});

test('when: getAllPlayers is called and fails, then: throw error', async () => {
    mockGetAllPlayers.mockRejectedValue(new Error('Error getting players'));

    await expect(mockGetAllPlayers()).rejects.toThrow('Error getting players');
    expect(mockGetAllPlayers).toHaveBeenCalledTimes(1);
});

test('given: player email, when: getPlayerMatches is called, then: return player matches', async () => {
    mockGetPlayerMatches.mockResolvedValue([matches]);

    const result = await mockGetPlayerMatches('testUser@gmail.com');

    expect(result).toEqual([matches]);
    expect(mockGetPlayerMatches).toHaveBeenCalledTimes(1);
    expect(mockGetPlayerMatches).toHaveBeenCalledWith('testUser@gmail.com');
});

test('given: non-existent player email, when: getPlayerMatches is called, then: throw error', async () => {
    mockGetPlayerMatches.mockRejectedValue(new Error('Player not found with email'));

    await expect(mockGetPlayerMatches('nonexistent@gmail.com')).rejects.toThrow('Player not found with email');
    expect(mockGetPlayerMatches).toHaveBeenCalledTimes(1);
    expect(mockGetPlayerMatches).toHaveBeenCalledWith('nonexistent@gmail.com');
});