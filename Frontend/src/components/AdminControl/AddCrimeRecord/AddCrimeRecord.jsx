import React, { useState} from "react";

const AddCrimeRecord = ({ state }) => {
  const [VoterID, setVoterID] = useState("");
  const [crimeRecord, setCrimeRecord] = useState("True");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [PopupMessage0, setPopupMessage0] = useState("");
  const [PopupMessage1, setPopupMessage1] = useState("");

  const { contract, account } = state;

  const handleSubmit = async () => {
    setLoading(true);

    if (!VoterID) {
      setErrorMessage("Please Enter Voter ID");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/VoterIDExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ VoterID }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (data.result === 1) {
          CrimeRecordAdded(VoterID);
        } else if (data.result === 0) {
          setLoading(false);
          setSuccessPopup(true);
          setPopupMessage0("Voter ID Not Exist.");
          setPopupMessage1("Please enter a different Voter ID.");
        }
      } else {
        setLoading(false);
        setSuccessPopup(true);
        setPopupMessage0("Voter ID Not Exist.");
        setPopupMessage1("Please enter a different Voter ID.");
        console.error(data.error);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error verifying reference ID:", error);
    }
  };

  const CrimeRecordAdded = async (VoterID) => {
    try {
      const response = await fetch("http://localhost:4000/CrimeRecordExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ VoterID }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.result === 0) {
          await contract.methods
            .addCrimeRecord(VoterID, crimeRecord)
            .send({ from: account });
          setLoading(false);
          clearForm();
          setSuccessPopup(true);
          setPopupMessage0("Crime Record Added Sucessfully.");
          setPopupMessage1("");
        } else if (data.result === 1) {
          setLoading(false);
          setSuccessPopup(true);
          setPopupMessage0("Voter ID already Added Crime Record.");
          setPopupMessage1("Please enter a different Voter ID.");
        }
      } else {
        setLoading(false);
        console.error(data.error);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error verifying Voter ID:", error);
    }
  };

  const clearForm = () => {
    setVoterID("");
  };


  return (
    <div className="p-20 ml-72">
      <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-3xl font-bold text-gray-700">
            Added Crime Record
          </h1>
        </div>
        <div>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="name"
              value={VoterID}
              onChange={(e) => setVoterID(e.target.value)}
              className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
              Enter Voter ID
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <select
              id="crimeRecord"
              value={crimeRecord}
              onChange={(e) => setCrimeRecord(e.target.value)}
              className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            >
              <option value="True">True</option>
            </select>
            <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
              Crime Record
            </label>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 py-3 font-bold text-white"
          disabled={loading}
        >
          {loading ? "Please Wait..." : "ADD"}
        </button>
      </div>
      {successPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="mt-2 text-lg leading-6 font-medium text-gray-900">
                      {PopupMessage0}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{PopupMessage1}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setSuccessPopup(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCrimeRecord;
