import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Animated spinner */}
      <div className="relative h-12 w-12">
        {/* Outer ring */}
        <div className="absolute h-full w-full rounded-full border-4 border-opacity-20 border-gray-400"></div>
        
        {/* Animated arc */}
        <div className="absolute h-full w-full rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin"></div>
        
        {/* Optional center dot (remove if not needed) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
      </div>
      
      {/* Optional loading text with fade animation */}
      <p className="text-gray-600 animate-pulse">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;