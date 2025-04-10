// src/components/LogoutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    const response = await axiosInstance.post("/logout");// Adjust the key as per your implementation
    // Redirect the user to the login page or home page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="text-xs">
      Logout
    </button>
  );
};

export default LogoutButton;
