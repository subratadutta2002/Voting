import React, { useState, useEffect } from "react";

const StartVote = ({ state }) => {
  const { contract, account } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [votingOpen, setVotingOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function checkVotingStatus() {
      if (!contract || !contract.methods) {
        console.error("Account Not Connected");
        return;
      }
      try {
        const votingOpenStatus = await contract.methods.votingOpen().call();
        console.log(votingOpenStatus);
        setVotingOpen(votingOpenStatus);
      } catch (error) {
        console.error("Error checking voting status:", error);
      }
    }

    checkVotingStatus();
  }, [isLoading, contract]);

  const handleSubmit = async () => {
    if (!contract || !contract.methods) {
      setErrorMessage("Account Not Connected");
      return;
    }
    setIsLoading(true);
    try {
      await contract.methods.startVoting().send({ from: account });
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Error starting vote. Please try again.");
      setIsLoading(false);
    }
  };

  return votingOpen ? (
    <div className="w-full md:w-1/3 mx-auto mt-8">
      <div className="rounded-lg bg-white shadow-xl p-16 border-2">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-indigo-800"
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
            Vote is Started
          </h1>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-w-screen flex items-center justify-center px-2 py-2 mt-12 ml-72">
      <div className="rounded-lg bg-white shadow-xl p-16 border-2">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-indigo-800"
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
          <h1 className="text-purple-900 font-bold text-2xl">Start Vote</h1>
          <p className="text-gray-500 mt-3">
          If you want to start voting then click start vote.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="text-white py-2 px-4 rounded-lg bg-purple-700 hover:bg-purple-600 shadow-md font-medium transition-colors"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Start"}
          </button>
        </div>
        {errorMessage && (
          <div className="text-center mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default StartVote;
