import React from "react";

const Skeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse h-4 bg-gray-200 w-full dark:bg-gray-800 ${className} rounded-md`}
    ></div>
  );
};

export default Skeleton;
