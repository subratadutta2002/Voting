import React, { useEffect, useState } from "react";
import Profile from "../../../Image/Profile.png";

const VotersList = () => {
  const [voterIds, setVoterIds] = useState([]);
  const [voterData, setVoterData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVoterIds = async () => {
      try {
        const response = await fetch("http://localhost:4000/votersList");
        const data = await response.json();
        setVoterIds(data.voterIds);
      } catch (error) {
        console.error("Error fetching voter IDs:", error);
        setError("An error occurred while fetching voter IDs.");
      }
    };

    fetchVoterIds();
  }, []);

  useEffect(() => {
    const fetchVoterData = async () => {
      try {
        const voterDetailsPromises = voterIds.map(async (id) => {
          const response = await fetch("http://localhost:4000/VoterIdDetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ VoterID: id }),
          });
          return response.json();
        });

        const voterDetails = await Promise.all(voterDetailsPromises);
        const validVoterData = voterDetails
          .filter((data) => data.result === 1)
          .map((data) => data.voter);
        setVoterData(validVoterData);
      } catch (error) {
        console.error("Error fetching voter data:", error);
        setError("An error occurred while fetching voter data.");
      }
    };

    if (voterIds.length > 0) {
      fetchVoterData();
    }
  }, [voterIds]);

  return (
    <div className="flex items-center w-full justify-center mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {voterData.length > 0 ? (
          voterData.map((voter, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-lg py-3 my-4  border-2"
            >
              <div className="photo-wrapper p-2">
                <img
                  className="w-32 h-32 rounded-full mx-auto"
                  src={Profile}
                  alt="Profile"
                />
              </div>
              <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                  {voter.name}
                </h3>
                <div className="text-center text-gray-400 text-xs font-semibold">
                  <p>{voterIds[index]}</p>
                </div>
                <table className="text-xs my-3">
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Gender :
                      </td>
                      <td className="px-2 py-2">{voter.gender}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Age :
                      </td>
                      <td className="px-2 py-2">{voter.age}</td>
                    </tr>

                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Citizen:
                      </td>
                      <td className="px-2 py-2">{voter.citizen}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-red-500">
            {error ? (
              error
            ) : (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-gray-100 opacity-50">
                  <div className="flex justify-center items-center h-screen">
                    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VotersList;
