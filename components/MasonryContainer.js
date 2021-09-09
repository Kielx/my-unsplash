import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import {
  storageRef,
  getStorage,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytesResumable,
  ref,
} from "../firebase/firebase";
import NextImage from "next/image";

const MasonryContainer = () => {
  // Get all the images from Storage
  const [files, setFiles] = useState();
  //selected file
  const [selectedFile, setSelectedFile] = useState();

  const upload = async (file) => {
    // Create the file metadata
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
      const width = myImage.naturalWidth;
      const height = myImage.naturalHeight;
      metadata.customMetadata.width = width;
      metadata.customMetadata.height = height;
      window.URL.revokeObjectURL(myImage.src);
      console.log(width, height);
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storage = getStorage();
      const storageRef = ref(storage, `/${file.name}`);
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
          //getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          // dispatch(setDownloadURL(downloadURL))
          //);
        }
      );
    };
  };

  useEffect(() => {
    const fetchImages = async () => {
      let url;
      let result = await listAll(storageRef);
      let urlPromises = result.items.map(
        (imageRef) => (url = getDownloadURL(imageRef))
      );
      return Promise.all(urlPromises);
    };

    const fetchMetadata = async () => {
      let result = await listAll(storageRef);
      let metadataPromises = result.items.map((imageRef) =>
        getMetadata(imageRef)
      );
      return Promise.all(metadataPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      const metadata = await fetchMetadata();
      //for in each url, get the metadata and add it to the url
      let images = urls.map((url, index) => {
        return {
          url: url.replace(
            "https://firebasestorage.googleapis.com",
            `https://ik.imagekit.io/u9es71stuug/tr:${
              window.innerWidth < 525 ? "w-515" : "w-437"
            },c-at_min,fo-auto,q-80`
          ),
          blur: url.replace(
            "https://firebasestorage.googleapis.com",
            `https://ik.imagekit.io/u9es71stuug/tr:w-10,h-10,q-10,bl-50`
          ),
          metadata: metadata[index],
        };
      });
      images.sort(
        (a, b) => new Date(b.metadata.updated) - new Date(a.metadata.updated)
      );
      setFiles(images);
    };
    loadImages();
  }, []);
  console.log(files);

  //Masonry breakpoint columns object for different screen sizes
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <form>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        ></input>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            upload(selectedFile);
          }}
        >
          Upload file
        </button>
      </form>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid pt-10"
        columnClassName="my-masonry-grid_column"
      >
        {files?.map(
          (file) => (
            console.log(file),
            (
              <div key={file.url} className="imageContainer">
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <NextImage
                  className="nextImage shadow-sm"
                  src={file.url}
                  alt="My unsplash image"
                  placeholder="blur"
                  blurDataURL={file.blur}
                  width={`${file.metadata?.customMetadata?.width || "500"}`}
                  height={`${file.metadata?.customMetadata?.height || "500"}`}
                />
                <div className="overlay">{file.metadata.name}</div>
              </div>
            )
          )
        )}
      </Masonry>
    </>
  );
};

export default MasonryContainer;
