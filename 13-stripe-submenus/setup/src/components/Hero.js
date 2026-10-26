// src/components/Hero.js
import React from 'react';
import { useGlobalContext } from '../context/AppContext';

const HERO_CONTENT = {
  title: 'Financial infrastructure for the internet',
  subtitle:
    'Millions of businesses of all sizes—from startups to large enterprises—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.',
  ctaText: 'Start now',
  cardHolder: 'Jane Doe',
  cardExpiry: '12/28',
  cardNumber: '•••• •••• •••• 4242',
};

export default function Hero() {
  const { closeSubmenu } = useGlobalContext();
  const { title, subtitle, ctaText, cardHolder, cardExpiry, cardNumber } = HERO_CONTENT;

  return (
    <section className="hero" onMouseOver={closeSubmenu}>
      <div className="hero-center">
        
        <article className="hero-info">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <button type="button" className="btn">
            {ctaText}
          </button>
        </article>

        <article className="hero-images">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="card-preview">
                <div className="card-chip"></div>
                <div className="card-number">{cardNumber}</div>
                <div className="card-row">
                  <span>{cardHolder}</span>
                  <span>{cardExpiry}</span>
                </div>
              </div>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}