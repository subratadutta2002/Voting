import React from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import ABI from "../../json/ABI.json";
import VoteImage from "../../../Image/Vote.svg";

const HomePage = ({ saveState }) => {
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAddress = "0x6ecb892c214348246e7710e62213AF6051901AaE";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        saveState({ web3: web3, contract: contract, account: accounts[0] });
        navigateTo("/voting");
      } else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden bg-white text-gray-900">
        <div className="container relative mx-auto flex flex-col gap-16 px-4 py-16 text-center lg:flex-row lg:gap-0 lg:px-8 lg:py-32 lg:text-left xl:max-w-7xl">
          <div className="lg:flex lg:w-1/2 lg:items-center">
            <div>
              <h1 className="mb-12 text-5xl font-black text-blue-600">
                Online Voting System
              </h1>
              <h2 className="text-xl font-medium leading-relaxed text-gray-700">
              A blockchain-based online voting system uses blockchain technology to ensure secure, transparent, and tamper-proof elections, enhancing the integrity and trustworthiness of the voting process.
              </h2>
              <div className="flex flex-col justify-center gap-2 pb-16 pt-10 sm:flex-row sm:items-center lg:justify-start">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-700 bg-blue-700 px-7 py-3.5 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 cursor-pointer"
                  onClick={connectWallet}
                >
                  <span>Connect</span>
                </a>
              </div>
            </div>
          </div>
          <div className="lg:ml-16 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
            <div className="relative mx-5 lg:w-96">
              <div className="bg-transparent absolute left-0 top-0 -ml-20 -mt-16 size-40 rounded-full border border-blue-200 lg:size-72" />
              <div className="bg-transparent absolute left-0 top-0 -ml-14 -mt-20 size-40 rounded-full border border-blue-100 lg:size-72" />
              <div className="bg-transparent absolute bottom-0 right-0 -mb-16 -mr-20 size-40 rounded-full border border-blue-200 lg:size-72" />
              <div className="bg-transparent absolute bottom-0 right-0 -mb-20 -mr-14 size-40 rounded-full border border-blue-100 lg:size-72" />
              <div className="absolute inset-0 -m-6 -rotate-2 rounded-xl bg-gray-200" />
              <div className="absolute inset-0 -m-6 rotate-1 rounded-xl bg-blue-800/75 shadow-inner" />
              <img
                src={VoteImage}
                className="relative mx-auto rounded-lg shadow-lg"
                alt="vote Image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
