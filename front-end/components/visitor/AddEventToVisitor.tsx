import { addEventToVisitor, checkVisitorRegistration, removeEventFromVisitor } from "@services/VisitorService"; 
import { useEffect, useState } from "react";

interface AddEventToVisitorProps {
    onEventAdded: () => void;
    eventId: number;
}

const AddEventToVisitor: React.FC<AddEventToVisitorProps> = ({ onEventAdded, eventId }) => {
    const [visitorEmail, setVisitorEmail] = useState<string>("");
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser')
        if (user) {
            const email = JSON.parse(user).email;
            setVisitorEmail(email);
            checkRegistrationStatus(email, eventId);
        }
    }, [eventId]);

    const checkRegistrationStatus = async (email: string, eventId: number) => {
        try {
            const response = await checkVisitorRegistration(email, eventId);
            const data = await response.json(); 
            setIsRegistered(data);
        } catch (error) {
            console.error("Failed to check registration status:", error);
        }
    };

    const handleRegistration = async (e: React.FormEvent) => {
        e.stopPropagation()
        try {
            if (isRegistered) {
                await removeEventFromVisitor(visitorEmail, eventId);
                setIsRegistered(false); 
            } else {
                await addEventToVisitor(visitorEmail, eventId);
                setIsRegistered(true);
            }
            onEventAdded();
        } catch (error) {
            console.error(
                `Failed to ${isRegistered ? "remove" : "add"} event for visitor.`,
                error
            );
        }
    };

    return ( 
        <div className="flex justify-end items-center">
    <button onClick={handleRegistration} className="flex items-center px-4 py-2">
        {isRegistered ? (
            <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
            </svg>
        ) : (
            <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"
                />
            </svg>
        )}
    </button>
</div>

    );
};

export default AddEventToVisitor;