import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, ChevronDown, ChevronUp } from "lucide-react";

const Navbar = ({ user, darkMode }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex justify-between items-center px-4  ml-12 md:ml-6 lg:ml-0 md:px-12 py-4 lg:border-b-2 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Search Field */}
      <div className="flex items-center rounded-full bg-[#F5F4F2] border px-4 gap-2">
        <input
          type="text"
          placeholder="Search"
          className="py-2 bg-[#F5F4F2] hidden lg:block active:ring-0 active:outline-none w-24 md:w-auto"
          onClick={handleSearchClick}
        />
        <Search className="text-gray-400" />
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 opacity-50 z-10" />
        )}
        {isModalOpen && (
          <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-20">
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
      <div className="flex space-x-4 md:space-x-8">
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="text-lg font-bold px-3 py-1 rounded-full bg-[#F8D802]">
              {user?.charAt(0)}
            </div>
            <div className="items-center hidden md:flex gap-2">
              <span>{user}</span>
              {dropdownOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            <div className="flex md:hidden">
              {dropdownOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
          </div>

          {/* Dropdown menu */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-500 text-white
               rounded-md shadow-lg z-10 
              transition-all duration-300 ease-in-out origin-top-right overflow-hidden
              ${dropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="p-3 text-sm border-b dark:border-gray-700">
              <p className="font-semibold">{user}</p>
              <p className="text-gray-500 text-xs mt-1">User Account</p>
            </div>
            <div className="py-1">
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setDropdownOpen(false)}
              >
                Account Settings
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setDropdownOpen(false)}
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative my-auto">
          <Link to="/notifications" className="text-gray-600">
            <Bell size={20} className="fill-gray-400 text-gray-400" />
            <span className="absolute top-0 right-0 bg-red-500 border-[1px] text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
