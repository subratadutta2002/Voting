import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import VoterHand from "../../../../Image/VoteHand.png";

const Vote = ({ voterId, state }) => {
  const { contract, account } = state;
  const [voterData, setVoterData] = useState(null);
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [lightStates, setLightStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [votingOpen, setVotingOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [voteComplete, setVoteComplete] = useState(false);

  const clickSound = new Audio("../../../../Sound/EVM_Sound.mp3");

  useEffect(() => {
    async function checkVotingStatus() {
      if (!contract || !contract.methods) {
        console.error("Contract is not initialized.");
        setError("Account Not Connected");
        return;
      }
      try {
        const votingOpenStatus = await contract.methods.votingOpen().call();
        const hasVotedCheck = await contract.methods.hasVoted(voterId).call();
        setVotingOpen(votingOpenStatus);
        setHasVoted(hasVotedCheck);
      } catch (error) {
        console.error("Error checking voting status:", error);
      }
    }

    console.log(error);

    checkVotingStatus();
  }, [isLoading, contract]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:4000/getAllCandidates");
        const data = await response.json();
        setCandidates(data);
        setLightStates(new Array(data.length).fill(false));
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleButtonClick = (index, candidateId, candidateName) => {
    clickSound.play();

    setLightStates(new Array(candidates.length).fill(false));
    setLightStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
    setSelectedCandidate(candidateName);
    VoteSubmit(candidateId);
  };

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
          // setError(null);
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

  const VoteSubmit = async (candidateId) => {
    if (!contract || !contract.methods) {
      setError("Contract is not initialized.");
      return;
    }
    setLoading(true);
    try {
      await contract.methods
        .vote(voterId, candidateId, voterData.mobileNumber)
        .send({ from: account });
      setShowPopup(true);
      setVoteComplete(true);
    } catch (error) {
      console.error("Your Vote Not Complete", error);
      setError("Your Vote Not Complete. Please try again.");
    }
    setLoading(false);
  };

  if (error) {
    return (
      <div>
        {" "}
        <div className="min-w-screen flex items-center justify-center px-2 py-2 mt-12 ml-72">
          <div className="rounded-lg bg-white shadow-xl p-16">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </div>
            <div className="text-center mt-4">
              <h1 className="text-purple-900 font-bold text-2xl">{error}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!voterData) {
    return <div>Loading voter data...</div>;
  }

  if (hasVoted) {
    return (
      <div className="min-w-screen flex items-center justify-center px-2 py-2 mt-12 ml-72">
        <div className="rounded-lg bg-white shadow-xl p-16">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          </div>
          <div className="text-center mt-4">
            <h1 className="text-purple-900 font-bold text-2xl">
              You Have Voted
            </h1>
            <p className="text-gray-500 mt-3">
              Thank you for participating in the election.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return votingOpen ? (
    <div className="md:w-1/3 mx-auto mt-8">
      {!voteComplete && (
        <div className="flex items-center justify-center">
          <div className="w-96 bg-gray-200 rounded-lg p-4 shadow-lg">
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Ready</span>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-600">Ballot Unit</span>
            </div>
            <div className="bg-gray-300 rounded-lg p-2 mb-4">
              <div className="w-full h-12 bg-gray-100 rounded flex items-center justify-center">
                {selectedCandidate ? `${selectedCandidate}` : ""}
              </div>
            </div>

            <div>
              {candidates.map((candidate, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-3/5 bg-gray-300 h-8 rounded px-2 flex items-center">
                    {candidate.name}
                  </div>
                  <div className="w-2/5 flex items-center justify-end">
                    <div
                      className={`w-4 h-4 rounded-full mr-2 ${
                        lightStates[index] ? "bg-red-600" : "bg-red-300"
                      }`}
                    ></div>
                    <button
                      className="w-12 h-8 bg-blue-800 rounded-full hover:bg-blue-600 text-white flex items-center justify-center"
                      onClick={() =>
                        handleButtonClick(
                          index,
                          candidate.voterId,
                          candidate.name
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-100 opacity-50">
            <div className="flex justify-center items-center h-screen">
              <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600" />
            </div>
          </div>
        </div>
      )}

      {voteComplete && (
        <div className="mx-auto mt-36 ml-12">
          <img src={VoterHand} alt="Vote Successful" />
        </div>
      )}
    </div>
  ) : (
    <div className="min-w-screen flex items-center justify-center px-2 py-2 mt-12 ml-72">
      <div className="rounded-lg bg-white shadow-xl p-16">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-purple-900 font-bold text-2xl">
            Voting Not Started
          </h1>
          <p className="text-gray-500 mt-3">
            Voting has not started yet. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vote;
