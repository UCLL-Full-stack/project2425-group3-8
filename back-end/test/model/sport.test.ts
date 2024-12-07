import { Sport } from '../../model/Sport';
import { Sport as SportPrisma } from '@prisma/client';


test('given: valid sport data, when: creating sport, then: sport should be created', () => {
    const sportData = {
      id: 1,
      playerCount: 11,
      name: 'Soccer',
    };

    const sport = new Sport(sportData);

    expect(sport.getId()).toBe(1);
    expect(sport.getPlayerCount()).toBe(11);
    expect(sport.getName()).toBe('Soccer');
  });

  test('given: valid sport data, when: from method is called, then: sport should be created ', () => {
    const sportPrisma: SportPrisma = {
      id: 1,
      playerCount: 11,
      name: 'Basketball',
    };

    const sport = Sport.from(sportPrisma);

    expect(sport.getId()).toBe(1);
    expect(sport.getPlayerCount()).toBe(11);
    expect(sport.getName()).toBe('Basketball');
  });

  test('given: missing playerCount, when: validating sport, then: it should throw an error', () => {
    const invalidSport = {
      id: 1,
      playerCount: 0, 
      name: 'Soccer',
    };

    expect(() => {
      new Sport(invalidSport).validate(invalidSport);
    }).toThrowError('Player count is required');
  });

  test('given: missing name, when: validating sport, then: error should throw', () => {
    const invalidSport = {
      id: 1,
      playerCount: 11,
      name: '', 
    };

    expect(() => {
      new Sport(invalidSport).validate(invalidSport);
    }).toThrowError('Name is required');
  });

  test('given: valid sport data, when: validating sport, then: no error should be thrown', () => {
    const validSport = {
      id: 1,
      playerCount: 11,
      name: 'Soccer',
    };

    expect(() => {
      new Sport(validSport).validate(validSport);
    }).not.toThrow();
  });

