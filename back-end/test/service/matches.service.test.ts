
import { Event } from '../../model/Event';
import { Location } from '../../model/Location';
import { Sport } from '../../model/Sport';
import matchesService from '../../service/matches.service';
import { MatchesInput } from '../../types';

let mockGetMatchesById: jest.Mock;
beforeEach(() => {
    mockGetMatchesById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

const service = matchesService;

test('given: matches input, when: get players by team and match is called, then: return players', async () => {
    const matchId = 1;
    const teamName = 'Team 1';
    const expectedPlayers = [{
        user: {
            id: 1,
            fullName: 'Player 1',
            phoneNumber: '1234567890',
            email: 'player1@example.com',
            password: 'password',
            role: 'player'
        },
        address: {
            id: 1,
            city: 'City',
            cityCode: '12345',
            street: 'Street',
            number: 1
        },
        matches: [],
        playerId: 1,
        userId: 1,
        addressid: 1,
        age: 25,
        experience: 5,
        team: 'Team 1'
    }];

    jest.spyOn(service, 'getPlayersByTeamAndMatch').mockResolvedValue(expectedPlayers);

    const players = await service.getPlayersByTeamAndMatch(matchId, teamName);

    expect(players).toEqual(expectedPlayers);
    expect(service.getPlayersByTeamAndMatch).toHaveBeenCalledTimes(1);
    expect(service.getPlayersByTeamAndMatch).toHaveBeenCalledWith(matchId, teamName);
});

test('given: matches id, when: delete matches is called, then: return deleted matches', async () => {
    const matchesId = 1;
    const expectedDeletedMatches = { success: true, deletedMatches: { id: matchesId, winner: null, result: null, date: new Date(), hour: '', team1: '', team2: '', eventId: null } };

    jest.spyOn(service, 'deleteMatches').mockResolvedValue(expectedDeletedMatches);

    const deletedMatches = await service.deleteMatches(matchesId);

    expect(deletedMatches).toEqual(expectedDeletedMatches);
    expect(service.deleteMatches).toHaveBeenCalledTimes(1);
    expect(service.deleteMatches).toHaveBeenCalledWith(matchesId);
});

test('given: match id, when: get event name by match is called, then: return event name', async () => {
    const location = new Location({ city: 'Test City', cityCode: '12345', street: 'Test Street', number: 1 });
    const sport = new Sport({ id: 1, playerCount: 10, name: 'Test Sport' });
    const matchId = 1;
    const expectedEvent: Event = new Event({
        id: 1,
        name: 'Test Event',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-02'),
        sport: sport,
        location: location,
        matches: []
    });

    jest.spyOn(service, 'getEventNameByMatch').mockResolvedValue(expectedEvent);

    const event = await service.getEventNameByMatch(matchId);

    expect(event).toEqual(expectedEvent);
    expect(service.getEventNameByMatch).toHaveBeenCalledTimes(1);
    expect(service.getEventNameByMatch).toHaveBeenCalledWith(matchId);
});
