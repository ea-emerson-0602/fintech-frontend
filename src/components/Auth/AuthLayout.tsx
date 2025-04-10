import React from "react";
import sideImage from "../../assets/sideimage.svg";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-fit">
        <img
          src={sideImage}
          alt="Auth"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
