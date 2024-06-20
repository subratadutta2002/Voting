import React, { useEffect, useState } from "react";
import Profile from "../../../../Image/Profile.png";

const VoterCard = ({ voterId }) => {
  const [voterData, setVoterData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVoterData = async () => {
      try {
        const response = await fetch("http://localhost:4000/VoterIdDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ VoterID: voterId }),
        });
        const data = await response.json();
        if (data.result === 1) {
          setVoterData(data.voter);
          setError(null); // Reset error state on successful fetch
        } else {
          setError("Voter ID not found or invalid.");
        }
      } catch (error) {
        console.error("Error fetching voter data:", error);
        setError("An error occurred while fetching voter data.");
      }
    };

    fetchVoterData();
  }, [voterId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!voterData) {
    return <div></div>;
  }

  return (
    <div className="flex items-center w-full justify-center mt-8">
      <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={Profile}
              alt="Profile"
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {voterData.name}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>{voterId}</p>
            </div>
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Gender :
                  </td>
                  <td className="px-2 py-2">{voterData.gender}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Age :
                  </td>
                  <td className="px-2 py-2">{voterData.age}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Mobile Number :
                  </td>
                  <td className="px-2 py-2">{voterData.mobileNumber}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Citizen:
                  </td>
                  <td className="px-2 py-2">{voterData.citizen}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterCard;
