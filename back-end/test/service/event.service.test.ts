import eventService from "../../service/event.service";
import { Event } from "../../model/Event";
import { Sport } from "../../model/Sport";
import { Location } from "../../model/Location";
import { EventInput, EventInputPost, LocationInput, MatchesInput, SportInput } from "../../types";
import { Matches } from "../../model/Matches";

const start = new Date('2021-01-01');
const end = new Date('2021-01-02');

const sportInput: SportInput = {
    id: 1,
    name: 'Test Sport',
    playerCount: 10,
};

const locationInput: LocationInput = {
    id: 1,
    city: 'Test City',
    cityCode: 'TC',
    street: 'Test Street',
    number: 1,
};

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

const eventInput1: EventInput = {
    name: 'Test Event',
    startDate: start,
    endDate: end,
    sportId: sportInput,
    locationId: locationInput,
    matches: [],
};

const eventInput2: EventInput = {
    name: 'Test Event 2',
    startDate: start,
    endDate: end,
    sportId: sportInput,
    locationId: locationInput,
    matches: [],
};

const eventInput3: EventInputPost = {
    name: 'Test Event 3',
    startDate: start,
    endDate: end,
    sport: {
        name: 'Test Sport',
        playerCount: 10,
    },
    location: {
        city: 'Test City',
        cityCode: 'TC',
        street: 'Test Street',
        number: 1,
    },

};
const event1 = new Event({
    ...eventInput1,
    sport: new Sport(sportInput),
    location: new Location(locationInput),
    matches: [new Matches(matchesInput)],
});

const event2 = new Event({
    ...eventInput2,
    sport: new Sport(sportInput),
    location: new Location(locationInput),
    matches: [new Matches(matchesInput)],
});

jest.mock("../../service/event.service");

describe("Event Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('given: list of events, when: get all events is called, then: return list of events', async () => {
        jest.spyOn(eventService, 'getAllEvents').mockResolvedValue([event1, event2]);

        const events = await eventService.getAllEvents();
        expect(events).toEqual([event1, event2]);
        expect(eventService.getAllEvents).toHaveBeenCalledTimes(1);
    });

    test('given: event name, when: get event by name is called, then: return event', async () => {
        jest.spyOn(eventService, 'getEventByName').mockResolvedValue(event1);

        const event = await eventService.getEventByName('Test Event');
        expect(event).toEqual(event1);
        expect(eventService.getEventByName).toHaveBeenCalledWith('Test Event');
    });

    test('given: wrong event name, when: get event by name is called, then: throw error', async () => {
        jest.spyOn(eventService, 'getEventByName').mockRejectedValue(new Error('Event not found with this name'));

        await expect(eventService.getEventByName('Wrong Event')).rejects.toThrow('Event not found with this name');
    });

    test('given: event id and update data, when: update event is called, then: return updated event', async () => {
        jest.spyOn(eventService, 'updateEvent').mockResolvedValue(event2);

        const updatedEvent = await eventService.updateEvent(1, eventInput2);
        expect(updatedEvent).toEqual(event2);
        expect(eventService.updateEvent).toHaveBeenCalledWith(1, eventInput2);
    });

    test('given: event id and update data, when: update event is called with wrong id, then: throw error', async () => {
        jest.spyOn(eventService, 'updateEvent').mockRejectedValue(new Error('Event not found'));

        await expect(eventService.updateEvent(3, eventInput2)).rejects.toThrow('Event not found');
    });

    test('given: event id and eventData, when: update event is called with wrong dates, then: throw error', async () => {
        jest.spyOn(eventService, 'updateEvent').mockRejectedValue(new Error('Start date must be before end date'));

        await expect(eventService.updateEvent(1, eventInput2)).rejects.toThrow('Start date must be before end date');
    });

    test('given: event id, when: delete event is called, then: return deleted event', async () => {
        jest.spyOn(eventService, 'deleteEvent').mockResolvedValue(event1);

        const deletedEvent = await eventService.deleteEvent(1);
        expect(deletedEvent).toEqual(event1);
        expect(eventService.deleteEvent).toHaveBeenCalledWith(1);
    });

    test('given: event id, when: delete event is called with wrong id, then: throw error', async () => {
        jest.spyOn(eventService, 'deleteEvent').mockRejectedValue(new Error('Event not found with this id'));

        await expect(eventService.deleteEvent(9999999)).rejects.toThrow('Event not found with this id');
    });

    test('given: event data, when: add event is called, then: return new event', async () => {
        jest.spyOn(eventService, 'addEvent').mockResolvedValue(event1);

        const newEvent = await eventService.addEvent(eventInput3);
        expect(newEvent).toEqual(event1);
    });

    test('given: event data, when: add event is called with end date before start date, then: throw error', async () => {
        jest.spyOn(eventService, 'addEvent').mockRejectedValue(new Error('Start date must be before end date'));

        await expect(eventService.addEvent({
            name: 'Test Event',
            startDate: end,
            endDate: start,
            sport: sportInput,
            location: locationInput
        })).rejects.toThrow('Start date must be before end date');
    });
});
