import React from "react";
import sideImage from "../../assets/sideimage.svg";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex h-screen w-full">
  {/* Image column - hidden on mobile */}
  <div className="hidden md:block w-fit">
    <img
      src={sideImage}
      alt="Auth"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Form column - full width on mobile */}
  <div className="flex w-full md:w-1/2 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
</div>
  );
};

export default AuthLayout;
