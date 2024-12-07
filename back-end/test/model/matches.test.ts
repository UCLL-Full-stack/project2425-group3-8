import { set } from 'date-fns';
import { Matches } from '../../model/Matches';
import { Player } from '../../model/Player';
import { User } from '../../model/User';

const matchDate = new Date();
const user1 = new User({
    fullName: 'John Doe',
    phoneNumber: '1234567890',
    email: 'jognne@gmail.com',
    password: 'password123',
    role: 'player',
});

const user2 = new User({
    fullName: 'Johnsss Doe',
    phoneNumber: '1234567890',
    email: 'jognnesss@gmail.com',
    password: 'password123',
    role: 'player',
});

const player1 = new Player({
    user: user1,
    age: 25,
    experience: 5,
    team: 'Home',
});

const player2 = new Player({
    user: user2,
    age: 28,
    experience: 2,
    team: 'AWAY',
});
test('given: valid values for Matches, when: Matches is created, then: Matches is created with those values', () => {
    const match = new Matches({
        date: matchDate,
        hour: '18:00',
        team1: 'Home',
        team2: 'Away',
        players: [player1, player2],
    });

    expect(match.getDate()).toEqual(matchDate);
    expect(match.getHour()).toBe('18:00');
    expect(match.getTeam1()).toBe('Home');
    expect(match.getTeam2()).toBe('Away');
    expect(match.getPlayers()).toContain(player1);
    expect(match.getPlayers()).toContain(player2);
});

test('given: invalid date, when: Matches is validated, then: error is thrown', () => {
    const invalidDate = new Date('invalid date');
    const match = () => new Matches({
        date: invalidDate,
        hour: '18:00',
        team1: 'Home',
        team2: 'Away',
    });

    expect(match).toThrow('Date is required');
});

test('given: invalid hour, when: Matches is validated, then: error is thrown', () => {
    const match = () =>
        new Matches({
            date: matchDate,
            hour: '25:00',
            team1: 'Home',
            team2: 'Away',
        });

    expect(match).toThrow('Hour must be between 00:00 and 23:59');
});

test('given: missing team1, when: Matches is validated, then: error is thrown', () => {
    const match = () =>
        new Matches({
            date: matchDate,
            hour: '18:00',
            team1: '',
            team2: 'Away',
        });

    expect(match).toThrow('Team 1 is required');
});

test('given: missing team2, when: Matches is validated, then: error is thrown', () => {
    const match = () =>
        new Matches({
            date: matchDate,
            hour: '18:00',
            team1: 'Home',
            team2: '',
        });

    expect(match).toThrow('Team 2 is required');
});

