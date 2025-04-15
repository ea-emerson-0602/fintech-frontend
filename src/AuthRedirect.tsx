// AuthRedirect.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/user", { withCredentials: true });
        if (res.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Still checking auth
  if (isAuthenticated === null) return null; // or a loading spinner

  // If logged in, redirect to dashboard
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  // If not logged in, allow access to login/register
  return <>{children}</>;
};

export default AuthRedirect;
