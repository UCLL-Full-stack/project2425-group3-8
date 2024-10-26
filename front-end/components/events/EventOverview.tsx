import EventService from "@services/EventService"
import { useEffect, useState } from "react"
import { Event } from '@types'


const EventOverview: React.FC = () => {

    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await EventService.getAllEvents();
                if (response.ok) {
                    const eventData = await response.json()
                    setEvents(eventData)
                } else {
                    console.error('Failed to fetch events.')
                }
            } catch (error) {
                console.error('Failed to connect to server to get all events.')
            }
        }

        fetchEvents()
    }, [])

    return (
        <>
            <div className=" grid grid-cols-2 gap-20 w-full max-w-screen-lg">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="bg-[#9ebdf7] rounded-lg shadow-lg pl-8 pt-4 pb-3 " >
                            <h2 className="text-black text-2xl">{event.name}</h2>
                            <p className="text-black ">Start date: {new Date(event.startDate).toLocaleDateString()}</p>
                            <p className="text-black">End date: {new Date(event.endDate).toLocaleDateString()}</p>
                            <p className="text-black">Address: {event.location.street} {event.location.number}, {event.location.cityCode} {event.location.city} </p>
                            <p className="text-black">Sport: {event.sport.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-red-500">No events added yet</p>
                )}
            </div>
        </>
    )
}


export default EventOverview