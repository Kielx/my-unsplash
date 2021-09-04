import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { storageRef, listAll, getDownloadURL } from "../firebase/firebase";
import Image from "next/image";

const MasonryContainer = () => {
  // Get all the images from Storage
  const [files, setFiles] = useState();

  useEffect(() => {
    const fetchImages = async () => {
      let result = await listAll(storageRef);
      let urlPromises = result.items.map((imageRef) =>
        getDownloadURL(imageRef)
      );
      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setFiles(urls);
    };
    loadImages();
  }, []);

  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid pt-10"
      columnClassName="my-masonry-grid_column"
    >
      {files?.map((file) => (
        <img key={file} src={file} alt="masonry" layout="fill" />
      ))}
    </Masonry>
  );
};

export default MasonryContainer;
