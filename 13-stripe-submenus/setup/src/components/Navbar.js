// src/components/Navbar.js
import React from 'react';
import { SUBMENU_LINKS } from '../data/stripeData';

export default function Navbar({ onOpenSidebar, onOpenSubmenu, onCloseSubmenu }) {
  
  const handleHoverLink = (e) => {
    const pageText = e.target.textContent.trim();
    const btnCoordinates = e.target.getBoundingClientRect();
    const center = (btnCoordinates.left + btnCoordinates.right) / 2;
    const bottom = btnCoordinates.bottom - 3;

    if (onOpenSubmenu) {
      onOpenSubmenu(pageText, { center, bottom });
    }
  };

  const handleNavMouseOver = (e) => {
    if (!e.target.classList.contains('link-btn')) {
      if (onCloseSubmenu) {
        onCloseSubmenu();
      }
    }
  };

  return (
    // આ લાઇન પર onMouseOver={handleNavMouseOver} ઉમેરો જેથી warning જતી રહેશે:
    <nav className="nav" onMouseOver={handleNavMouseOver}>
      <div className="nav-center">
        
        <div className="nav-header">
          <h3 className="nav-logo">stripe</h3>
          <button 
            type="button" 
            className="btn toggle-btn" 
            onClick={onOpenSidebar}
          >
            ☰
          </button>
        </div>

        <ul className="nav-links">
          {SUBMENU_LINKS.map((item, index) => {
            const { page } = item;
            return (
              <li key={index}>
                <button
                  type="button"
                  className="link-btn"
                  onMouseOver={handleHoverLink}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>

        <button type="button" className="btn signin-btn">
          Sign in
        </button>

      </div>
    </nav>
  );
}