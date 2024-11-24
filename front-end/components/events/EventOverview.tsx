import { useEffect, useState } from "react";
import EventService from "@services/EventService";
import { CustomEvent as Event } from "@types";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import AddEvent from "./AddEvent";

const EventOverview: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

  const handleDeleteEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleAddEvent = () => {
    fetchEvents();
  }


  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const sortedEvents = events.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));


  return (
    <div>
      {isAdmin && (
        <AddEvent onEventAdded={handleAddEvent} />
      )}
      <div className='d-flex justify-content-center'>
        <div className="grid grid-cols-2 gap-20 w-full max-w-screen-lg pb-6">
          {events.length > 0 ? (
            sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#9ebdf7] rounded shadow-lg pl-8 pr-8 pt-4 pb-3 cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <h2 className="text-black text-2xl">{event.name}</h2>
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

      {/* pop up voor de events */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-2/5 h-2/5 flex flex-col justify-evenly items-center">
            <h2 className="text-2xl mb-4 text-center">Event Details</h2>
            {selectedEvent.matches.length > 0 ? (
              <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Date</th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Result</th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.matches.map((match, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(match.date).toLocaleDateString()} {match.hour}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{match.result}</td>
                      <td className="border border-gray-300 px-4 py-2">{match.winner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-red-500 text-center">No matches for this event</p>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default EventOverview;