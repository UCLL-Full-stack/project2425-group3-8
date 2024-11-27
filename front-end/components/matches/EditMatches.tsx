import { Matches } from "@types";
import { useState } from "react";
import { editMatches } from "@services/MatchesService"; // Assuming you have an editMatches function in your service

interface EditMatchProps {
    currentMatch: Matches;
    selectedEvent: number;
    onEditMatch: (match: Matches, currentMatchId: number | undefined) => void;
}

const EditMatches: React.FC<EditMatchProps> = ({ currentMatch, selectedEvent, onEditMatch }) => {
    const [team1, setTeam1] = useState(currentMatch.team1);
    const [team2, setTeam2] = useState(currentMatch.team2);
    const [date, setDate] = useState(new Date(currentMatch.date).toISOString().split('T')[0]);
    const [hour, setHour] = useState(currentMatch.hour);
    const [winner, setWinner] = useState(currentMatch.winner || '');
    const [result, setResult] = useState(currentMatch.result || '');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedDate = new Date(date).toISOString();

        const updatedMatch: Matches = {
            team1: team1,
            team2: team2,
            date: formattedDate,
            hour: hour,
            winner: winner || undefined,
            result: result || undefined,
        };

        try {
            await editMatches(updatedMatch, selectedEvent, currentMatch.id || 0);
            setIsModalOpen(false);

            setTeam1('');
            setTeam2('');
            setDate(new Date().toISOString());
            setHour('');
            setWinner('');
            setResult('');
            onEditMatch(updatedMatch, currentMatch.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <button
                    className="flex items-center px-4 py-2 rounded-full text-black"
                    onClick={() => setIsModalOpen(true)}
                >
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
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                    </svg>
                </button>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-gray-100 p-4 rounded-md shadow-md w-11/12 max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-center text-xl font-semibold mb-4 text-black">Edit Match</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="flex flex-col items-center text-black">
                                <div className="mb-3 w-full max-w-xs">
                                    <label
                                        htmlFor="team1"
                                        className="block font-medium mb-1 text-black"
                                    >
                                        Team 1
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                        type="text"
                                        id="team1"
                                        value={team1}
                                        onChange={(e) => setTeam1(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 w-full max-w-xs">
                                    <label
                                        htmlFor="team2"
                                        className="block font-medium mb-1 text-black"
                                    >
                                        Team 2
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                        type="text"
                                        id="team2"
                                        value={team2}
                                        onChange={(e) => setTeam2(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 w-full max-w-xs">
                                    <label
                                        htmlFor="date"
                                        className="block font-medium mb-1 text-black"
                                    >
                                        Date
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                        type="date"
                                        id="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 w-full max-w-xs">
                                    <label
                                        htmlFor="hour"
                                        className="block font-medium mb-1 text-black"
                                    >
                                        Hour
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                        type="text"
                                        id="hour"
                                        value={hour}
                                        onChange={(e) => setHour(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 w-full max-w-xs">
                                    <label
                                        htmlFor="winner"
                                        className="block font-medium mb-1 text-black"
                                    >
                                        Winner
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                        type="text"
                                        id="winner"
                                        value={winner}
                                        onChange={(e) => setWinner(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 w-full max-w-xs">
                                    <label
                                        htmlFor="result"
                                        className="block font-medium mb-1 text-black"
                                    >
                                        Result
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                        type="text"
                                        id="result"
                                        value={result}
                                        onChange={(e) => setResult(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-600 text-sm"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-black px-4 py-2 rounded-full hover:bg-blue-600 text-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditMatches;
