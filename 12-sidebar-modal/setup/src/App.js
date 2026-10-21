import React, { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';



function App() {
const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => {
    setIsModalOpen(true);
  };

 const closeModal = () => {
    setIsModalOpen(false);
  };


const[isSidebarOpen, setIsSidebarOpen] = useState(false);
const openSidebar = () => {
    setIsSidebarOpen(true);
  };

 const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    <main>
      <button className="sidebar-toggle" onClick={openSidebar}>
        <FaBars />
      </button>

      <button className="btn" onClick={openModal}>
        show modal
      </button>

      <div
        className={isModalOpen ? "modal-overlay show-modal" : "modal-overlay"}
      >
        <div className="modal-container">
          <h3>modal content</h3>
          <button className="close-modal-btn" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
      </div>

      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <div className="sidebar-header">
          <h2 className="logo">Coding<span>Addict</span></h2>
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        <ul className="links">
          <li>
            <a href="#">home</a>
          </li>
          <li>
            <a href="#">about</a>
          </li>
          <li>
            <a href="#">projects</a>
          </li>
        </ul>
      </aside>

      
    </main>
  );
}

export default App;