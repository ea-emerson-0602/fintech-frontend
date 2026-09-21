import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="relative h-12 w-12">
        <div className="absolute h-full w-full rounded-full border-4 border-gray-400 border-opacity-20"></div>
        <div className="absolute h-full w-full rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;