import React, { createContext, useContext, useState } from 'react';

// Create context
const SidebarContextAdmin = createContext();

// Custom hook to use the sidebar context
export const useSidebarAdmin = () => useContext(SidebarContextAdmin);

// Provider component
export const SidebarProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <SidebarContextAdmin.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </SidebarContextAdmin.Provider>
  );
};
