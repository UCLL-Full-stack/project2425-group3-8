import { set } from "date-fns"
import { Event } from "../model/Event"
import { Sport } from "../model/sport"
import { Location } from "../model/location"

const sports = [
    new Sport({
        id: 1,
        playerCount: 4,
        name: "badminton"
    }),
    new Sport({
        id: 2,
        playerCount: 2,
        name: "tafel tennis"
    })
]

const locations = [
    new Location({
        id: 1,
        city: "Melsbroek",
        cityCode: "1820",
        street: "Orchideeënlaan",
        number: 18
    }),
    new Location({
        id: 2,
        city: "Kortenberg",
        cityCode: "3070",
        street: "Wijngaardstraat",
        number: 1
    })
]

const events = [
    new Event({
        id: 1,
        name: "Badminton Toernooi",
        startDate: new Date("2024-12-25"),
        endDate : new Date("2024-12-26"),
        sport : sports.find(sport => sport.getId() === 1),
        location : locations.find(location => location.getId() === 1)
    }),
    new Event({
        id: 2,
        name: "Tafeltennis Tournament",
        startDate: new Date("2024-12-27"),
        endDate : new Date("2024-12-28"),
        sport : sports.find(sport => sport.getId() === 2),
        location : locations.find(location => location.getId() === 2)
    })
]

const getAllEvents = (): Event[] => {
    return events;
}

const getEventByName = (name:string): Event[] => {
    const event = events.filter((event) => event.getName().toLowerCase().includes(name.toLowerCase()));
    return event
} 

export default {
    getAllEvents,
    getEventByName,
}