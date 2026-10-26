// src/context/AppContext.js
import React, { useState, useContext, createContext, useEffect } from 'react';
import { SUBMENU_LINKS } from '../data/stripeData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [subpage, setSubpage] = useState({ page: '', links: [] });

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const openSubmenu = (text, coordinates) => {
    const targetPage = SUBMENU_LINKS.find(
      (item) => item.page.toLowerCase() === text.toLowerCase()
    );

    if (targetPage) {
      setSubpage(targetPage);
      setLocation(coordinates);
      setIsSubmenuOpen(true);
    }
  };

  const closeSubmenu = () => setIsSubmenuOpen(false);

  // Global Keyboard (Esc key) & Window Resize Lifecycle Handler
  useEffect(() => {
    // 1. Esc Key દબાવતાં બધા ઓપન મેનુ બંધ કરવા
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeSubmenu();
        closeSidebar();
      }
    };

    // 2. ડેસ્કટોપમાંથી વિન્ડો નાની થાય (અથવા ઊલટું) ત્યારે સબમેનુ બંધ કરવું
    const handleResize = () => {
      if (window.innerWidth < 800) {
        closeSubmenu();
      } else {
        closeSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    // Component Lifecycle: Unmount / Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isSubmenuOpen,
        openSidebar,
        closeSidebar,
        openSubmenu,
        closeSubmenu,
        location,
        subpage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};