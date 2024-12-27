import React from "react";
import Skeleton from "./skeleton";

const SuspenseTrends = () => {
  return (
    <div className="space-y-5">
      <div>
        <Skeleton />
      </div>
      <div className="mb-2">
        <Skeleton />
      </div>
      <div className="flex space-x-2">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

export default SuspenseTrends;
