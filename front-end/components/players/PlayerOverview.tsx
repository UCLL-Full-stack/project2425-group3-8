import React, { useEffect, useState } from 'react';
import { getPlayersByTeamAndMatch } from '../../services/MatchesService';
import AddPlayer from './AddPlayer';
import { Player } from '@types';
import DeletePlayer from './DeletePlayer';

interface PlayerOverviewProps {
    matchId: number;
    teamName1: string;
    teamName2: string;
}

const PlayerOverview: React.FC<PlayerOverviewProps> = ({ matchId, teamName1, teamName2 }) => {
    const [playersTeam1, setPlayersTeam1] = useState<Player[]>([]);
    const [playersTeam2, setPlayersTeam2] = useState<Player[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const adminStatus = sessionStorage.getItem("role") === "admin";
        setIsAdmin(adminStatus);

        const fetchPlayers = async (teamName: string, setPlayers: React.Dispatch<React.SetStateAction<Player[]>>) => {
            try {
                const response = await getPlayersByTeamAndMatch(matchId, teamName);
                if (response.ok) {
                    const data = await response.json();
                    const mappedPlayers = data.map((player: any) => ({
                        id: player.playerId,
                        name: player.user.fullName,
                        team: player.team
                    }));
                    setPlayers(mappedPlayers);
                } else {
                    console.error('Failed to fetch players');
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers(teamName1, setPlayersTeam1);
        fetchPlayers(teamName2, setPlayersTeam2);
    }, [matchId, teamName1, teamName2]);

    const handleOpenDetailsPopup = () => {
        setShowDetails(true);
    };

    const handleCloseDetailsPopup = () => {
        setShowDetails(false);
    };

    const addPlayerToMatch = (player: Player) => {
        setSelectedPlayers((prevPlayers) => [...prevPlayers, player]);

        getPlayersByTeamAndMatch(matchId, teamName1).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    const mappedPlayers = data.map((player: any) => ({
                        id: player.playerId,
                        name: player.user.fullName,
                        team: player.team
                    }));
                    setPlayersTeam1(mappedPlayers);
                });
            }
        });

        getPlayersByTeamAndMatch(matchId, teamName2).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    const mappedPlayers = data.map((player: any) => ({
                        id: player.playerId,
                        name: player.user.fullName,
                        team: player.team
                    }));
                    setPlayersTeam2(mappedPlayers);
                });
            }
        });
    }
    const handleDeletePlayer = (team: 'team1' | 'team2', playerId: number) => {
        if (team === 'team1') {
            setPlayersTeam1((prev) => prev.filter((player) => player.id !== playerId));
        } else {
            setPlayersTeam2((prev) => prev.filter((player) => player.id !== playerId));
        }
    };


    return (
        <div>
            <button
                className="bg-green-500 rounded"
                onClick={handleOpenDetailsPopup}
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                </svg>
            </button>

            {showDetails && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-3/5  flex flex-col">
            <h3 className="text-xl mb-2 text-center">Players in this Match</h3>

            <div className={`flex ${isAdmin ? 'space-x-8' : 'justify-center space-x-8'} flex-grow`}>
    <div className="w-1/2">
        <h4 className="text-lg mb-2 text-center">{teamName1} Players</h4>
        <table className="table-auto border-collapse border border-gray-300 w-full text-center">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Player Name</th>
                    {isAdmin && (
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100"></th>
                    )}
                </tr>
            </thead>
            <tbody>
                {playersTeam1.length > 0 ? (
                    playersTeam1.map((player) => (
                        <tr key={player.id}>
                            <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                            {isAdmin && (
                                <td className="border border-gray-300">
                                    <DeletePlayer
                                        playerId={player.id ?? 0}
                                        matchId={matchId}
                                        onDelete={() => handleDeletePlayer('team1', player.id ?? 0)}
                                    />
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={isAdmin ? 2 : 1} className="border border-gray-300 px-4 py-2">
                            No players found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>

    <div className="w-1/2">
        <h4 className="text-lg mb-2 text-center">{teamName2} Players</h4>
        <table className="table-auto border-collapse border border-gray-300 w-full text-center">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Player Name</th>
                    {isAdmin && (
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100"></th>
                    )}
                </tr>
            </thead>
            <tbody>
                {playersTeam2.length > 0 ? (
                    playersTeam2.map((player) => (
                        <tr key={player.id}>
                            <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                            {isAdmin && (
                                <td className="border border-gray-300">
                                    <DeletePlayer
                                        playerId={player.id ?? 0}
                                        matchId={matchId}
                                        onDelete={() => handleDeletePlayer('team2', player.id ?? 0)}
                                    />
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={isAdmin ? 2 : 1} className="border border-gray-300 px-4 py-2">
                            No players found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>

    {isAdmin && (
        <div className="w-1/2 flex flex-col justify-start items-center">
            <AddPlayer matchId={matchId} onAddPlayer={addPlayerToMatch} teamName={teamName1} />
            <AddPlayer matchId={matchId} onAddPlayer={addPlayerToMatch} teamName={teamName2} />
        </div>
    )}
</div>

            <div className="flex justify-center mt-auto pt-8">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleCloseDetailsPopup}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    );
};


export default PlayerOverview;
