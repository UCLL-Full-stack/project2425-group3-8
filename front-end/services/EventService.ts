import { CustomEvent } from "@types";

const getAllEvents = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json' }
    })
}

const DeleteEventById = async (id: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
}

const AddEvent = async (event: CustomEvent) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
}

const EditEvent = async (id: number, event: CustomEvent) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
}
const EventService = {
    getAllEvents,
    DeleteEventById,
    AddEvent,
    EditEvent
}

export default EventService