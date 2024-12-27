import React from "react";
import Skeleton from "./skeleton";

const SuspenseTransactionList = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <SuspenseTransactionSummaryItemSkeleton />
        <SuspenseTransactionItemSkeleton />
        <SuspenseTransactionItemSkeleton />
        <SuspenseTransactionItemSkeleton />
        <SuspenseTransactionItemSkeleton />
      </div>

      <div className="space-y-4">
        <SuspenseTransactionSummaryItemSkeleton />
        <SuspenseTransactionItemSkeleton />
        <SuspenseTransactionItemSkeleton />
        <SuspenseTransactionItemSkeleton />
        <SuspenseTransactionItemSkeleton />
      </div>
    </div>
  );
};

const SuspenseTransactionItemSkeleton = () => {
  return (
    <div className="flex w-full items-center">
      <div className="flex items-center mr-4 grow">
        <Skeleton />
      </div>

      <div className="w-min[150px]  items-center hidden md:flex mr-[80px]">
        <Skeleton />
      </div>

      <div className="min-w-[70px] text-right">
        <Skeleton />
      </div>

      <div className="ml-4">
        <Skeleton />
      </div>
    </div>
  );
};

const SuspenseTransactionSummaryItemSkeleton = () => {
  return (
    <div className="flex  mb-6">
      <div className="grow">
        <Skeleton />
      </div>
      <div className="min-w-[70px]">
        <Skeleton />
      </div>
      <div />
    </div>
  );
};

export default SuspenseTransactionList;
