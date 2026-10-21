import React from 'react';
import { FaBars } from 'react-icons/fa';

const Home = () => {
  return (
    <main>
      {/* સાઇડબાર ખોલવાનું હેમબર્ગર બટન */}
      <button className="sidebar-toggle">
        <FaBars />
      </button>

      {/* મોડલ ખોલવાનું બટન */}
      <button className="btn">show modal</button>
    </main>
  );
};

export default Home;