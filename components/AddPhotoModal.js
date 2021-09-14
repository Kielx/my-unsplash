import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { setIsAddOpen, setLoading, setProgress } from "../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";

import { addFile } from "../redux/filesSlice";

import {
  ref,
  uploadBytesResumable,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import Dropzone from "./Dropzone";
import ProgressBar from "./ProgressBar";
import ImageUploaded from "./ImageUploaded";

const AddPhotoModal = () => {
  //Redux store
  const dispatch = useDispatch();
  const isAddOpen = useSelector((state) => state.modal.isAddOpen);
  const loading = useSelector((state) => state.modal.loading);
  const progress = useSelector((state) => state.modal.progress);

  //Local state containing data for new file (new photo)
  const [fileLabel, setFileLabel] = useState("");

  //Firebase initialization
  const storage = getStorage();
  const storageRef = ref(storage, `/${fileLabel}`);

  //Upload file handler function
  const uploadHandler = async (file) => {
    // Create the file metadata with custom metadata and contentType
    /** @type {any} */
    const metadata = {
      contentType: "image/*",
      customMetadata: {
        width: "0",
        height: "0",
      },
    };

    //check file width and height
    const myImage = new Image();
    myImage.src = window.URL.createObjectURL(file);
    myImage.onload = function () {
      metadata.customMetadata.width = myImage.naturalWidth;
      metadata.customMetadata.height = myImage.naturalHeight;
      window.URL.revokeObjectURL(myImage.src);
      // Upload file and metadata to the object with name 'file name'

      //init firebase storage

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

          dispatch(
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              //console.log("Upload is paused");
              break;
            case "running":
              //console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          //console.log(error);
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          dispatch(setLoading("loaded"));
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            dispatch(
              addFile({
                originalUrl: downloadURL,
                url: downloadURL.replace(
                  "https://firebasestorage.googleapis.com",
                  `https://ik.imagekit.io/u9es71stuug/tr:${
                    window.innerWidth < 525 ? "w-515" : "w-437"
                  },c-at_min,fo-auto,q-80`
                ),
                blur: downloadURL.replace(
                  "https://firebasestorage.googleapis.com",
                  `https://ik.imagekit.io/u9es71stuug/tr:w-10,h-10,q-10,bl-50`
                ),

                name: fileLabel,
                customMetadata: {
                  width: metadata.customMetadata.width,
                  height: metadata.customMetadata.height,
                },
              })
            );
          });
        }
      );
    };
  };

  //reset new file and new file label on each modal open/close
  useEffect(() => {
    setFileLabel(null);
  }, [isAddOpen]);

  return (
    <Dialog
      open={isAddOpen}
      onClose={() => {
        dispatch(setIsAddOpen(false));
        dispatch(setLoading("false"));
        dispatch(setProgress(0));
      }}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

        <div className="transition-all relative flex flex-col space-y-6 items-center w-full max-w-md shadow-md bg-white dark:bg-dp01 rounded-[12px] m-auto py-12 px-8">
          {
            //switch statement to display correct modal content
            {
              false: (
                <>
                  <Dialog.Title className="text-xl dark:text-grayGray-300">
                    Add a new photo
                  </Dialog.Title>
                  <Dropzone
                    uploadHandler={uploadHandler}
                    fileLabel={fileLabel}
                    setFileLabel={setFileLabel}
                  />
                </>
              ),
              true: <ProgressBar />,
              loaded: <ImageUploaded />,
            }[loading]
          }
        </div>
      </div>
    </Dialog>
  );
};

export default AddPhotoModal;
