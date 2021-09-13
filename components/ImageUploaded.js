import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
const ImageUploaded = () => {
  //const uploadedImage = useSelector((state) => state.imageUpload.uploadedImage);
  //const downloadURL = useSelector((state) => state.imageUpload.downloadURL);
  //const darkMode = useSelector((state) => state.darkMode.darkMode);
  const files = useSelector((state) => state.files.files);
  return (
    <>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-circle-check transition-all"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          strokeWidth="1"
          //stroke={darkMode ? "#1e1e1e" : "#ffffff"}
          stroke="#fff"
          fill="#10B981"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2l4 -4" />
        </svg>
      </span>
      <h1 className="transition-all text-center text-[#4F4F4F] dark:text-grayGray-100 text-2xl pb-4 font-bold">
        Uploaded Successfully!
      </h1>

      <Image
        src={files[0].url}
        alt="Uploaded file"
        width={250}
        height={250}
        className="max-w-64 max-h-64 object-cover rounded-xl"
      ></Image>
      <div className="transition-all w-full flex items-center space-x-2 bg-[#F6F8FB] dark:bg-dp03 border-[#E0E0E0] dark:border-opacity-25 border-[1.5px] rounded-xl p-1">
        <a
          href={files[0].originalUrl}
          className="transition-all text-xs text-[#4F4F4F] dark:text-grayGray-500 dark:hover:text-grayGray-100 truncate w-3/4"
        >
          {files[0].originalUrl}
        </a>
        <button
          className="w-1/4 transition-all btn-secondary"
          onClick={(e) => {
            e.target.innerHTML = "Copied!";
            navigator.clipboard.writeText(files[0].originalUrl);
            e.target.className =
              "w-1/4 btn-primary cursor-not-allowed pointer-events-none";
            setTimeout(() => {
              e.target.className = "w-1/4 btn-secondary";
              e.target.innerHTML = "Copy";
            }, 2000);
          }}
        >
          Copy
        </button>
      </div>
    </>
  );
};

export default ImageUploaded;
