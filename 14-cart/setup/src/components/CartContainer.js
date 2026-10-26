// src/components/CartContainer.js
import React from 'react';
import CartItem from './CartItem';
import { useGlobalContext } from '../context/context';

export default function CartContainer() {
  const { cart, total, clearCart } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4
            className="empty-cart"
            style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}
          >
            is currently empty
          </h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>

      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>

      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button type="button" className="btn clear-btn" onClick={clearCart}>
          clear cart
        </button>
      </footer>
    </section>
  );
}