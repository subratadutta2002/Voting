import React from "react";
import Logo from "../../../Image/Logo.jpg";

const Header = ({ state }) => {
  return (
    <div>
      <section className="overflow-hidden">
        <nav className="mx-4 py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="relative flex items-center justify-between">
              <a href="/" className="inline-block">
                <img className="h-12" src={Logo} alt="" />
              </a>
              <ul className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex">
                <li className="mr-4 lg:mr-8">
                  <a
                    className="inline-block text-teal-900 hover:text-teal-700 font-medium"
                    href="#"
                  >
                    Team
                  </a>
                </li>
                <li className="mr-4 lg:mr-8">
                  <a
                    className="inline-block text-teal-900 hover:text-teal-700 font-medium"
                    href="/voters-list"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voters List
                  </a>
                </li>
              </ul>
              <div className="flex items-center justify-end">
                <div className="hidden md:block">
                  <div className="hidden md:block">
                    {state.account ? (
                      <span className="text-sm font-semibold leading-6 text-blue-500">
                        Account : {state.account}
                      </span>
                    ) : (
                      <a
                        href="/"
                        className="inline-flex py-2.5 px-4 mr-3 lg:mr-4 items-center justify-center text-sm font-medium text-teal-900 hover:text-white border border-blue-900  hover:border-blue-600 hover:bg-blue-600 rounded-full transition duration-200"
                      >
                        Connect
                      </a>
                    )}
                  </div>
                </div>
                <button className="md:hidden text-teal-900 hover:text-teal-800">
                  <svg
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.19995 23.2H26.7999"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.19995 16H26.7999"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.19995 8.79999H26.7999"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Header;
