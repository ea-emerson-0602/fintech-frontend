import React, { JSX, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import WalletDashboard from "./components/Dashboard/WalletDashboard";
import FundWallet from "./components/Operations/FundWallet";
import Transfer from "./components/Operations/Transfer";
import ComingSoon from "./components/Shared/ComingSoon"; // Import the ComingSoon component
import { AuthContext } from "./context/AuthContext";

interface AppRoutesProps {
  darkMode: boolean;
}

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ darkMode }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <WalletDashboard darkMode={darkMode} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet/fund"
        element={
          <ProtectedRoute>
            <FundWallet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet/transfer"
        element={
          <ProtectedRoute>
            <Transfer />
          </ProtectedRoute>
        }
      />
      {/* Any non-wallet item shows Coming Soon */}
      <Route path="/customers" element={<ComingSoon darkMode={darkMode} />} />
      <Route path="/overview" element={<ComingSoon darkMode={darkMode} />} />
      <Route path="/spot-orders" element={<ComingSoon darkMode={darkMode} />} />
      <Route
        path="/margin-orders"
        element={<ComingSoon darkMode={darkMode} />}
      />
      <Route
        path="/transactions"
        element={<ComingSoon darkMode={darkMode} />}
      />
      <Route
        path="/notification"
        element={<ComingSoon darkMode={darkMode} />}
      />
      <Route path="/settings" element={<ComingSoon darkMode={darkMode} />} />
      <Route path="/logout" element={<ComingSoon darkMode={darkMode} />} />
      <Route path="/help" element={<ComingSoon darkMode={darkMode} />} />
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
