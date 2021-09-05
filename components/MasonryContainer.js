import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import {
  storageRef,
  listAll,
  getDownloadURL,
  getMetadata,
} from "../firebase/firebase";
import Image from "next/image";

const MasonryContainer = () => {
  // Get all the images from Storage
  const [files, setFiles] = useState();

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
              window.innerWidth < 525 ? "w-515" : "w-315"
            },c-at_min,fo-auto,q-80`
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
    2200: 5,
    1600: 4,
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
          <img src={file.url} alt="My unsplash image" />
          <div className="overlay">{file.metadata.name}</div>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryContainer;
