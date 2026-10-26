// src/components/Submenu.js
import React, { useState, useRef, useEffect } from 'react';

export default function Submenu({ isOpen, location, subpage }) {
  // 1. Ref: DOM element access karva mate
  const container = useRef(null);

  // 2. State: Kitla links chhe te mujab grid columns badlavva
  const [columns, setColumns] = useState('col-2');

  // Destructuring
  const { page, links } = subpage || { page: '', links: [] };

  // 3. Lifecycle / Effect: Jyare location athva links badlay tyare positioning set karvi
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
    // Conditional Rendering: jo isOpen true hoy toh j 'show' class lagse
    <aside
      className={`submenu ${isOpen ? 'show' : ''}`}
      ref={container}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {links?.map((link, index) => {
            const { label, icon, url } = link;
            return (
              <a key={index} href={url}>
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