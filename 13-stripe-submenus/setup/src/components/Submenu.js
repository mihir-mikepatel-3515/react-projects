// src/components/Submenu.js
import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../context/AppContext';

export default function Submenu() {
  const {
    isSubmenuOpen,
    location,
    subpage: { page, links },
    closeSubmenu, // Context માંથી closeSubmenu લીધું
  } = useGlobalContext();

  const container = useRef(null);
  const [columns, setColumns] = useState('col-2');

  useEffect(() => {
    if (links && links.length > 0) {
      setColumns(`col-${links.length > 3 ? 4 : links.length}`);
    }

    const submenuDOM = container.current;
    const { center, bottom } = location || {};

    if (submenuDOM && center && bottom) {
      submenuDOM.style.left = `${center}px`;
      submenuDOM.style.top = `${bottom}px`;
    }
  }, [location, links]);

  return (
    // onMouseLeave ઉમેરવાથી માઉસ બહાર નીકળતાં જ સબમેનુ બંધ થશે
    <aside
      className={`submenu ${isSubmenuOpen ? 'show' : ''}`}
      ref={container}
      onMouseLeave={closeSubmenu}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {links?.map((link, index) => {
            const { label, icon, url } = link;
            return (
              <a 
                key={index} 
                href={url}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Navigating to ${page} -> ${label}`);
                  closeSubmenu();
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </section>
    </aside>
  );
}