import React from "react";
import Masonry from "react-masonry-css";

const MasonryContainer = () => {
  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid pt-10"
      columnClassName="my-masonry-grid_column"
    >
      <h1 className="h-[400px] bg-gray-400 rounded-xl">1</h1>
      <h1 className="h-[600px] bg-gray-500">2</h1>
      <h1 className="h-[200px] bg-gray-200">3</h1>
      <h1 className="h-[300px] bg-gray-900">4</h1>
      <h1 className="h-[300px] bg-gray-900">5</h1>
      <h1 className="h-[300px] bg-gray-900">6</h1>
      <h1 className="h-[200px] bg-gray-200">3</h1>
      <h1 className="h-[200px] bg-gray-200">3</h1>
      <h1 className="h-[400px] bg-gray-400 rounded-xl">1</h1>
    </Masonry>
  );
};

export default MasonryContainer;
