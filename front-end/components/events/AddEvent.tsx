import { useState } from "react";
import EventService from "../../services/EventService";
import { CustomEvent } from "@types"; 
import { useTranslation } from "next-i18next";
import { t } from "i18next";
interface AddEventProps {
    onEventAdded: () => void;
}

const AddEvent: React.FC<AddEventProps> = ({ onEventAdded }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventName, setEventName] = useState("");
    const [eventStartDate, setEventStartDate] = useState(new Date().toISOString());
    const [eventEndDate, setEventEndDate] = useState(new Date().toISOString());
    const [eventAddressCity, setEventAddressCity] = useState("");
    const [eventAddressCityCode, setEventAddressCityCode] = useState("");
    const [eventAddressStreet, setEventAddressStreet] = useState("");
    const [eventAddressNumber, setEventAddressNumber] = useState<number | undefined>(); 
    const [eventSportName, setEventSportName] = useState("");
    const [eventSportPlayerCount, setEventSportPlayerCount] = useState<number | undefined>();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedStartDate = new Date(eventStartDate).toISOString();
        const formattedEndDate = new Date(eventEndDate).toISOString();

        const event1: CustomEvent = {
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
            await EventService.AddEvent(event1);
            setIsModalOpen(false);
            onEventAdded(); 

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
            console.error("Failed to add event.");
        }
    };

    return (
        <div>
            <div className="flex justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-blue-600 px-4 py-2 rounded-full text-white hover:bg-blue-800"
                >
                    <svg
                        className="w-6 h-6 text-white mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    {t("addEvent.titlePage")}
                </button>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-gray-100 p-6 rounded-md shadow-md w-11/12 max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-center text-xl font-semibold mb-6"> {t("addEvent.titlePage")}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">{t("addEvent.eventColumn.title")}</h3>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block font-medium mb-1">
                                    {t("addEvent.eventColumn.name")}
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
                                    {t("addEvent.eventColumn.startDate")}
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
                                    {t("addEvent.eventColumn.endDate")}
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
                                <h3 className="text-lg font-semibold mb-4">{t("addEvent.locationColumn.title")}</h3>
                                <div className="mb-4">
                                    <label htmlFor="city" className="block font-medium mb-1">
                                    
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
                                    {t("addEvent.locationColumn.cityCode")}
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
                                    {t("addEvent.locationColumn.street")}
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
                                    {t("addEvent.locationColumn.number")}
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
                                <h3 className="text-lg font-semibold mb-4">{t("addEvent.sportColumn.title")}</h3>
                                <div className="mb-4">
                                    <label htmlFor="sportName" className="block font-medium mb-1">
                                    {t("addEvent.sportColumn.name")}
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
                                    {t("addEvent.sportColumn.playerCount")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="text"
                                        id="playerCount"
                                        value={eventSportPlayerCount || ""}
                                        onChange={(e) =>
                                            setEventSportPlayerCount(Number(e.target.value) || undefined)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-span-3 text-center mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                                >
                                    {t("addEvent.titlePage")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddEvent;
