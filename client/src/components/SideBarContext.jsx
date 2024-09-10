// src/components/SideBarContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a single Sidebar Context for all dashboards
const SidebarContext = createContext();

// Custom hook to use the Sidebar context
export const useSidebar = () => useContext(SidebarContext);

// Provider component to wrap the main App
export const SidebarProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Function to toggle the sidebar state
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
