import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  user: any;  // Replace `any` with your user type if needed
  setUser: (user: any) => void;
  loading: boolean; // Add a loading state here
  setLoading: (loading: boolean) => void; // To update the loading state
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading to true by default

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
