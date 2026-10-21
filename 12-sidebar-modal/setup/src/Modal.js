import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = () => {
  return (
    // 'show-modal' ક્લાસ લગાવવાથી આ સ્ક્રીન પર દેખાય છે
    <div className="modal-overlay show-modal">
      <div className="modal-container">
        <h3>modal content</h3>
        <button className="close-modal-btn">
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;