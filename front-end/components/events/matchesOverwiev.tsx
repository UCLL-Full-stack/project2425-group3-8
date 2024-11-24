import { CustomEvent as Event } from "@types";


{/* pop up voor de events DEATH TO TAILWIND!!!!*/}
const MatchesOverview: React.FC<{selectedEvent: Event, closePopUp: (showPopUp: boolean) => void}> = ({selectedEvent, closePopUp}) => {
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-2/5 h-2/5 flex flex-col justify-evenly items-center">
            <h2 className="text-2xl mb-4 text-center">Event Details</h2>
            {selectedEvent.matches.length > 0 ? (
              <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Date</th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Result</th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.matches.map((match, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(match.date).toLocaleDateString()} {match.hour}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{match.result}</td>
                      <td className="border border-gray-300 px-4 py-2">{match.winner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-red-500 text-center">No matches for this event</p>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              onClick={() => closePopUp(false)}
            >
              Close
            </button>
          </div>
        </div>
    )
}

export default MatchesOverview