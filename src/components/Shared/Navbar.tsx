import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const Navbar = ({ user, darkMode }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex justify-between items-center px-12 py-4 border-b-2 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Search Field */}
      <div className="flex items-center rounded-full bg-[#F5F4F2] border px-4 gap-2">
        <input
          type="text"
          placeholder="Search"
          className=" py-2 bg-[#F5F4F2] active:ring-0 active:outline-none"
          onClick={handleSearchClick}
        />
        <Search className="text-gray-400"/>
        {isModalOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-10" />
        )}
        {isModalOpen && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-20">
            <h2 className="text-lg">Search functionality coming soon!</h2>
            <button
              onClick={handleCloseModal}
              className="mt-4 text-blue-500 hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex space-x-8">
      <div className="flex gap-3">
        <div className="text-lg font-bold px-3 py-1 rounded-full bg-[#F8D802]">
          {user?.charAt(0)}
        </div>
        <div className="flex items-center gap-2">
          <span>{user}</span>
          <span>▼</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="relative my-auto">
        <Link to="/notifications" className="text-gray-600">
          <Bell size={20} className="fill-gray-400 text-gray-400" />
          <span className="absolute top-0 right-0 bg-red-500 border-[1px]  text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"></span>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
