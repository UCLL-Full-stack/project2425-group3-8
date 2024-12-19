import { Event } from "../../model/Event";
import { Location } from "../../model/Location";
import { Matches } from "../../model/Matches";
import { Player } from "../../model/Player";
import { Sport } from "../../model/Sport";
import { User } from "../../model/User";
import playerService from "../../service/player.service";
import { EventInput, LocationInput, MatchesInput, PlayerInput, SportInput, UserInput } from "../../types";

const userInput: UserInput & { id: number } = {
    id: 1,
    fullName: 'Test User',
    phoneNumber: '123456789',
    email: 'testUser@gmail.com',
    password: 'password',
    role: 'player'
};

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
});

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
    sportId: sportInput,
    locationId: locationInput,
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

describe('Player Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('given: player and match IDs, when: addPlayerToMatch is called, then: return added player-match', async () => {
        jest.spyOn(playerService, 'addPlayerToMatch').mockResolvedValue({ id: 1, playerId: 1, matchesId: 1 });

        const result = await playerService.addPlayerToMatch(1, 1);

        expect(result).toEqual({ id: 1, playerId: 1, matchesId: 1 });
    });

    test('given: non-existent player ID, when: addPlayerToMatch is called, then: throw error', async () => {
        jest.spyOn(playerService, 'addPlayerToMatch').mockRejectedValue(new Error('Player not found with id'));

        await expect(playerService.addPlayerToMatch(999, 1)).rejects.toThrow('Player not found with id');
    });

    test('given: player and match IDs, when: removedPlayerFromMatch is called, then: return removed player-match', async () => {
        jest.spyOn(playerService, 'removedPlayerFromMatch').mockResolvedValue({ id: 1, playerId: 1, matchesId: 1 });

        const result = await playerService.removedPlayerFromMatch(1, 1);

        expect(result).toEqual({ id: 1, playerId: 1, matchesId: 1 });
    });

    test('given: non-existent match ID, when: removedPlayerFromMatch is called, then: throw error', async () => {
        jest.spyOn(playerService, 'removedPlayerFromMatch').mockRejectedValue(new Error('Match not found with id'));

        await expect(playerService.removedPlayerFromMatch(1, 999)).rejects.toThrow('Match not found with id');
    });

    test('when: getAllPlayers is called, then: return all players', async () => {
        jest.spyOn(playerService, 'getAllPlayers').mockResolvedValue([{
            ...playerInput,
            playerId: playerInput.userId,
            user: { ...userInput },
            addressid: locationInput.number,
        }]);

        const result = await playerService.getAllPlayers();

        expect(result).toEqual(expect.arrayContaining([{
            ...playerInput,
            playerId: playerInput.userId,
            user: { ...userInput },
            addressid: locationInput.number,
        }]));
    });

    test('when: getAllPlayers is called and fails, then: throw error', async () => {
        jest.spyOn(playerService, 'getAllPlayers').mockRejectedValue(new Error('Error getting players'));

        await expect(playerService.getAllPlayers()).rejects.toThrow('Error getting players');
    });

    test('given: player email, when: getPlayerMatches is called, then: return player matches', async () => {
        jest.spyOn(playerService, 'getPlayerMatches').mockResolvedValue([{
            id: matchesInput.id!,
            winner: matchesInput.winner || null,
            result: matchesInput.result || null,
            date: matchesInput.date,
            hour: matchesInput.hour,
            team1: matchesInput.team1,
            team2: matchesInput.team2,
            eventId: null,
        }]);

        const result = await playerService.getPlayerMatches('testUser@gmail.com');

        expect(result).toEqual(expect.arrayContaining([{
            id: matchesInput.id!,
            winner: matchesInput.winner || null,
            result: matchesInput.result || null,
            date: matchesInput.date,
            hour: matchesInput.hour,
            team1: matchesInput.team1,
            team2: matchesInput.team2,
            eventId: null,
        }]));
    });

    test('given: non-existent player email, when: getPlayerMatches is called, then: throw error', async () => {
        jest.spyOn(playerService, 'getPlayerMatches').mockRejectedValue(new Error('Player not found with email'));

        await expect(playerService.getPlayerMatches('nonexistent@gmail.com')).rejects.toThrow('Player not found with email');
    });

});

