import { Event } from "../model/Event"
import eventDb from "../repository/event.db"

const getAllEvents = (): Event[] =>{
    return eventDb.getAllEvents()
}

const getEventByName = (name: string): Event[] =>{
    return eventDb.getEventByName(name)
}

export default{
    getAllEvents,
    getEventByName
}