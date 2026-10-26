// src/components/Navbar.js
import React from 'react';
import { SUBMENU_LINKS } from '../data/stripeData';
import { useGlobalContext } from '../context/AppContext';

export default function Navbar() {
  const { openSidebar, openSubmenu, closeSubmenu, isSubmenuOpen, subpage } = useGlobalContext();

  const handleHoverLink = (e) => {
    const pageText = e.target.textContent.trim();
    const btnCoordinates = e.target.getBoundingClientRect();
    const center = (btnCoordinates.left + btnCoordinates.right) / 2;
    const bottom = btnCoordinates.bottom - 3;

    openSubmenu(pageText, { center, bottom });
  };

  const handleNavMouseOver = (e) => {
    if (!e.target.classList.contains('link-btn')) {
      closeSubmenu();
    }
  };

  return (
    <nav className="nav" onMouseOver={handleNavMouseOver}>
      <div className="nav-center">
        
        <div className="nav-header">
          <h3 className="nav-logo">stripe</h3>
          <button 
            type="button" 
            className="btn toggle-btn" 
            onClick={openSidebar}
            aria-label="Toggle navigation drawer"
          >
            ☰
          </button>
        </div>

        <ul className="nav-links">
          {SUBMENU_LINKS.map((item, index) => {
            const { page } = item;
            const isCurrentActive = isSubmenuOpen && subpage.page === page;

            return (
              <li key={index}>
                <button
                  type="button"
                  className={`link-btn ${isCurrentActive ? 'active' : ''}`}
                  onMouseOver={handleHoverLink}
                  onFocus={handleHoverLink}
                  aria-haspopup="true"
                  aria-expanded={isCurrentActive}
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