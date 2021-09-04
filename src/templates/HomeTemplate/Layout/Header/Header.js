import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/img/logo.png";

export default function Header(props) {
  return (
    <header className="p-4 bg-gray-900 bg-opacity-50 text-coolGray-100 text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/home"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src={logo} className="w-32 h-30" alt="" />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center -mb-0.5  px-4 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white"
              activeClassName="border-b-2"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className="flex items-center -mb-0.5 px-4 dark:border-transparent text-white"
              activeClassName="border-b-2"
            >
              Liên hệ
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center -mb-0.5  px-4 dark:border-transparent text-white"
              activeClassName="border-b-2"
            >
              Tin tức
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button className="self-center px-8 py-3 rounded">Sign in</button>
          <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">
            Sign up
          </button>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
