// src/components/CartItem.js
import React from 'react';
import { useGlobalContext } from '../context/context';

export default function CartItem({ id, img, title, price, amount }) {
  const { remove, increase, decrease } = useGlobalContext();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button
          type="button"
          className="remove-btn"
          onClick={() => remove(id)}
        >
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          className="amount-btn"
          onClick={() => increase(id)}
        >
          ▲
        </button>
        <p className="amount">{amount}</p>
        <button
          type="button"
          className="amount-btn"
          onClick={() => decrease(id)}
        >
          ▼
        </button>
      </div>
    </article>
  );
}