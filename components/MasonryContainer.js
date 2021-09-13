import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { removeFile, addFiles } from "../redux/filesSlice";
import {
  setIsDeleteOpen,
  setDeleteFileName,
  setRemoveFunction,
} from "../redux/modalSlice";
import {
  getStorage,
  ref,
  list,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./MasonryContainer.module.css";

const MasonryContainer = () => {
  //Masonry files contains all the mapped files that should be displayed
  const [masonryFiles, setMasonryFiles] = useState(null);
  //Redux store
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);

  //init firebase storage
  const storage = getStorage();
  const storageRef = ref(storage);
  //Pagetoken for the next page of files returned by list function
  //First page token is null. On first fetch it is set to the token of the first page
  //On subsequent fetches it is set to the token of the next page
  //This is used to fetch the next page of files
  //When there are no more files to fetch, the token is set to undefined
  //When it is undefined the fetch function returns nothing
  //Infinite scroll uses it to know when to fetch more files and when to display end message
  const [pageToken, setPageToken] = useState(null);

  //get files from firebase storage
  const fetchImages = async (pageToken) => {
    let url;
    let result;
    if (pageToken) {
      result = await list(storageRef, {
        maxResults: 6,
        pageToken,
      });
      setPageToken(result.nextPageToken);
    } else if (pageToken === null) {
      result = await list(storageRef, { maxResults: 6 });
      setPageToken(result.nextPageToken);
    } else {
      return;
    }
    //For each file in the result, get the download url and metadata
    const urls = await Promise.all(
      result.items.map((imageRef) => (url = getDownloadURL(imageRef)))
    );
    const metadata = await Promise.all(
      result.items.map((imageRef) => getMetadata(imageRef))
    );
    //Map files for later use
    //TODO: Update fetched file sizes
    const images = urls.map((url, index) => ({
      originalUrl: url,
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
    //Add files to redux store
    dispatch(addFiles(images));
  };

  useEffect(() => {
    //First images fetch on page load
    fetchImages(pageToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Map files
  useEffect(() => {
    {
      //First create a copy of files array
      //Then sort the array by date
      //Then map the array to a jsx element
      //const newFiles = Array.from(files);
      //newFiles.sort((a, b) => new Date(a?.updated) - new Date(b?.updated));
      //usable in case of listing all files, not so much with pagination and infinite scroll
      //Left in for future eventual use

      //Map each file to a jsx element
      setMasonryFiles(
        files?.map((file) => (
          <div key={file.url} className={styles.imageContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <NextImage
              className={`${styles.nextImage} shadow-sm"`}
              src={file.url}
              alt="My unsplash image"
              placeholder="blur"
              blurDataURL={file.blur}
              width={`${file?.customMetadata?.width || "500"}`}
              height={`${file?.customMetadata?.height || "500"}`}
            />
            <div
              className={`${styles.overlay} font-montserrat flex flex-col place-content-between p-4`}
            >
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
                  //Send data to modal to be displayed
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
    1100: 2,
    500: 1,
  };

  return (
    <>
      <InfiniteScroll
        dataLength={files.length}
        next={() => fetchImages(pageToken)}
        hasMore={pageToken === undefined ? false : true}
        loader={<LoadingSpinner />}
        endMessage={
          <p className="text-center text-2xl">
            <b>Yay! You have seen it all</b>
          </p>
        }
        style={{ overflow: "hidden" }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          id="masonry"
          className={`${styles.myMasonryGrid} pt-10 px-5`}
          columnClassName={styles.myMasonryGridColumn}
        >
          {masonryFiles}
        </Masonry>
      </InfiniteScroll>
    </>
  );
};

export default MasonryContainer;
