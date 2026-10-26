// src/components/Hero.js
import React from 'react';

// ૧. Variable: હીરો સેક્શનનો કન્ટેન્ટ ડેટા
const HERO_CONTENT = {
  title: 'Financial infrastructure for the internet',
  subtitle:
    'Millions of businesses of all sizes—from startups to large enterprises—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.',
  ctaText: 'Start now',
  cardHolder: 'Jane Doe',
  cardExpiry: '12/28',
  cardNumber: '•••• •••• •••• 4242',
};

export default function Hero({ onCloseSubmenu }) {
  // ૨. Destructuring: ડેટામાંથી વેરિએબલ્સ છૂટા પાડવા
  const { title, subtitle, ctaText, cardHolder, cardExpiry, cardNumber } = HERO_CONTENT;

  // ૩. Function: હીરો સેક્શન પર માઉસ આવે ત્યારે સબમેનુ ક્લોઝ કરવાનો હેન્ડલર
  const handleHeroHover = () => {
    if (onCloseSubmenu) {
      onCloseSubmenu();
    }
  };

  return (
    // Event Handling: onMouseOver થતાં સબમેનુ બંધ થશે
    <section className="hero" onMouseOver={handleHeroHover}>
      <div className="hero-center">
        
        {/* Left Side Info */}
        <article className="hero-info">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <button type="button" className="btn">
            {ctaText}
          </button>
        </article>

        {/* Right Side Phone & Card Graphic */}
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