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
} from "lucide-react";
import LogoutButton from "./LogoutButton"; // Import your LogOutButton component

const navItems = [
  { name: "Overview", icon: <BarChart size={18}/> },
  { name: "Customers", icon: <UsersRound size={18}/> },
  { name: "Spot Orders", icon: <Presentation size={18}/> },
  { name: "Margin Orders", icon: <MonitorCheck size={18}/> },
  { name: "Transactions", icon: <ArrowRightLeft size={18}/> },
  { name: "Wallet", icon: <ArrowRightLeft size={18}/>, highlight: true },
];

const others = [
  { name: "Notification", icon: <Bell size={18}/> },
  { name: "Settings", icon: <Settings size={18}/> },
  { name: "Logout", icon: <LogOut size={18}/> },  // Logout item
  { name: "Help", icon: <AlertCircle size={18}/> },
];

const Sidebar = ({ darkMode, toggleDarkMode }: any) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Wallet");  // Default selected item
  const location = useLocation();

  // Set active item based on location (for routes like "/dashboard", "/customers", etc.)
  useEffect(() => {
    // Handle the default selection logic for the dashboard
    if (location.pathname === "/dashboard") {
      setActive("Wallet");
    } else {
      // You can modify this logic to handle other routes as needed
      setActive(location.pathname.split("/")[1].charAt(0).toUpperCase() + location.pathname.split("/")[1].slice(1) || "Wallet");
    }
  }, [location]);

  // Handle early return to hide the sidebar on login or register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null; // Don't render the sidebar if on login/register pages
  }

  const renderItems = (items: any[]) => (
    <ul className="space-y-4">
      {items.map(({ name, icon }: any) => (
        <li
          key={name}
          onClick={() => {
            setActive(name);
            setOpen(false);
          }}
          className={`py-1 w-[15vw] cursor-pointer rounded transition ${
            active === name ? "text-yellow-400" : "text-gray-300"
          } hover:bg-gray-700`}
        >
          {name === "Logout" ? (
            // Wrap the LogOutButton in the same styled structure
            <div className="flex gap-5">
              <span className="text-xs">{icon}</span>
              <LogoutButton /> {/* Ensure your LogOutButton inherits the same style */}
            </div>
          ) : (
            <Link to={name === "Wallet" ? "/dashboard" : `/${name.toLowerCase()}`} className="flex gap-5">
              <span className="text-xs">{icon}</span>
              <span className="hidden md:inline text-xs">{name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setOpen(!open)} className="text-white text-2xl">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed z-50 md:static top-0 left-0 h-full w-64 bg-[#0D120E] text-white transition-transform duration-300 ease-in-out flex flex-col justify-between`}
      >
        <div className="space-y-6 ">
          <div className="font-bold text-lg border-b-[1px] border-b-gray-500 p-6 text-white"><span className=" text-sm px-2 py-[6px]  rounded-full text-black bg-[#F8D802]">B.</span> BEAM</div>

          <div className="pb-4 mx-9">
            <p className="text-xs text-white pt-8 mb-4">MAIN</p>
            {renderItems(navItems)}
          </div>

          <div className="pb-4 mx-9">
            <p className="text-xs text-white border-t-[1px] border-t-gray-500 pt-12  mb-4">OTHERS</p>
            {renderItems(others)}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="p-4 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-2">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? "Switch to light mode" : "Switch to dark mode"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-yellow-500 transition-colors duration-300">
              <div
                className={`absolute top-0.5 ${
                  darkMode ? "right-0.5" : "left-0.5"
                } w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transform transition-transform duration-300`}></div>
            </div>
          </label>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
