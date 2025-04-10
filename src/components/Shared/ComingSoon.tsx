import React from "react";

interface ComingSoonProps {
  darkMode?: boolean; // Made optional with default
}

const ComingSoon: React.FC<ComingSoonProps> = ({ darkMode = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[200px] p-8 rounded-xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800"
      }`}
    >
      <div className="relative mb-6">
        {/* Animated squircle with "!" */}
        <div
          className={`w-20 h-20 rounded-[20px] flex items-center justify-center text-4xl font-bold animate-pulse ${
            darkMode
              ? "bg-indigo-900 text-indigo-200"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          !
        </div>
        {/* Optional decorative dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        Coming Soon!
      </h1>
      <p className="text-center max-w-md mb-6 opacity-90">
        This feature is currently in development. We're working hard to bring it to you!
      </p>

      {/* Animated progress indicator */}
      <div className="w-full max-w-xs h-2 rounded-full overflow-hidden bg-opacity-20 bg-gray-400">
        <div
          className={`h-full rounded-full animate-progress ${
            darkMode ? "bg-indigo-400" : "bg-indigo-600"
          }`}
          style={{
            width: "0%",
            animation: "progress 2s ease-in-out infinite alternate",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ComingSoon;