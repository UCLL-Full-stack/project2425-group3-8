import { deleteMatches } from "@services/MatchesService";
import { useState } from "react";

interface DeleteEventProps {
    eventId: number;
    onDelete: (id: number) => void;
}

const DeleteMatches: React.FC<DeleteEventProps> = ({ eventId, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleDeleteClick = () => {
        setShowPopup(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await deleteMatches(eventId);
            if (response.ok) {
                onDelete(eventId);
            } else {
                alert("Failed to delete event");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("An error occurred while deleting the event");
        }
        setShowPopup(false);
    }

    const cancelDelete = () => {
        setShowPopup(false);
    };

    const buttonStyle = {
        margin: '10px',
        backgroundColor: '#2563EB',
        color: 'white',
        borderRadius: '5px',
    };

    return (
        <div>
            <button onClick={handleDeleteClick}>
                <svg
                    className="w-6 h-6 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                </svg>
            </button>

            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    border: '1px solid #ccc',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000,
                    textAlign: 'center',
                    borderRadius: '5px',
                }}>
                    <p className="text-xl">Are you sure you want to delete this match from this event? </p>
                    <p className="text-xl flex justify-start">There is no way back buddy..</p>
                    <button style={buttonStyle} onClick={confirmDelete}>Yes</button>
                    <button style={buttonStyle} onClick={cancelDelete}>No</button>
                </div>
            )}
        </div>
    );
}

export default DeleteMatches;