import React, { createContext, useContext, useState } from 'react';

// Create context
const SidebarContextUser = createContext();

// Custom hook to use the sidebar context
export const useSidebarUser = () => useContext(SidebarContextUser);

// Provider component
export const SidebarProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <SidebarContextUser.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </SidebarContextUser.Provider>
  );
};
