import { CustomEvent } from '@types';

const getAllEvents = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

const DeleteEventById = async (id: number) => {
  const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token },
    });
};

const AddEvent = async (event: CustomEvent) => {
  const user = sessionStorage.getItem('loggedInUser');
  let item = null;
  if (user) {
      item = JSON.parse(user);
  }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token },
        body: JSON.stringify(event),
    });
};

const EditEvent = async (id: number, event: CustomEvent) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token },
        body: JSON.stringify(event),
    });
};
const EventService = {
    getAllEvents,
    DeleteEventById,
    AddEvent,
    EditEvent,
};

export default EventService;
