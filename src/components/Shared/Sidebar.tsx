import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart,
  UsersRound,
  Presentation,
  ArrowRightLeft,
  MonitorCheck,
  Menu,
  X,
  Settings,
  LogOut,
  AlertCircle,
  Bell,
  Moon,
  Sun,
  Wallet,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

const navItems = [
  { name: "Overview", icon: <BarChart size={20} /> },
  { name: "Customers", icon: <UsersRound size={20} /> },
  { name: "Spot-orders", icon: <Presentation size={20} /> },
  { name: "Margin-orders", icon: <MonitorCheck size={20} /> },
  { name: "Transactions", icon: <ArrowRightLeft size={20} /> },
  { name: "Wallet", icon: <Wallet size={20} />, highlight: true },
];

const others = [
  { name: "Notification", icon: <Bell size={20} /> },
  { name: "Settings", icon: <Settings size={20} /> },
  { name: "Logout", icon: <LogOut size={20} /> },
  { name: "Help", icon: <AlertCircle size={20} /> },
];

const Sidebar = ({ darkMode, toggleDarkMode, active, setActive }: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Set active item based on location
  useEffect(() => {
    // Only update active state if it doesn't match current route
    const currentPath = location.pathname;

    if (currentPath === "/dashboard") {
      if (active !== "Wallet") setActive("Wallet");
    } else {
      const pathSegment = currentPath.split("/")[1] || "";
      const formattedPath = pathSegment
        ? pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1)
        : "Wallet";
      const cleanedPath = formattedPath.replace(/%20/g, "-");

      console.log(formattedPath);
      console.log(cleanedPath);

      if (active !== cleanedPath) setActive(cleanedPath);
    }
  }, [active, location.pathname, setActive]); // Only depend on pathname

  // Hide sidebar on login or register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const renderItems = (items: any[]) => (
    <ul className="space-y-4">
      {items.map(({ name, icon }) => (
        <li
          key={name}
          onClick={() => {
            setActive(name);
            setMobileMenuOpen(false);
          }}
          className={`py-2 px-3 cursor-pointer rounded transition flex items-center ${
            active === name ? "text-yellow-400" : "text-gray-300"
          } hover:bg-gray-700`}
        >
          {name === "Logout" ? (
            <div className="flex items-center w-full">
              <span className="flex-shrink-0">{icon}</span>
              <span className="ml-4  text-sm">
                <LogoutButton />
              </span>
            </div>
          ) : (
            <Link
              to={name === "Wallet" ? "/dashboard" : `/${name.toLowerCase()}`}
              className="flex items-center w-full"
            >
              <span className="flex-shrink-0">{icon}</span>
              <span className="ml-4 text-sm">{name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white bg-gray-800 rounded-md p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full 
          w-64
          bg-[#0D120E] text-white 
          transform transition-transform duration-300 ease-in-out
          z-40
          flex flex-col justify-between
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="space-y-6 overflow-y-auto scrollbar-hide">
          {/* Logo */}
          <div className="font-bold text-lg border-b border-gray-500 p-6 text-white flex items-center">
            <span className="text-sm px-2 py-1 rounded-full text-black bg-[#F8D802]">
              B.
            </span>
            <span className="ml-2">BEAM</span>
          </div>

          {/* Main Navigation */}
          <div className="px-6">
            <p className="text-xs text-white pt-4 mb-4">MAIN</p>
            {renderItems(navItems)}
          </div>

          {/* Other Navigation */}
          <div className="px-6">
            <p className="text-xs text-white border-t border-gray-500 pt-6 mb-4">
              OTHERS
            </p>
            {renderItems(others)}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-xs">
                {darkMode ? "Light mode" : "Dark mode"}
              </span>
            </span>

            {/* Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-9 h-5 bg-gray-600 rounded-full peer-checked:bg-yellow-500 transition-colors duration-300">
                <div
                  className={`absolute top-0.5 ${
                    darkMode ? "right-0.5" : "left-0.5"
                  } w-4 h-4 bg-white rounded-full transform transition-transform duration-300`}
                />
              </div>
            </label>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
