import EventService from "@services/EventService";
import { useEffect, useState } from "react";
import { Event } from "@types";
import EditEvent from "./EditEvent";

const EventOverview: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await EventService.getAllEvents();
        if (response.ok) {
          const eventData = await response.json();
          setEvents(eventData);
        } else {
          console.error("Failed to fetch events.");
        }
      } catch (error) {
        console.error("Failed to connect to server to get all events.");
      }
    };
    const adminStatus = sessionStorage.getItem("Admin") === "true";
    setIsAdmin(adminStatus);

    fetchEvents();
  }, []);

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-20 w-full max-w-screen-lg">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="bg-[#9ebdf7] rounded-lg shadow-lg pl-8 pt-4 pb-3">
                <h2 className="text-black text-2xl">{event.name}</h2>
                <p className="text-black">Start date: {new Date(event.startDate).toLocaleDateString()}</p>
                <p className="text-black">End date: {new Date(event.endDate).toLocaleDateString()}</p>
                <p className="text-black">Address: {event.location.street} {event.location.number}, {event.location.cityCode} {event.location.city} </p>
                <p className="text-black">Sport: {event.sport.name}</p>
                {isAdmin && (
          <div className="flex justify-end">
            
            <EditEvent/>

            <button >
              <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
              </svg>
            </button>
          </div>
        )}

              </div>
            ))
          ) : (
            <p className="text-red-500">No events added yet</p>
          )}
        </div>
        
      </div>
    </>
  );
};

export default EventOverview;
