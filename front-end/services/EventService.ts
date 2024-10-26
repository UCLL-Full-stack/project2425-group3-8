const getAllEvents = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json' }
    })
}

const getLecturerById = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  };

const EventService = {
    getAllEvents,
    getLecturerById
}

export default EventService