// Incorrect: Avoid wrapping with <Router> again in routes.tsx
import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import WalletDashboard from './components/Dashboard/WalletDashboard';

const AppRoutes: React.FC = () => (
  // Remove the <BrowserRouter> wrapper here!
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<WalletDashboard />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
