import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpen } from "../redux/modalSlice";
import { addFile } from "../redux/filesSlice";

import {
  ref,
  uploadBytesResumable,
  getStorage,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

const AddPhotoModal = () => {
  //Redux store
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [fileLabel, setFileLabel] = useState("");

  const isOpen = useSelector((state) => state.modal.isOpen);

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
          //dispatch(setLoading(true));
          //dispatch(
          //setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          //);
          //console.log("Upload is " + progress + "% done");
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
          //dispatch(setLoading(false));
          //dispatch(setLoaded(true));
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            dispatch(
              addFile({
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
                metadata: {
                  name: fileLabel,
                  customMetadata: {
                    width: metadata.customMetadata.width,
                    height: metadata.customMetadata.height,
                  },
                },
              })
            );
          });
        }
      );
    };
  };

  useEffect(() => {
    setFile(null);
    setFileLabel(null);
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(setIsOpen(false))}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

        <div className="relative bg-white rounded-lg w-full max-w-md mx-auto p-6 flex flex-col">
          <Dialog.Title className="text-xl font-medium mb-5">
            Add a new photo
          </Dialog.Title>
          <form className="flex flex-col">
            <label
              htmlFor="label"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Label
            </label>
            <input
              id="label"
              placeholder="Enter label for your photo"
              className="w-full text-gray-700 text-xs px-3 py-3 border border-black border-opacity-50 rounded-xl mb-5"
              onChange={(e) => setFileLabel(e.target.value)}
              required={true}
            ></input>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required={true}
            ></input>
            <div className="flex place-content-end space-x-4">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setIsOpen(false));
                }}
                className="p-4 bg-transparent text-gray-400 text-center rounded-xl text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  file && fileLabel && uploadHandler(file);
                }}
                className="p-4 bg-green-500 text-white text-center rounded-xl font-bold text-base shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPhotoModal;
