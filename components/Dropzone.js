import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsAddOpen } from "../redux/modalSlice";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import dropzonePlaceholder from "../public/dropzonePlaceholder.svg";

const Dropzone = ({ uploadHandler, fileLabel, setFileLabel }) => {
  const dispatch = useDispatch();
  const [noLabel, setNoLabel] = useState(false);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    maxFiles: 1,
    multiple: false,
    maxSize: 5000000,
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <div key={file.path} className="flex flex-col max-w-full text-center">
      <span className="truncate ">{file.path}</span>
      <span>{(file.size / 1000000).toFixed(2)} MB</span>
    </div>
  ));

  return (
    <form className="flex flex-col transition-all">
      <label
        htmlFor="label"
        className={`transition-all block text-gray-700 text-sm font-bold mb-1 ${
          noLabel ? "text-red-500" : ""
        }`}
      >
        Label
      </label>
      <input
        id="label"
        placeholder="Enter label for your photo"
        className={`${
          noLabel
            ? "ring-2 ring-red-500 placeholder-red-500 border-transparent"
            : ""
        } transition-all w-full text-gray-700 text-xs px-3 py-3 border border-black border-opacity-50 rounded-xl mb-5`}
        onChange={(e) => setFileLabel(e.target.value)}
      ></input>
      {isDragReject ? (
        <h2 className="text-red-500 dark:text-red-400 min-h-[3rem] text-center">
          File must be of image type
        </h2>
      ) : (
        <h2
          className={`${
            fileRejections.length > 0
              ? "text-red-500"
              : "text-[#828282] dark:text-grayGray-500"
          } text-center min-h-[3rem]`}
        >
          File should be of image type with max size of 5MB
        </h2>
      )}
      <div
        {...getRootProps({
          className: "dropzone",
        })}
        className={`mb-6 transition-all dragNDrop cursor-pointer w-full flex flex-col items-center justify-center bg-[#F6F8FB] dark:bg-dp03 rounded-[12px] p-4 space-y-4 border border-dashed border-[#97BEF4]  dark:border-opacity-40 ${
          acceptedFiles.length > 0 ? "border-green-400 p-4" : ""
        } ${
          isDragAccept
            ? "ring-2 ring-green-500 dark:ring-green-400 border-transparent dark:border-transparent"
            : ""
        } ${
          isDragReject
            ? "ring-2 ring-red-500 dark:ring-red-400 border-transparent dark:border-transparent"
            : ""
        }`}
      >
        <Image
          src={
            acceptedFiles.length > 0
              ? URL.createObjectURL(acceptedFiles[0])
              : dropzonePlaceholder
          }
          alt="upload placeholder"
          className={`object-cover rounded-2xl transition-all`}
          width={250}
          height={250}
        ></Image>
        <span className="text-[#BDBDBD] dark:text-grayGray-500 flex max-w-full text-center">
          {acceptedFiles.length > 0
            ? acceptedFileItems
            : "Drag & Drop your image here"}
        </span>
      </div>
      <input {...getInputProps()} />
      {acceptedFiles.length > 0 ? (
        <div className="flex place-content-end space-x-4">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setIsAddOpen(false));
            }}
            className="p-4 bg-transparent text-gray-400 text-center rounded-xl text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              acceptedFiles.length > 0 &&
                fileLabel &&
                uploadHandler(acceptedFiles[0]);
              !fileLabel
                ? (setNoLabel(true), setTimeout(() => setNoLabel(false), 2000))
                : setNoLabel(false);
            }}
            className="btn-primary ripple"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="flex place-content-end space-x-4">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setIsAddOpen(false));
            }}
            className="p-4 bg-transparent text-gray-400 text-center rounded-xl text-base"
          >
            Cancel
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            className="font-bold text-center bg-[#2F80ED] hover:bg-[#2666be] dark:bg-blue-500 dark:hover:bg-blue-600 transition-all rounded-[8px] p-3 text-white hover:"
          >
            Choose a file
          </button>
        </div>
      )}
    </form>
  );
};

export default Dropzone;
