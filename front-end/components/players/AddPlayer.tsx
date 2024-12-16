import { Player } from "@types";
import { useEffect, useState } from "react";
import { addPlayerToMatch, getAllPlayers } from "../../services/PlayerService";
import { useTranslation } from "next-i18next";

interface AddPlayerProps {
    matchId: number;
    teamName: string;
    onAddPlayer: (player: Player) => void;
}

const AddPlayer: React.FC<AddPlayerProps> = ({ matchId, teamName, onAddPlayer }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const { t } = useTranslation();
    
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await getAllPlayers();
                if (response.ok) {
                    const data = await response.json();
                    const mappedPlayers = data.map((player: any) => ({
                        id: player.playerId,
                        name: player.user.fullName,
                        team: player.team
                    }));
                    setPlayers(mappedPlayers);
                    console.log("Fetched players:", mappedPlayers); 
                } else {
                    console.error('Failed to fetch players');
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, [selectedPlayer]);

    const filteredPlayers = players.filter(player => player.team === teamName);

    const handleAddPlayer = async () => {
        if (selectedPlayer) {
            console.log("Adding player:", selectedPlayer);
            if (selectedPlayer.id !== undefined) {
                try {
                    await addPlayerToMatch(selectedPlayer.id, matchId);
                    onAddPlayer(selectedPlayer);
                } catch (error) {
                    console.error("Error adding player to match:", error);
                }
            } else {
                console.error("Selected player ID is undefined.");
            }
        } else {
            console.log("No player selected.");
        }
    };
    

    return (
        <div>
            <h4 className="text-lg mb-2 text-center">{t("matches.player.addPlayer")} {teamName} {t("matches.player.team")}</h4>
            <div>
                {filteredPlayers.length > 0 ? (
                    <select
                        className="w-full p-2 border rounded"
                        onChange={(e) => {
                            const player = filteredPlayers.find((p) => p.id === parseInt(e.target.value));
                            setSelectedPlayer(player || null);
                        }}
                    >
                        <option value="">{t("matches.player.selectPlayer")}</option>
                        {filteredPlayers.map((player) => (
                            <option key={player.id} value={player.id}>
                                {player.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>{t("matches.player.errorMessage2")} {teamName}</p>
                )}
            </div>

            {selectedPlayer && (
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                    onClick={handleAddPlayer}
                >
                    {t("matches.player.add")} {selectedPlayer.name} {t("matches.player.addToMatch")}
                </button>
            )}
        </div>
    );
};

export default AddPlayer;
