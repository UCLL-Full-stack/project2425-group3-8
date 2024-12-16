import { Matches } from "@types";
import { useState } from "react";
import { addMatches } from "@services/MatchesService";
import { useTranslation } from "next-i18next";

interface AddMatchProps {
    eventId: number;
    onAddMatch: (newMatch: Matches) => void;

}

const AddMatches: React.FC<AddMatchProps> = ({ eventId, onAddMatch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [winner, setWinner] = useState('');
    const [result, setResult] = useState('');
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedDate = new Date(date).toISOString();

        const newMatch: Matches = {
            team1: team1,
            team2: team2,
            date: formattedDate,
            hour: hour,
            winner: winner || undefined,
            result: result || undefined,
            eventId: undefined,
        };

        try {
            await addMatches(newMatch, eventId);
            setIsModalOpen(false);

            setTeam1('');
            setTeam2('');
            setDate(new Date().toISOString());
            setHour('');
            setWinner('');
            setResult('');
            onAddMatch(newMatch);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="flex justify-center">
                <button
                    className="flex items-center bg-blue-600 px-4 py-2 rounded-full text-white hover:bg-blue-500"
                    onClick={() => setIsModalOpen(true)}
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
                    {t('matches.addMatches.title')}
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
                        <h2 className="text-center text-xl font-semibold mb-4">{t('matches.addMatches.title')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="flex flex-col items-center">
                                <div className="mb-3 w-full max-w-xs">
                                    <label htmlFor="team1" className="block font-medium mb-1">
                                    {t('matches.addMatches.team1')}
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
                                    <label htmlFor="team2" className="block font-medium mb-1">
                                    {t('matches.addMatches.team2')}
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
                                    <label htmlFor="date" className="block font-medium mb-1">
                                    {t('matches.addMatches.date')}
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
                                    <label htmlFor="hour" className="block font-medium mb-1">
                                    {t('matches.addMatches.hour')}
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
                                    <label htmlFor="winner" className="block font-medium mb-1">
                                    {t('matches.addMatches.winner')}
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
                                    <label htmlFor="result" className="block font-medium mb-1">
                                    {t('matches.addMatches.result')}
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
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 text-sm"
                                >
                                    {t('matches.addMatches.add')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddMatches;
