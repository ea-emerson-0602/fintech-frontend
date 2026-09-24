import React from "react";
import { Moon, Sun } from "lucide-react";
import sideImage from "../../assets/sideimage.svg";
import { useTheme } from "../../context/ThemeContext";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex h-screen w-full bg-white text-gray-900 dark:bg-zinc-950 dark:text-zinc-300">
      <div className="hidden md:block w-fit">
        <img
          src={sideImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative flex w-full md:w-1/2 items-center justify-center p-4 sm:p-6 md:p-8 bg-white dark:bg-zinc-950">
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="absolute top-4 right-4 rounded-full border border-gray-200 p-2 text-gray-700 hover:bg-gray-100 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
