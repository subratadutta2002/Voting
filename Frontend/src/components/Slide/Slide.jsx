import React, { useState, useEffect } from "react";

const Slide = ({ state }) => {
  const { contract, account } = state;
  const [winnerCandidate, setWinnerCandidate] = useState(null);

  useEffect(() => {
    const fetchWinnerCandidate = async () => {
      try {
        const winnerCandidateId = await contract.methods
          .winnerCandidateId()
          .call();
        if (winnerCandidateId !== "") {
          const voterResponse = await fetch(
            "http://localhost:4000/VoterIdDetails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ VoterID: winnerCandidateId }),
            }
          );

          const voterData = await voterResponse.json();
          setWinnerCandidate(voterData.voter.name);
        } else {
          setWinnerCandidate("");
        }
      } catch (error) {
        console.error("Error fetching winner candidate:", error);
      }
    };

    fetchWinnerCandidate();
  }, [contract]);

  return (
    <div className="overflow-hidden whitespace-nowrap relative mt-8">
      {winnerCandidate && (
        <div className="inline-block animation-scroll">
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
          <span className="mx-4 text-3xl font-bold text-blue-600 shadow-md px-4">
            Winner Candidate : {winnerCandidate}
          </span>
        </div>
      )}
    </div>
  );
};

export default Slide;
