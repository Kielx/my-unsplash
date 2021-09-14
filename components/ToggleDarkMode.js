import React, { useEffect } from "react";
import Toggle from "react-toggle";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../redux/darkModeSlice";

const ToggleDarkMode = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    dispatch(setDarkMode(darkMode));
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode, dispatch]);

  return (
    <label aria-label="Dark Mode toggle" className="ml-auto mr-4">
      <Toggle
        onChange={() => dispatch(setDarkMode(!darkMode))}
        defaultChecked={darkMode}
        icons={{
          checked: (
            <div className="relative bottom-[5px] -left-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brightness-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#A1A1AA"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="3" />
                <path d="M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5z" />
              </svg>
            </div>
          ),
          unchecked: (
            <div className="relative bottom-[5px] -left-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-moon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#A1A1AA"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              </svg>
            </div>
          ),
        }}
      />
    </label>
  );
};

export default ToggleDarkMode;
