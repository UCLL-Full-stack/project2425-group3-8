import { useState } from "react";
import EventService from "../../services/EventService";
import { CustomEvent } from "@types";
import { useTranslation } from "next-i18next";

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
    const [eventNameError, setEventNameError] = useState<string | null>(null);
    const [eventStartDateError, setEventStartDateError] = useState<string | null>(null);
    const [eventEndDateError, setEventEndDateError] = useState<string | null>(null);
    const [eventAddressCityError, setEventAddressCityError] = useState<string | null>(null);
    const [eventAddressCityCodeError, setEventAddressCityCodeError] = useState<string | null>(null);
    const [eventAddressStreetError, setEventAddressStreetError] = useState<string | null>(null);
    const [eventAddressNumberError, setEventAddressNumberError] = useState<string | null>(null);
    const [eventSportNameError, setEventSportNameError] = useState<string | null>(null);
    const [eventSportPlayerCountError, setEventSportPlayerCountError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const { t } = useTranslation();

    const clearErrors = () => {
        setEventNameError(null);
        setEventStartDateError(null);
        setEventEndDateError(null);
        setEventAddressCityError(null);
        setEventAddressCityCodeError(null);
        setEventAddressStreetError(null);
        setEventAddressNumberError(null);
        setEventSportNameError(null);
        setEventSportPlayerCountError(null);
        setStatusMessage(null);
    };

    const validateForm = () => {
        let isValid = true;
        if (!eventName) {
            setEventNameError(t("addEvent.error.name"));
            isValid = false;
        }
        if (!eventStartDate) {
            setEventStartDateError(t("addEvent.error.startDate"));
            isValid = false;
        }
        if (!eventEndDate) {
            setEventEndDateError(t("addEvent.error.endDate"));
            isValid = false;
        }
        if (eventEndDate < eventStartDate) {
            setEventEndDateError(t("addEvent.error.endDateBeforeStartDate"));
            isValid = false;
        }
        if (!eventAddressCity) {
            setEventAddressCityError(t("addEvent.error.city"));
            isValid = false;
        }
        if (!eventAddressCityCode) {
            setEventAddressCityCodeError(t("addEvent.error.cityCode"));
            isValid = false;
        }
        if (!eventAddressStreet) {
            setEventAddressStreetError(t("addEvent.error.street"));
            isValid = false;
        }
        if (!eventAddressNumber) {
            setEventAddressNumberError(t("addEvent.error.number"));
            isValid = false;
        }
        if (eventAddressNumber && eventAddressNumber < 0) {
            setEventAddressNumberError(t("addEvent.error.number2"));
            isValid = false;
        }
        if (!eventSportName) {
            setEventSportNameError(t("addEvent.error.sportName"));
            isValid = false;
        }
        if (!eventSportPlayerCount) {
            setEventSportPlayerCountError(t("addEvent.error.playerCount"));
            isValid = false;
        }
        if (eventSportPlayerCount && eventSportPlayerCount < 0) {
            setEventSportPlayerCountError(t("addEvent.error.playerCount2"));
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();

        if (!validateForm()) {
            return;
        }

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
                number: eventAddressNumber || undefined,
            },
            sport: {
                name: eventSportName,
                playerCount: eventSportPlayerCount || undefined,
            },
            matches: [],
        };

        try {
            const response = await EventService.AddEvent(event1);

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
            setStatusMessage(null);

            setTimeout(() => {
                setStatusMessage(t("addEvent.error.statusMessage"));
                setTimeout(() => {
                    setStatusMessage(null);
                    setIsModalOpen(false);
                }, 2000);
            });
        } catch (error: any) {
            console.error(error);
        }
    };


    const handleModalClose = () => {
        setIsModalOpen(false);
        clearErrors();
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
                    onClick={handleModalClose}
                >
                    <div
                        className="bg-gray-100 p-6 rounded-md shadow-md w-11/12 max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-center text-xl font-semibold mb-6">{t("addEvent.titlePage")}</h2>

                        {statusMessage && (
                            <div className={`mb-4 text-center p-2 rounded bg-green-100 text-green-800 ${statusMessage}`}>
                                {statusMessage}
                            </div>
                        )}

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
                                    {eventNameError && <p className="text-red-500 text-sm mt-1">{eventNameError}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="startDate" className="block font-medium mb-1">
                                        {t("addEvent.eventColumn.startDate")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="date"
                                        id="startDate"
                                        value={eventStartDate.substring(0, 10)}
                                        onChange={(e) => setEventStartDate(e.target.value)}
                                    />
                                    {eventStartDateError && <p className="text-red-500 text-sm mt-1">{eventStartDateError}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="endDate" className="block font-medium mb-1">
                                        {t("addEvent.eventColumn.endDate")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="date"
                                        id="endDate"
                                        value={eventEndDate.substring(0, 10)}
                                        onChange={(e) => setEventEndDate(e.target.value)}
                                    />
                                    {eventEndDateError && <p className="text-red-500 text-sm mt-1">{eventEndDateError}</p>}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">{t("addEvent.locationColumn.title")}</h3>
                                <div className="mb-4">
                                    <label htmlFor="city" className="block font-medium mb-1">
                                        {t("addEvent.locationColumn.city")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="text"
                                        id="city"
                                        value={eventAddressCity}
                                        onChange={(e) => setEventAddressCity(e.target.value)}
                                    />
                                    {eventAddressCityError && <p className="text-red-500 text-sm mt-1">{eventAddressCityError}</p>}
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
                                    {eventAddressCityCodeError && <p className="text-red-500 text-sm mt-1">{eventAddressCityCodeError}</p>}
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
                                    {eventAddressStreetError && <p className="text-red-500 text-sm mt-1">{eventAddressStreetError}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="number" className="block font-medium mb-1">
                                        {t("addEvent.locationColumn.number")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="number"
                                        id="number"
                                        value={eventAddressNumber || ""}
                                        onChange={(e) => setEventAddressNumber(Number(e.target.value))}
                                    />
                                    {eventAddressNumberError && <p className="text-red-500 text-sm mt-1">{eventAddressNumberError}</p>}
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
                                    {eventSportNameError && <p className="text-red-500 text-sm mt-1">{eventSportNameError}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="playerCount" className="block font-medium mb-1">
                                        {t("addEvent.sportColumn.playerCount")}
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        type="number"
                                        id="playerCount"
                                        value={eventSportPlayerCount || ""}
                                        onChange={(e) => setEventSportPlayerCount(Number(e.target.value))}
                                    />
                                    {eventSportPlayerCountError && <p className="text-red-500 text-sm mt-1">{eventSportPlayerCountError}</p>}
                                </div>
                            </div>

                            <div className="col-span-3 flex justify-between mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                                    onSubmit={handleSubmit}
                                >
                                    {t("addEvent.submit")}
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    {t("addEvent.cancel")}
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
