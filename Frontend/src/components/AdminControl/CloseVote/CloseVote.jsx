import React, { useState, useEffect } from "react";

const CloseVote = ({ state }) => {
  const { contract, account } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [votingOpen, setVotingOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function checkVotingStatus() {
      if (!contract || !contract.methods) {
        console.error("Account Not Connected");
        setErrorMessage("Account Not Connected");
        return;
      }
      try {
        const votingOpenStatus = await contract.methods.votingOpen().call();
        console.log(votingOpenStatus);
        setVotingOpen(votingOpenStatus);
      } catch (error) {
        console.error("Error checking voting status:", error);
        setErrorMessage("Error checking voting status. Please try again.");
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
      await contract.methods.closeVoting().send({ from: account });
      setIsLoading(false);
      setVotingOpen(false);
    } catch (error) {
      console.error("Error closing vote:", error);
      setErrorMessage("Error closing vote. Please try again.");
      setIsLoading(false);
    }
  };

  return votingOpen ? (
    <div className="w-full md:w-1/3 mx-auto mt-36">
      <div className="flex flex-col p-5 rounded-xl shadow bg-white border-2">
        <div className="flex">
          <div>
            <svg
              className="w-6 h-6 fill-current text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
            </svg>
          </div>
          <div className="ml-3">
            <h2 className="font-semibold text-gray-800">
              Close Vote
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            If you want to close voting then click close vote
            </p>
          </div>
        </div>
        <div className="flex items-center mt-3">
          <button
            className="flex-1 px-4 py-2 ml-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Close"}
          </button>
        </div>
        {errorMessage && (
          <div className="text-center mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </div>
  ) : (
    <div className="w-full md:w-1/3 mx-auto mt-8">
      <div className="rounded-lg bg-white shadow-xl p-16">
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
            Vote is Not Start
          </h1>
        </div>
        {errorMessage && (
          <div className="text-center mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default CloseVote;
