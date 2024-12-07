import { set } from 'date-fns';
import { Event } from '../../model/Event';
import { Sport } from '../../model/Sport';
import { Location } from '../../model/Location';
import { Matches } from '../../model/Matches';
import { Visitor } from '../../model/Visitor';

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });
const sport = new Sport({ name: 'Football', playerCount: 22 });
const location = new Location({ city: 'City', cityCode: 'CC', street: 'Street', number: 1 });
const match = new Matches({ team1: 'Home', team2: 'Away', date: start, hour: "18:00" });

test('given: valid values for event, when: event is created, then: event is created with those values', () => {

    const event = new Event({
        name: 'Football Championship',
        startDate: start,
        endDate: end,
        sport,
        location,
        matches: [match],
    });

    expect(event.getName()).toBe('Football Championship');
    expect(event.getStartDate()).toEqual(start);
    expect(event.getEndDate()).toEqual(end);
    expect(event.getSport()).toEqual(sport);
    expect(event.getLocation()).toEqual(location);
    expect(event.getMatches()).toContain(match);
});

test('given: event with end date before start date, when: event is created, then: error is thrown', () => {

    const invalidEndDate = set(new Date(), { hours: 7, minutes: 30 });

    const event = () =>
        new Event({
            name: 'Invalid Event',
            startDate: start,
            endDate: invalidEndDate,
        });

    expect(event).toThrow('Start date must be before end date');
});

test('given: event with missing name, when: event is created, then: error is thrown', () => {

    const event = () =>
        new Event({
            name: '',
            startDate: start,
            endDate: end,
        });

    expect(event).toThrow('Name is required');
});

test('given: event with missing start date, when: event is created, then: an error is thrown', () => {

    const event = () =>
        new Event({
            name: 'Test Event',
            startDate: new Date('invalid date'),
            endDate: end,
        });

    expect(event).toThrow('Start date is required');
});

test('given: event with missing end date, when: event is created, then: error is thrown', () => {

    const event = () =>
        new Event({
            name: 'Test Event',
            startDate: start,
            endDate: new Date('invalid date'),
        });

    expect(event).toThrow('End date is required');
});

test('given: event without visitors, when: event is created, then: visitors should be undefined', () => {

    const event = new Event({
        name: 'Event without visitors',
        startDate: start,
        endDate: end,
        sport,
        location,
    });

    expect(event.getVisitors()).toBeUndefined();
});

test('given: event without matches, when: event is created, then: matches should be undefined', () => {

    const event = new Event({
        name: 'Event without visitors',
        startDate: start,
        endDate: end,
        sport,
        location,
    });

    expect(event.getMatches()).toBeUndefined();
});


test('given: valid values, when: setting values through setters, then: values should be updated', () => {
    const event = new Event({
        name: 'Football Championship',
        startDate: start,
        endDate: end,
        sport,
        location,
    });

    const newSport = new Sport({ name: 'Basketball', playerCount: 10 });
    const newLocation = new Location({ city: 'New City', cityCode: 'NC', street: 'New Street', number: 2 });

    event.setSport(newSport);
    event.setLocation(newLocation);
    event.setName('Updated Championship');

    expect(event.getName()).toBe('Updated Championship');
    expect(event.getSport()).toEqual(newSport);
    expect(event.getLocation()).toEqual(newLocation);
});
