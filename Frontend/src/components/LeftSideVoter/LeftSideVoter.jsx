import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faCheckSquare,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import VoterCard from "../VoterControl/VoterCard/VoterCard";
import Vote from "../VoterControl/Vote/Vote";

const LeftSideVoter = ({ state }) => {
  let VoterIdObject = useParams();
  let VoterId = VoterIdObject.voterId;

  const [selectedComponent, setSelectedComponent] = useState("VoterCard");

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
                  selectedComponent === "VoterCard"
                    ? "text-white bg-indigo-500"
                    : "text-gray-500 hover:bg-indigo-50"
                } rounded`}
                onClick={() => handleComponentChange("VoterCard")}
              >
                <span className="inline-block mr-3">
                  <FontAwesomeIcon icon={faIdCard} />
                </span>
                <span>Voter Card</span>
              </a>
            </li>
            <li>
              <a
                className={`flex items-center pl-3 py-3 pr-4 ${
                  selectedComponent === "Vote"
                    ? "text-white bg-indigo-500"
                    : "text-gray-500 hover:bg-indigo-50"
                } rounded`}
                onClick={() => handleComponentChange("Vote")}
              >
                <span className="inline-block mr-3">
                  <FontAwesomeIcon icon={faCheckSquare} />
                </span>
                <span>Vote</span>
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
      {selectedComponent === "VoterCard" && (
        <VoterCard voterId={VoterId} state={state} />
      )}
      {selectedComponent === "Vote" && <Vote voterId={VoterId} state={state} />}
    </div>
  );
};

export default LeftSideVoter;
