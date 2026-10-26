// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useGlobalContext } from './context/context';

export default function App() {
  const { loading } = useGlobalContext();

  // Conditional Rendering: જ્યારે ડેટા ફેચ થતો હોય ત્યારે
  if (loading) {
    return (
      <div className="loading" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}