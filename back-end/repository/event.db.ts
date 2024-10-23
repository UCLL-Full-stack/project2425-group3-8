import { set } from "date-fns"
import { Event } from "../model/Event"

const events = [
    new Event({
        id: 1,
        name: "SportEvent1",
        startDate: new Date("2024-10-25"),
        endDate : new Date("2024-10-26")
    }),
    new Event({
        id: 2,
        name: "SportEvent2",
        startDate: new Date("2024-10-27"),
        endDate : new Date("2024-10-28")
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