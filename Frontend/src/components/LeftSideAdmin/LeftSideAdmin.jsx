import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUser,
  faFileAlt,
  faVoteYea,
  faTimesCircle,
  faPoll,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import AddAgeProof from "../AdminControl/AddAgeProof/AddAgeProof";
import CandidateNominization from "../AdminControl/CandidateNominization/CandidateNominization";
import AddCrimeRecord from "../AdminControl/AddCrimeRecord/AddCrimeRecord";
import StartVote from "../AdminControl/StartVote/StartVote";
import CloseVote from "../AdminControl/CloseVote/CloseVote";

const LeftSideAdmin = ({ state }) => {
  const [selectedComponent, setSelectedComponent] = useState("AddAgeProof");

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex navbar-menu relative z-50">
      <div className="navbar-backdrop fixed lg:hidden inset-0 bg-gray-800 opacity-10" />
      <nav className="top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pt-6 pb-8 bg-white border-r overflow-y-auto">
        <div className="px-4 pb-6">
          <ul className="mb-8 text-sm font-medium">
            <li>
              <a
                className={`flex items-center pl-3 py-3 pr-4 ${
                  selectedComponent === "AddAgeProof"
                    ? "text-white bg-indigo-500"
                    : "text-gray-500 hover:bg-indigo-50"
                } rounded`}
                onClick={() => handleComponentChange("AddAgeProof")}
              >
                <span className="inline-block mr-3">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <span>Add Age Proof</span>
              </a>
            </li>
            <li>
              <a
                className={`flex items-center pl-3 py-3 pr-4 ${
                  selectedComponent === "CandidateNominization"
                    ? "text-white bg-indigo-500"
                    : "text-gray-500 hover:bg-indigo-50"
                } rounded`}
                onClick={() => handleComponentChange("CandidateNominization")}
              >
                <span className="inline-block mr-3">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span>Candidate Nominization</span>
              </a>
            </li>
            <li>
              <a
                className={`flex items-center pl-3 py-3 pr-4 ${
                  selectedComponent === "AddCrimeRecord"
                    ? "text-white bg-indigo-500"
                    : "text-gray-500 hover:bg-indigo-50"
                } rounded`}
                onClick={() => handleComponentChange("AddCrimeRecord")}
              >
                <span className="inline-block mr-3">
                  <FontAwesomeIcon icon={faFileAlt} />
                </span>
                <span>Add Crime Record</span>
              </a>
            </li>
            <li>
              <a
                className={`flex items-center pl-3 py-3 pr-4 ${
                  selectedComponent === "StartVote"
                    ? "text-white bg-indigo-500"
                    : "text-gray-500 hover:bg-indigo-50"
                } rounded`}
                onClick={() => handleComponentChange("StartVote")}
              >
                <span className="inline-block mr-3">
                  <FontAwesomeIcon icon={faVoteYea} />
                </span>
                <span>Start Voting</span>
              </a>
            </li>
            <li>
              <a
                className={`flex items-center pl-3 py-3 pr-4 ${
                  selectedComponent === "CloseVote"
                    ? "text-white bg-indigo-500"
                    : "text-gray-500 hover:bg-indigo-50"
                } rounded`}
                onClick={() => handleComponentChange("CloseVote")}
              >
                <span className="inline-block mr-3">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </span>
                <span>Close Voting</span>
              </a>
            </li>

            <li>
              <a
                className="flex items-center pl-3 py-3 pr-4 text-gray-500 hover:bg-indigo-50 rounded"
                href="/"
              >
                <span className="inline-block mr-4">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {selectedComponent === "AddAgeProof" && <AddAgeProof state={state} />}
      {selectedComponent === "CandidateNominization" && (
        <CandidateNominization state={state} />
      )}
      {selectedComponent === "AddCrimeRecord" && (
        <AddCrimeRecord state={state} />
      )}
      {selectedComponent === "StartVote" && <StartVote state={state} />}
      {selectedComponent === "CloseVote" && <CloseVote state={state} />}
    </div>
  );
};

export default LeftSideAdmin;
