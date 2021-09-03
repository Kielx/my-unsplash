import React from "react";
import Image from "next/image";
import myUnsplashLogo from "../public/my_unsplash_logo.svg";

const Navbar = () => {
  return (
    <div className="w-full h-24 flex items-center">
      <Image src={myUnsplashLogo} alt="my unsplash logo" />
      <form className="flex items-center bg-white p-4 border border-gray-200 rounded-xl w-1/6 ml-8">
        <label htmlFor="search" className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#9e9e9e"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </label>
        <input
          id="search"
          placeholder="Search by name"
          className="w-full text-gray-700"
        ></input>
      </form>
      <button className="ml-auto p-4 bg-green-500 text-white text-center rounded-xl font-bold text-base">
        Add a photo
      </button>
    </div>
  );
};

export default Navbar;
