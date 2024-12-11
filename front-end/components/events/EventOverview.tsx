import { BlockquoteHTMLAttributes, useEffect, useState } from "react";
import EventService from "@services/EventService";
import { CustomEvent as Event } from "@types";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import AddEvent from "./AddEvent";
import MatchesOverview from "../matches/MatchesOverview";
import AddEventToVisitor from "@components/visitor/AddEventToVisitor";

const EventOverview: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isVisitor, setIsVisitor] = useState<boolean>(false);

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

  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser')
    if (user) {
      const visitorStatus = JSON.parse(user).role == 'visitor';
      setIsVisitor(visitorStatus);
    }
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

    if (user) {
      const adminStatus = JSON.parse(user).role == 'admin';
      setIsAdmin(adminStatus);
    }

    fetchEvents();
  }, []);

  const handleDeleteEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleAddEvent = () => {
    fetchEvents();
  }

  const handlePopup = (show: boolean, selectedEvent: Event) =>{
    setShowPopUp(show)
    setSelectedEvent(selectedEvent)
  }

  const sortedEvents = events.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

  return (
    <div>
      {isAdmin && (
        <div className="flex justify-end mb-4">
          <AddEvent onEventAdded={handleAddEvent} />
        </div>
      )}
      <div className='d-flex justify-content-center'>
        <div className="grid grid-cols-2 gap-20 w-full max-w-screen-lg pb-6">
          {events.length > 0 ? (
            sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#9ebdf7] rounded shadow-lg pl-8 pr-8 pt-4 pb-3 cursor-pointer"
                onClick={() => handlePopup(true, event)}
              >
                <div className="flex">
                <h2 className="text-black text-2xl">{event.name}</h2>
                <div className="flex-grow"></div> 
                {isVisitor && (
                <div className="flex justify-end">
                  <AddEventToVisitor onEventAdded={fetchEvents} eventId={event.id ?? 0} />
                </div>
                )}
                </div>
                <p className="text-black">
                  Start date: {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p className="text-black">
                  End date: {new Date(event.endDate).toLocaleDateString()}
                </p>
                <p className="text-black">
                  Address: {event.location.street} {event.location.number}, {event.location.cityCode} {event.location.city}
                </p>
                <p className="text-black">Sport: {event.sport.name}</p>
                {isAdmin && (
                  <div className="flex justify-end">
                    <EditEvent event={event} onEventEdited={fetchEvents} />
                    {event.id !== undefined && (
                      <DeleteEvent eventId={event.id} onDelete={handleDeleteEvent} />
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-red-500">No events added yet</p>
          )}
        </div>
      </div>
      {showPopUp && selectedEvent && (<MatchesOverview selectedEvent={selectedEvent} closePopUp={setShowPopUp}/>)}
    </div>
  );
};

export default EventOverview;
