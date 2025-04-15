import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import WalletDashboard from "./components/Dashboard/WalletDashboard";
import FundWallet from "./components/Operations/FundWallet";
import Transfer from "./components/Operations/Transfer";
import Withdrawal from "./components/Operations/Withdrawal";
import Sidebar from "./components/Shared/Sidebar";
import ComingSoon from "./components/Shared/ComingSoon";
import "./index.css";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const [active, setActive] = useState("Wallet");
  const [darkMode, setDarkMode] = useState(false);

  // Pages that should NOT show sidebar
  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {!isAuthPage && (
        <Sidebar
          active={active}
          setActive={setActive}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
      )}
      <main className="flex-1">{children}</main>
    </div>
  );

  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          }
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<WalletDashboard darkMode={darkMode} />}
          />
          <Route path="/wallet/fund" element={<FundWallet />} />
          <Route path="/wallet/transfer" element={<Transfer />} />
          <Route path="/wallet/withdraw" element={<Withdrawal />} />

          {/* Coming soon pages */}
          <Route
            path="/customers"
            element={<ComingSoon darkMode={darkMode} />}
          />
          <Route
            path="/overview"
            element={<ComingSoon darkMode={darkMode} />}
          />
          <Route
            path="/spot-orders"
            element={<ComingSoon darkMode={darkMode} />}
          />
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
          <Route
            path="/settings"
            element={<ComingSoon darkMode={darkMode} />}
          />
          <Route path="/logout" element={<ComingSoon darkMode={darkMode} />} />
          <Route path="/help" element={<ComingSoon darkMode={darkMode} />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
