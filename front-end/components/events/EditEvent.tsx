import { useState, useEffect } from "react";
import EventService from "../../services/EventService";
import { CustomEvent } from "@types"; 
import { useTranslation } from "next-i18next";

interface EditEventProps {
    event: CustomEvent;
    onEventEdited: () => void; 
}

const EditEvent: React.FC<EditEventProps> = ({ event, onEventEdited }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventName, setEventName] = useState(event.name);
    const [eventStartDate, setEventStartDate] = useState(event.startDate);
    const [eventEndDate, setEventEndDate] = useState(event.endDate);
    const [eventAddressCity, setEventAddressCity] = useState(event.location.city);
    const [eventAddressCityCode, setEventAddressCityCode] = useState(event.location.cityCode);
    const [eventAddressStreet, setEventAddressStreet] = useState(event.location.street);
    const [eventAddressNumber, setEventAddressNumber] = useState(event.location.number);
    const [eventSportName, setEventSportName] = useState(event.sport.name);
    const [eventSportPlayerCount, setEventSportPlayerCount] = useState(event.sport.playerCount);
    const { t } = useTranslation();

    useEffect(() => {
        setEventName(event.name);
        setEventStartDate(event.startDate);
        setEventEndDate(event.endDate);
        setEventAddressCity(event.location.city);
        setEventAddressCityCode(event.location.cityCode);
        setEventAddressStreet(event.location.street);
        setEventAddressNumber(event.location.number);
        setEventSportName(event.sport.name);
        setEventSportPlayerCount(event.sport.playerCount);
    }, [event]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedStartDate = new Date(eventStartDate).toISOString();
        const formattedEndDate = new Date(eventEndDate).toISOString();

        const updatedEvent: CustomEvent = {
            name: eventName,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            location: {
                city: eventAddressCity,
                cityCode: eventAddressCityCode,
                street: eventAddressStreet,
                number: eventAddressNumber || undefined
            },
            sport: {
                name: eventSportName,
                playerCount: eventSportPlayerCount || undefined
            },
            matches: []
        };

        try {
            if (event.id !== undefined) {
                await EventService.EditEvent(event.id, updatedEvent);
              } else {
                console.error("Event ID is undefined");
              }
              
            setIsModalOpen(false);
            onEventEdited(); 

            setEventName("");
            setEventStartDate(new Date().toISOString());
            setEventEndDate(new Date().toISOString());
            setEventAddressCity("");
            setEventAddressCityCode("");
            setEventAddressStreet("");
            setEventAddressNumber(undefined);
            setEventSportName("");
            setEventSportPlayerCount(undefined);
        } catch (error) {
            console.error("Failed to edit event.");
        }
    };

    return (
        <div>
            
            <button
        onClick={(e) => {e.stopPropagation(), setIsModalOpen(true)}}
        style={{
          cursor: "pointer",
        }}
      >
        <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
        </svg>
      </button>
            

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-gray-100 p-6 rounded-md shadow-md w-11/12 max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-center text-xl font-semibold mb-6">{t("editEvent.titlePage")} </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">{t("editEvent.eventColumn.title")}</h3>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block font-medium mb-1">
                                    {t("editEvent.eventColumn.name")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="text"
                                        id="name"
                                        value={eventName}
                                        onChange={(e) => setEventName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="startDate" className="block font-medium mb-1">
                                    {t("editEvent.eventColumn.startDate")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="date"
                                        id="startDate"
                                        value={eventStartDate.substring(0, 10)} // Show only YYYY-MM-DD
                                        onChange={(e) => setEventStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="endDate" className="block font-medium mb-1">
                                    {t("editEvent.eventColumn.endDate")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="date"
                                        id="endDate"
                                        value={eventEndDate.substring(0, 10)} // Show only YYYY-MM-DD
                                        onChange={(e) => setEventEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">{t("editEvent.locationColumn.title")}</h3>
                                <div className="mb-4">
                                    <label htmlFor="city" className="block font-medium mb-1">
                                    {t("editEvent.locationColumn.city")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="text"
                                        id="city"
                                        value={eventAddressCity}
                                        onChange={(e) => setEventAddressCity(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="cityCode" className="block font-medium mb-1">
                                    {t("editEvent.locationColumn.cityCode")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="text"
                                        id="cityCode"
                                        value={eventAddressCityCode}
                                        onChange={(e) => setEventAddressCityCode(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="street" className="block font-medium mb-1">
                                    {t("editEvent.locationColumn.street")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="text"
                                        id="street"
                                        value={eventAddressStreet}
                                        onChange={(e) => setEventAddressStreet(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="number" className="block font-medium mb-1">
                                    {t("editEvent.locationColumn.number")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="text"
                                        id="number"
                                        value={eventAddressNumber || ""}
                                        onChange={(e) => setEventAddressNumber(Number(e.target.value) || undefined)}
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">{t("editEvent.sportColumn.title")}</h3>
                                <div className="mb-4">
                                    <label htmlFor="sportName" className="block font-medium mb-1">
                                    {t("editEvent.sportColumn.name")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="text"
                                        id="sportName"
                                        value={eventSportName}
                                        onChange={(e) => setEventSportName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="playerCount" className="block font-medium mb-1">
                                    {t("editEvent.sportColumn.playerCount")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="number"
                                        id="playerCount"
                                        value={eventSportPlayerCount || ""}
                                        onChange={(e) => setEventSportPlayerCount(Number(e.target.value) || undefined)}
                                    />
                                </div>
                            </div>

                            <div className="col-span-3 flex justify-between mt-4">
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-full"
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    {t("editEvent.cancel")}
                                </button>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-full"
                                    type="submit"
                                >
                                    {t("editEvent.save")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditEvent;
