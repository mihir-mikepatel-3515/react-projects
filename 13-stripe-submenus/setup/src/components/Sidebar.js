// src/components/Sidebar.js
import React, { useState } from 'react';
import { SUBMENU_LINKS } from '../data/stripeData'; // ૧. Data Variable Import

export default function Sidebar() {
  // ૨. State: Sidebar ખુલ્લો છે કે બંધ તે ટ્રેક કરવા માટે (ટેસ્ટ કરવા અત્યારે true રાખીએ)
  const [isOpen, setIsOpen] = useState(true);

  // ૩. Function: ક્લોઝ બટન પર ક્લિક થતાં સ્ટેટ false થશે
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    // Conditional Rendering: જો isOpen true હોય તો 'show' ક્લાસ લાગશે
    <aside className={`sidebar-wrapper ${isOpen ? 'show' : ''}`}>
      <div className="sidebar">
        {/* Event Handling: onClick પર closeSidebar કોલ થશે */}
        <button type="button" className="close-btn" onClick={closeSidebar}>
          ✕
        </button>

        {/* ૪. Dynamic UI: .map() વડે લૂપિંગ અને Lists & Keys */}
        <div className="sidebar-links">
          {SUBMENU_LINKS.map((item, index) => {
            const { page, links } = item; // Destructuring

            return (
              <article key={index}>
                <h4>{page}</h4>
                <div className="sidebar-sublinks">
                  {links.map((link, idx) => (
                    <a key={idx} href={link.url}>
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