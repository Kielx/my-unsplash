import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFiles, removeFile } from "../redux/filesSlice";
import { setIsDeleteOpen } from "../redux/modalSlice";
import DeletePhotoModal from "../components/DeletePhotoModal";
import NextImage from "next/image";
import Masonry from "react-masonry-css";

import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "firebase/storage";

const MasonryContainer = () => {
  const [masonryFiles, setMasonryFiles] = useState(null);
  //Redux store
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);

  useEffect(() => {
    //init firebase storage
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

  //Map files
  useEffect(() => {
    {
      setMasonryFiles(
        files?.map((file) => (
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
            <div className="font-montserrat overlay flex flex-col place-content-between p-4">
              <button
                className="ml-auto btn-danger"
                onClick={() => {
                  const storage = getStorage();

                  // Create a reference to the file to delete
                  const deleteRef = ref(storage, `${file?.metadata?.name}`);
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
                  dispatch(setIsDeleteOpen([true, del, file?.metadata?.name]));
                }}
              >
                Delete
              </button>
              <div className="text-left font-bold">{file?.metadata?.name}</div>
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
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid pt-10"
      columnClassName="my-masonry-grid_column"
    >
      {masonryFiles}
    </Masonry>
  );
};

export default MasonryContainer;
