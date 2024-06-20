import React, { useState, useEffect } from "react";

const AddAgeProof = ({ state }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const { contract, account } = state;

    if (!name || !age) {
      setErrorMessage("Please Enter Both Name and Age.");
      setLoading(false);
      return;
    }

    if (age < 18) {
      setErrorMessage("Age must be 18 or above.");
      setLoading(false);
      return;
    }

    if (!contract) {
      setErrorMessage("Account not connected.");
      setLoading(false);
      return;
    }

    try {
      await contract.methods
        .createRegVoterData(name, age)
        .send({ from: account });
      const refId = await contract.methods
        .getLatestRegVoterReferenceId()
        .call();
      setReferenceId(refId);
      setLoading(false);
      setShowPopup(true);
      clearForm();
    } catch (error) {
      setErrorMessage("Error adding data. Please try again.");
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setAge("");
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="p-20 ml-72">
      <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-3xl font-bold text-gray-700">
            Verify Name and Age
          </h1>
        </div>
        <div>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Enter Name
            </label>
          </div>
        </div>
        <div>
          <div className="relative mt-2 w-full">
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="age"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Enter Age
            </label>
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 py-3 font-bold text-white"
          disabled={loading}
        >
          {loading ? "Please Wait..." : "ADD"}
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Data Added Successfully</h2>
            <p className="mb-4">Name and Age have been added Successfully</p>
            <p className="mb-4">Reference ID:{referenceId}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAgeProof;
