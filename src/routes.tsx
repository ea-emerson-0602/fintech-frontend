import React, { JSX, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import WalletDashboard from './components/Dashboard/WalletDashboard';
import FundWallet from './components/Operations/FundWallet';
import Transfer from './components/Operations/Transfer';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <WalletDashboard />
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
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
