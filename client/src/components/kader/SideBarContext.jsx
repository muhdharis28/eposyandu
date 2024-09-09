import React, { createContext, useContext, useState } from 'react';

// Create context
const SidebarContextKader = createContext();

// Custom hook to use the sidebar context
export const useSidebarKader = () => useContext(SidebarContextKader);

// Provider component
export const SidebarProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <SidebarContextKader.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </SidebarContextKader.Provider>
  );
};
