import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const VoterLogin = ({ state }) => {
  const { contract, account } = state;
  const [loading, setLoading] = useState(false);
  const [VoterID, setVoterID] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/verifyVoter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ VoterId: VoterID, MobileNo: mobileNo }),
      });

      const data = await response.json();

      if (data.result === 1) {
        navigate(`/voter/${VoterID}`);
      } else {
        setLoading(false);
        setShowPopup(true);
        ShowPopupMessage("Invalid VoterID and Mobile No");
      }
    } catch (error) {
      console.error("Login error:", error);
      ShowPopupMessage("An error occurred during login.");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="a"
                patternUnits="userSpaceOnUse"
                width={40}
                height={40}
                patternTransform="scale(0.6) rotate(0)"
              >
                <rect x={0} y={0} width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth={1}
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#a)"
            />
          </svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width={40}
                height={40}
                patternTransform="scale(0.5) rotate(0)"
              >
                <rect x={0} y={0} width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth={1}
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#b)"
            />
          </svg>
        </div>

        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <a
                href="#"
                className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
              >
                <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                  Voter Login
                </span>
              </a>
            </div>

            <form id="" className="mb-4" action="#" method="POST">
              <div className="mb-4">
                <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                  Voter ID
                </label>
                <input
                  type="text"
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  id="voter-id"
                  name="voter-id"
                  placeholder="Enter your Voter ID"
                  autofocus=""
                  value={VoterID}
                  onChange={(e) => setVoterID(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="flex justify-between">
                  <label
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    htmlFor="password"
                  >
                    Mobile No
                  </label>
                </div>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                    id="mobileno"
                    className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    name="mobileno"
                    placeholder="Enter Mobile No"
                    type="number"
                    value={mobileNo}
                    onChange={(e) => setmobileNo(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <button
                  className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                  type="submit"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mb-4 text-center">
              Not Register?
              <Link
                to="/voter-reg"
                className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
              >
                {" "}
                Register for Voter ID{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="mt-2 text-lg leading-6 font-medium text-gray-900">
                      Invalid VoterID and Mobile No
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowPopup(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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

export default VoterLogin;
