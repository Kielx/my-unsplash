import React from "react";
import Image from "next/image";
import myUnsplashLogo from "../public/my_unsplash_logo.svg";
import { Popover, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../redux/modalSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="hidden w-full h-24 md:flex items-center">
        <Image src={myUnsplashLogo} alt="my unsplash logo" />
        <form className="flex items-center bg-white p-4 border border-gray-200 rounded-xl w-1/2 xl:w-1/5 ml-8">
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
        <button
          onClick={() => dispatch(setIsOpen(true))}
          className="ml-auto p-4 bg-green-500 text-white text-center rounded-xl font-bold text-base shadow-md"
        >
          Add a photo
        </button>
      </div>

      <Popover
        className=" md:hidden  relative flex w-full  justify-between "
        style={{ zIndex: "2" }}
      >
        <Image src={myUnsplashLogo} alt="my unsplash logo" />
        <Popover.Button
          className="text-gray-800 hover:text-blue-500 transition-all "
          aria-label="Show menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Popover.Button>
        <Transition
          className="absolute flex w-full  justify-center"
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute right-0 -bottom-60 z-10 w-full max-w-md bg-white rounded-2xl shadow-xl py-6 space-y-6 flex flex-col items-center">
            <form className="flex items-center bg-white p-4 border border-gray-200 rounded-xl w-3/4">
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
            <button
              onClick={() => dispatch(setIsOpen(true))}
              className="p-4 bg-green-500 text-white text-center rounded-xl font-bold text-base"
            >
              Add a photo
            </button>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default Navbar;
