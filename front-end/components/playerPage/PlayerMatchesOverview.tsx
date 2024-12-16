import { getEventNameByMatch } from "@services/MatchesService";
import { getPlayerMatches } from "@services/PlayerService";
import { Matches } from "@types";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

const PlayerMatchesOverview: React.FC = () => {
    const [matches, setMatches] = useState<Matches[]>([]);
    const [isPlayerEmail, setIsPlayerEmail] = useState<string>("");
    const [isEventName, setIsEventName] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser')
        if (user) {
            const playerMail = JSON.parse(user).email
            setIsPlayerEmail(playerMail.toString());
        }
        fetchPlayerMatches();
    }, [isPlayerEmail]);

    const fetchPlayerMatches = async () => {
        try {
            const response = await getPlayerMatches(isPlayerEmail);
            const data = await response.json();
            setMatches(data);
            fetchEventName(data[0].id);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEventName = async (matchId: number) => {
        try {
            const response = await getEventNameByMatch(matchId);
            const data = await response.json();
            setIsEventName(data.name);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <table
                style={{
                    width: "70%",
                    borderCollapse: "collapse",
                    margin: "20px auto", 
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>{t("playerPage.matchName")} </th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>{t("playerPage.date")}</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>{t("playerPage.hour")}</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>{t("playerPage.teams")}</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>{t("playerPage.winner")}</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>{t("playerPage.result")}</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match) => (
                        <tr key={match.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {isEventName ?? "Unknown"}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {new Date(match.date).toLocaleDateString()}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{match.hour}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {match.team1} vs {match.team2}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {match.winner ?? "/"}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {match.result ?? "/"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerMatchesOverview;
