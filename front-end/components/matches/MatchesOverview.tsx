import React, { useEffect, useState } from 'react';
import { CustomEvent as Event, Matches } from '@types';
import PlayerOverview from '../players/PlayerOverview';
import AddMatches from './AddMatches';
import EditMatches from './EditMatches';
import DeleteMatches from './DeleteMatches';

const MatchesOverview: React.FC<{ selectedEvent: Event; closePopUp: (showPopUp: boolean) => void }> = ({
  selectedEvent,
  closePopUp,
}) => {
  const [matches, setMatches] = useState<Matches[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    
    const sortedMatches = [...selectedEvent.matches].sort((a, b) => (a.id ?? 0) - (b.id ?? 0)); 
    setMatches(sortedMatches);
    const adminStatus = sessionStorage.getItem("Admin") === "true";
    setIsAdmin(adminStatus);
  }, [selectedEvent]);

  const addMatchToList = (match: Matches) => {
    setMatches((prevMatches) => [...prevMatches, match]);
  };

  const handleEditMatch = (match: Matches, currentMatchId: number | undefined) => { 
    if(currentMatchId){
      handleDeleteMatch(currentMatchId)
    }
    setMatches((prevMatches) => [...prevMatches, match]);
  }

  const handleDeleteMatch = (id: number) => {
    console.log(id)
    setMatches((prevMatches) => prevMatches.filter((match) => match.id !== id));
  };
  const sortedMatches = matches.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg flex flex-col justify-evenly items-center">
        {isAdmin && (
        <div className='flex justify-end mb-2 w-full'>
      <AddMatches eventId={selectedEvent.id ?? 0} onAddMatch={addMatchToList} />
      </div>
      )}
        <div className="flex items-center w-full mb-2">
        
          <h2 className="text-2xl flex-grow text-center">Event Details</h2>

        </div>

        {matches.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-300 w-full text-center">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Date</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Teams</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Result</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Winner</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Players</th>
                {isAdmin &&
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Actions</th>
              }
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(match.date).toLocaleDateString()} {match.hour}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {match.team1} vs {match.team2}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {match.result ? match.result : '/'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {match.winner ? match.winner : '/'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <PlayerOverview matchId={match.id ?? 0} teamName1={match.team1} teamName2={match.team2} />
                  </td>
                  {isAdmin && (
                  <td className="border border-gray-300 px-4 py-3 flex gap-1">
                    <EditMatches currentMatch={match} selectedEvent={selectedEvent.id ?? 0} onEditMatch={handleEditMatch}/>
                    <DeleteMatches eventId={match.id ?? 0} onDelete={handleDeleteMatch}  />
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500 text-center">No matches for this event</p>
        )}

        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded" onClick={() => { closePopUp(false); window.location.reload(); }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MatchesOverview;
