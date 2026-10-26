// src/components/Sidebar.js
import React from 'react';
import { SUBMENU_LINKS } from '../data/stripeData';
import { useGlobalContext } from '../context/AppContext';

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <aside className={`sidebar-wrapper ${isSidebarOpen ? 'show' : ''}`}>
      <div className="sidebar">
        <button type="button" className="close-btn" onClick={closeSidebar}>
          ✕
        </button>

        <div className="sidebar-links">
          {SUBMENU_LINKS.map((item, index) => {
            const { page, links } = item;
            return (
              <article key={index}>
                <h4>{page}</h4>
                <div className="sidebar-sublinks">
                  {links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Mobile Navigation: ${page} -> ${link.label}`);
                        closeSidebar();
                      }}
                    >
                      {link.icon} {link.label}
                    </a>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
}