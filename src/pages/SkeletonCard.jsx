import React from "react";

const SkeletonCard = () => {
  return (
    <div className=" rounded-lg overflow-hidden shadow-md bg-white animate-pulse">
      <div className="h-48 bg-gray-200 w-full"></div>

      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
