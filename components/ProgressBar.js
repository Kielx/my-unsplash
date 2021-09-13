import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const progress = useSelector((state) => state.modal.progress);
  return (
    <>
      <h1 className="text-[#4F4F4F] text-xl dark:text-gray-100">
        Uploading...
      </h1>
      <div className="relative w-full pt-1">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100 dark:bg-dp06">
          <div
            style={{ width: `${progress}%` }}
            className="transition-all shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
