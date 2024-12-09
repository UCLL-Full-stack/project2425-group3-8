import { Event } from "../../model/Event";
import { Sport } from "../../model/Sport";
import { Location } from "../../model/Location"; 
import { EventInput, LocationInput, MatchesInput, SportInput } from "../../types";
import { Matches } from "../../model/Matches";
import eventService from "../../service/event.service";

const start = new Date('2021-01-01');
const end = new Date('2021-01-02');

const sportInput: SportInput = {
    id: 1,
    name: 'Test Sport',
    playerCount: 10,
};

const sport = new Sport({
    ...sportInput,
});

const locationInput: LocationInput = {
    id: 1,
    city: 'Test City',
    cityCode: 'TC',
    street: 'Test Street',
    number: 1,
};

const location = new Location({
    ...locationInput,
})

const matchesInput: MatchesInput = {
    id: 1,
    winner: 'Team 1',
    result: '1-0',
    date: new Date('2021-01-01'),
    hour: '12:00',
    team1: 'Team 1',
    team2: 'Team 2',
    eventId: 1,
};

const matches = new Matches({
    ...matchesInput,
});

const eventInput1: EventInput = {
    name: 'Test Event',
    startDate: start,
    endDate: end,
    sportId: 1,
    locationId: 1,
    matches: [], 
};

const eventInput2: EventInput = {
    name: 'Test Event 2',
    startDate: start,
    endDate: end,
    sportId: 1,
    locationId: 1,
    matches: [], 
};

const event1 = new Event({
    ...eventInput1,
    sport,
    location,
    matches: [matches],
});

const event2 = new Event({
    ...eventInput2,
    sport,
    location,
    matches: [matches],
});


let mockGetAllEvents: jest.Mock;
let mockGetEventByName: jest.Mock;
let mockUpdateEvent: jest.Mock;
let mockDeleteEvent: jest.Mock;
let mockAddEvent: jest.Mock;


beforeEach(() => {
    mockGetAllEvents = jest.fn();
    mockGetEventByName = jest.fn();
    mockUpdateEvent = jest.fn();
    mockDeleteEvent = jest.fn();
    mockAddEvent = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: list of events, when: get all events is called, then: return list of events', async () => {
    mockGetAllEvents.mockResolvedValue([event1, event2]);

    expect(await mockGetAllEvents()).toEqual([event1, event2]);

    expect(mockGetAllEvents).toHaveBeenCalledTimes(1);  
});

test('given: event name, when: get event by name is called, then: return event', async () => {
    mockGetEventByName.mockResolvedValue(event1);

    expect(await mockGetEventByName('Test Event')).toEqual(event1);

    expect(mockGetEventByName).toHaveBeenCalledTimes(1);
    expect(mockGetEventByName).toHaveBeenCalledWith('Test Event');
});

test('given: wrong event name, when: get event by name is called, then: throw error', async () => {

    await expect(eventService.getEventByName('Wrong Event')).rejects.toThrow('Event not found with this name');

});

test('given: event id and update data, when: update event is called, then: return updated event', async () => {
    mockUpdateEvent.mockResolvedValue(event2);

    expect(await mockUpdateEvent("1", eventInput2)).toEqual(event2);

    expect(mockUpdateEvent).toHaveBeenCalledTimes(1);
    expect(mockUpdateEvent).toHaveBeenCalledWith('1', eventInput2);
});

test('given: event id and update data, when: update event is called with wrong id, then: throw error', async () => {
   
    await expect(eventService.updateEvent(3, eventInput2)).rejects.toThrow('Event not found');
});

test('given: event id and eventData, when: update event is called with wrong dates, then: throw error', async () => {

    await expect(eventService.updateEvent(1, {startDate: end, endDate: start})).rejects.toThrow('Start date must be before end date');
});

test('given: event id, when: delete event is called, then: return deleted event', async () => {
    mockDeleteEvent.mockResolvedValue(event1);

    expect(await mockDeleteEvent('1')).toEqual(event1);

    expect(mockDeleteEvent).toHaveBeenCalledTimes(1);
    expect(mockDeleteEvent).toHaveBeenCalledWith('1');
});

test('given: event id, when: delete event is called with wrong id, then: throw error', async () => {
    
    await expect(eventService.deleteEvent(9999999)).rejects.toThrow('Event not found with this id');
});

test('given: event data, when: add event is called, then: return new event', async () => {
    mockAddEvent.mockResolvedValue(event1);

    expect(await mockAddEvent(eventInput1)).toEqual(event1);

    expect(mockAddEvent).toHaveBeenCalledTimes(1);
    expect(mockAddEvent).toHaveBeenCalledWith(eventInput1);
});

test('given: event data, when: add event is called with endate before startdate, then: throw error', async () => {
    
    await expect(eventService.addEvent({name: 'Test Event', startDate: end, endDate: start, sport: sportInput, location: locationInput})).rejects.toThrow('Start date must be before end date');
});




