import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFiles, removeFile, addFiles } from "../redux/filesSlice";
import {
  setIsDeleteOpen,
  setDeleteFileName,
  setRemoveFunction,
} from "../redux/modalSlice";
import DeletePhotoModal from "../components/DeletePhotoModal";
import NextImage from "next/image";
import Masonry from "react-masonry-css";

import {
  getStorage,
  ref,
  list,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "firebase/storage";

const MasonryContainer = () => {
  const [masonryFiles, setMasonryFiles] = useState(null);
  //Redux store
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);

  //init firebase storage
  const storage = getStorage();
  const storageRef = ref(storage);
  const [pageToken, setPageToken] = useState(null);

  //get all files from firebase storage
  const fetchImages = async (pageToken) => {
    let url;
    let result;
    if (pageToken) {
      result = await list(storageRef, {
        maxResults: 3,
        pageToken,
      });
      console.log(result.nextPageToken);
      setPageToken(result.nextPageToken);
    } else if (pageToken === null) {
      result = await list(storageRef, { maxResults: 3 });
      setPageToken(result.nextPageToken);
    } else {
      return;
    }

    const urls = await Promise.all(
      result.items.map((imageRef) => (url = getDownloadURL(imageRef)))
    );
    const metadata = await Promise.all(
      result.items.map((imageRef) => getMetadata(imageRef))
    );

    const images = urls.map((url, index) => ({
      url: url.replace(
        "https://firebasestorage.googleapis.com",
        `https://ik.imagekit.io/u9es71stuug/tr:${
          window.innerWidth < 525 ? "w-515" : "w-437"
        },c-at_min,fo-auto,q-80`
      ),
      blur: url.replace(
        "https://firebasestorage.googleapis.com",
        `https://ik.imagekit.io/u9es71stuug/tr:w-2,h-2,q-2,bl-90`
      ),
      name: metadata[index].name,
      size: metadata[index].size,
      updated: metadata[index].updated,
      customMetadata: metadata[index].customMetadata,
    }));
    console.log(images);
    dispatch(addFiles(images));
  };

  useEffect(() => {
    fetchImages(pageToken);
  }, []);

  //Map files
  useEffect(() => {
    {
      //First create a copy of files array
      //Then sort the array by date
      //Then map the array to a jsx element
      const newFiles = Array.from(files);
      newFiles.sort((a, b) => new Date(b?.updated) - new Date(a?.updated));
      setMasonryFiles(
        newFiles?.map((file) => (
          <div key={file.url} className="imageContainer">
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <NextImage
              className="nextImage shadow-sm"
              src={file.url}
              alt="My unsplash image"
              placeholder="blur"
              blurDataURL={file.blur}
              width={`${file?.customMetadata?.width || "500"}`}
              height={`${file?.customMetadata?.height || "500"}`}
            />
            <div className="font-montserrat overlay flex flex-col place-content-between p-4">
              <button
                className="ml-auto btn-danger"
                onClick={() => {
                  const storage = getStorage();

                  // Create a reference to the file to delete
                  const deleteRef = ref(storage, `${file?.name}`);
                  // Delete the file
                  const del = () => {
                    deleteObject(deleteRef)
                      .then(() => {
                        //remove file from
                        dispatch(removeFile(file));
                      })
                      .catch((error) => {
                        // Uh-oh, an error occurred!
                      });
                  };
                  dispatch(setIsDeleteOpen(true));
                  dispatch(setDeleteFileName(file?.name));
                  dispatch(setRemoveFunction(del));
                }}
              >
                Delete
              </button>
              <div className="text-left font-bold">{file?.name}</div>
            </div>
          </div>
        ))
      );
    }
  }, [dispatch, files]);

  //Masonry breakpoint columns object for different screen sizes
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <button onClick={() => fetchImages(pageToken)}>Load more</button>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid pt-10"
        columnClassName="my-masonry-grid_column"
      >
        {masonryFiles}
      </Masonry>
    </>
  );
};

export default MasonryContainer;
