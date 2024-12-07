import { Player } from '../../model/Player';
import { User } from '../../model/User';
import { Location } from '../../model/Location';
import { Matches } from '../../model/Matches';
import { Player as PlayerPrisma } from '@prisma/client';

describe('Player Class', () => {
  test('given: valid player data, when: creating player, then: player should be created ', () => {
    const user = new User({
      fullName: 'Jane Doe',
      phoneNumber: '0987654321',
      email: 'jane.doe@example.com',
      password: 'password321',
      role: 'player',
    });

    const location = new Location({
      city: 'Gotham',
      cityCode: '6789g',
      street: 'Baker Street',
      number: 456,
    });

    const playerData = {
      user: user,
      playerId: 1,
      age: 25,
      experience: 5,
      address: location,
      team: 'Team A',
    };

    const player = new Player(playerData);

    expect(player.getFullName()).toBe('Jane Doe');
    expect(player.getPhoneNumber()).toBe('0987654321');
    expect(player.getEmail()).toBe('jane.doe@example.com');
    expect(player.getAge()).toBe(25);
    expect(player.getExperience()).toBe(5);
    expect(player.getTeam()).toBe('Team A');
  });

  test('given: missing age, when: validating player, then: error is thrown', () => {
    const invalidPlayer = {
      user: new User({
        fullName: 'John Smith',
        phoneNumber: '1122334455',
        email: 'john.smith@example.com',
        password: 'password321',
        role: 'player',
      }),
      age: 0,
      experience: 5,
      team: 'Team B',
    };

    expect(() => {
      new Player(invalidPlayer).validatePlayer(invalidPlayer);
    }).toThrow('Age is required');
  });

  test('given: invalid age (greater than 200), when: validating player, then: error is thrown', () => {
    const invalidPlayer = {
      user: new User({
        fullName: 'Sarah Connor',
        phoneNumber: '9988776655',
        email: 'sarah.connor@example.com',
        password: 'password123',
        role: 'player',
      }),
      age: 201, // Invalid age
      experience: 10,
      team: 'Team X',
    };

    expect(() => {
      new Player(invalidPlayer).validatePlayer(invalidPlayer);
    }).toThrowError('Age must be between 0 and 200');
  });

  test('given: valid player data, when: validating player, then: error is thrown', () => {
    const validPlayer = {
      user: new User({
        fullName: 'Alex Lee',
        phoneNumber: '1231231234',
        email: 'alex.lee@example.com',
        password: 'securepassword',
        role: 'player',
      }),
      age: 30,
      experience: 8,
      team: 'Team Y',
    };

    expect(() => {
      new Player(validPlayer).validatePlayer(validPlayer);
    }).not.toThrow();
  });

  test('given: missing experience, when: validating player, then: error is thrown', () => {
    const invalidPlayer = {
      user: new User({
        fullName: 'Lily James',
        phoneNumber: '1122334455',
        email: 'lily.james@example.com',
        password: 'password',
        role: 'player',
      }),
      age: 24,
      experience: 0, // Invalid experience
      team: 'Team Z',
    };

    expect(() => {
      new Player(invalidPlayer).validatePlayer(invalidPlayer);
    }).toThrowError('Experience is required');
  });

  test('given: missing team, when: validating player, then: error is thrown', () => {
    const invalidPlayer = {
      user: new User({
        fullName: 'Chris Brown',
        phoneNumber: '2233445566',
        email: 'chris.brown@example.com',
        password: 'password654',
        role: 'player',
      }),
      age: 22,
      experience: 3,
      team: '', // Missing team
    };

    expect(() => {
      new Player(invalidPlayer).validatePlayer(invalidPlayer);
    }).toThrow('Team is required');
  });
});
