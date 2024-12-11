import { getVisitorMatches } from "@services/VisitorService";
import { CustomEvent } from "@types";
import { useEffect, useState } from "react";


const VisitorMatchesOverview: React.FC = () => {
    const [events, setEvents] = useState<CustomEvent[]>([]);
    const [isVisitorEmail, setIsVisitorEmail] = useState<string>("");

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser')
        if (user) {
            const visitorEmail = JSON.parse(user).email
            setIsVisitorEmail(visitorEmail);
        }
        fetchVisitorMatches();
    }, [isVisitorEmail]);

    const fetchVisitorMatches = async () => {
        try {
            const response = await getVisitorMatches(isVisitorEmail);
            const data = await response.json();
            setEvents(data);
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
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Start Date</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>End Date</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sport</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Location</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Matches</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((match) => (
                        <tr key={match.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {match.name}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {new Date(match.startDate).toLocaleDateString()}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {new Date(match.endDate).toLocaleDateString()}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {match.sport.name}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {match.location.street} {match.location.number}, {match.location.city} - {match.location.cityCode}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {match.matches.map((match) => (
                                    <div key={match.id}>
                                        {match.team1} vs {match.team2}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitorMatchesOverview;