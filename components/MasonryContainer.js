import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFiles } from "../redux/filesSlice";
import NextImage from "next/image";
import Masonry from "react-masonry-css";

import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

const MasonryContainer = () => {
  //init firebase storage

  //Redux store
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage);
    //get all files from firebase storage
    const fetchImages = async () => {
      let url;
      let result = await listAll(storageRef);
      let urlPromises = result.items.map(
        (imageRef) => (url = getDownloadURL(imageRef))
      );
      return Promise.all(urlPromises);
    };

    //get all files metadata from firebase storage
    const fetchMetadata = async () => {
      let result = await listAll(storageRef);
      let metadataPromises = result.items.map((imageRef) =>
        getMetadata(imageRef)
      );
      return Promise.all(metadataPromises);
    };

    //main imageloading function
    const loadImages = async () => {
      const urls = await fetchImages();
      const metadata = await fetchMetadata();
      //maps all fetched urls and metadata to redux store
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
        (a, b) =>
          new Date(b?.metadata?.updated) - new Date(a?.metadata?.updated)
      );
      dispatch(setFiles(images));
    };
    loadImages();
  }, [dispatch]);

  //Masonry breakpoint columns object for different screen sizes
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid pt-10"
      columnClassName="my-masonry-grid_column"
    >
      {files?.map((file) => (
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
          <div className="overlay">{file?.metadata?.name}</div>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryContainer;
