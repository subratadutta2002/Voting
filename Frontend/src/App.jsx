import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import Header from "./components/Header/Header.jsx";
import Voting from "./components/Voting/Voting.jsx";
import VoterLogin from "./components/VoterLogin/VoterLogin.jsx";
import VoterReg from "./components/VoterReg/VoterReg.jsx";
import LeftSideVoter from "./components/LeftSideVoter/LeftSideVoter.jsx";
import LeftSideAdmin from "./components/LeftSideAdmin/LeftSideAdmin.jsx";
import VotersList from "./components/VotersList/VotersList.jsx";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null,
  });
  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account });
  };

  const router = createBrowserRouter([
    { path: "/", element: <HomePage saveState={saveState} /> },
    { path: "/voting", element: <Voting state={state} /> },
    { path: "/voter-login", element: <VoterLogin state={state} /> },
    { path: "/voter-reg", element: <VoterReg state={state} /> },
    { path: "/voter/:voterId", element: <LeftSideVoter state={state} /> },
    { path: "/voting/admin", element: <LeftSideAdmin state={state} /> },
    { path: "/voters-list", element: <VotersList state={state} /> },
  ]);

  return (
    <>
      <Header state={state} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
