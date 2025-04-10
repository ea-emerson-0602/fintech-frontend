// src/components/LogoutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token or session
    localStorage.removeItem('authToken'); // Adjust the key as per your implementation
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
