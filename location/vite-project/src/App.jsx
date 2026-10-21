import React, { useState } from 'react';

// Data dictionary for cities and their 10 cafe/restaurant spots
const locationData = {
  Navsari: [
    'Coffee Culture',
    'The Chocolate Room',
    'Cafe Beats & Bites',
    'Tea Post Cafe',
    'Green Heritage Cafe',
    'La Pino’z Pizza',
    'Sugar N Spice',
    'Woodlands Restaurant',
    'The Urban Cafe',
    'Belgian Waffle Co.',
  ],
  Chikhli: [
    'Cafe Kissa',
    'Honest Restaurant & Cafe',
    'The Highway Treat Cafe',
    'Shreeji Food & Cafe',
    'Kolkata Frankie & Fast Food',
    'Cafe Coffee Day (Highway)',
    'Foodies Corner',
    'Saffron Family Restaurant',
    'Chillout Cafe Point',
    'Tea Post Chikhli',
  ],
  Valsad: [
    'The Yellow Submarine Cafe',
    'Coffee Culture Valsad',
    'Cafe Retro Brew',
    'Gokul Refreshment',
    'La Pino’z Valsad',
    'Bake O Break Cafe',
    'The Belgian Fries & Shakes',
    'Village Restro Cafe',
    'Tea Break Lounge',
    'Madhav Restaurant & Cafe',
  ],
  Surat: [
    "K's Charcoal Cafe (Vesu)",
    'Nomads Cafe (Piplod)',
    'Coffee Culture (Adajan)',
    'The Black Sheep Cafe',
    'Meraki Coffee & Co.',
    "Cafe De' Liban",
    'Dumas Bay Cafe',
    'Tea Post Lounge',
    'La Bella Cafe & Bistro',
    'Anytime at Althan Cafe',
  ],
};

const menuItems = [
  'Cold Coffee & Frappe 🥤',
  'Artisan Pizza 🍕',
  'Cheesy Pasta 🍝',
  'Burgers & Fries 🍟',
  'Dessert & Sizzling Brownie 🍨',
  'Mocktails & Coolers 🍹',
];

// YOUR PHONE NUMBER HARDCODED HERE:
const MY_PHONE_NUMBER = '916354442578';

function App() {
  const [step, setStep] = useState(1);

  // Dodging "No" button position
  const [noBtnPos, setNoBtnPos] = useState({ top: '50%', left: '60%' });

  // Selections
  const [city, setCity] = useState('');
  const [cafe, setCafe] = useState('');
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [dateTime, setDateTime] = useState('');

  // Moving "No" button logic
  const dodgeNoBtn = () => {
    const randomTop = Math.floor(Math.random() * 70) + 15;
    const randomLeft = Math.floor(Math.random() * 70) + 15;
    setNoBtnPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  // Toggle dish in array
  const toggleDish = (dish) => {
    if (selectedDishes.includes(dish)) {
      setSelectedDishes(selectedDishes.filter((item) => item !== dish));
    } else {
      setSelectedDishes([...selectedDishes, dish]);
    }
  };

  // WhatsApp sender directly to YOUR number
  const sendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I said YES to our date! 🥰\n\n` +
      `📍 City: ${city}\n` +
      `☕ Cafe: ${cafe}\n` +
      `🍽️ Food: ${selectedDishes.join(', ') || 'Your choice!'}\n` +
      `📅 When: ${dateTime}`
    );
    window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${text}`, '_blank');
  };

  // Direct SMS sender directly to YOUR number
  const sendSMS = () => {
    const text = encodeURIComponent(
      `Hey! I said YES to our date! 🥰 City: ${city} | Cafe: ${cafe} | Food: ${selectedDishes.join(', ')} | When: ${dateTime}`
    );
    window.open(`sms:${MY_PHONE_NUMBER}?body=${text}`, '_blank');
  };

  return (
    <main className="date-wrapper">
      <div className="card">

        {/* STEP 1: PROPOSAL */}
        {step === 1 && (
          <div className="step-container">
            <span className="emoji">💖</span>
            <h2>Will you go on a date with Mihir?</h2>
            <div className="btn-group">
              <button className="btn btn-yes" onClick={() => setStep(2)}>
                Yes! 🥰
              </button>
              <button
                className="btn btn-no"
                style={{
                  position: noBtnPos.top === '50%' ? 'static' : 'fixed',
                  top: noBtnPos.top,
                  left: noBtnPos.left,
                }}
                onMouseEnter={dodgeNoBtn}
                onTouchStart={dodgeNoBtn}
              >
                No 😢
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT CITY */}
        {step === 2 && (
          <div className="step-container">
            <span className="emoji">📍</span>
            <h2>Choose Location</h2>
            <select
              className="select-field"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setCafe('');
              }}
            >
              <option value="">-- Select City --</option>
              {Object.keys(locationData).map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <button
              className="btn btn-next"
              disabled={!city}
              onClick={() => setStep(3)}
            >
              Next: Select Spot ➡️
            </button>
          </div>
        )}

        {/* STEP 3: SELECT CAFE / RESTAURANT */}
        {step === 3 && (
          <div className="step-container">
            <span className="emoji">☕</span>
            <h2>Select Cafe / Restaurant in {city}</h2>
            <select
              className="select-field"
              value={cafe}
              onChange={(e) => setCafe(e.target.value)}
            >
              <option value="">-- Select Spot --</option>
              {locationData[city]?.map((spot) => (
                <option key={spot} value={spot}>
                  {spot}
                </option>
              ))}
            </select>

            <div className="dual-btn-group">
              <button className="btn btn-back" onClick={() => setStep(2)}>
                Back
              </button>
              <button
                className="btn btn-next"
                disabled={!cafe}
                onClick={() => setStep(4)}
              >
                Next: Menu ➡️
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SELECT MENU */}
        {step === 4 && (
          <div className="step-container">
            <span className="emoji">🍽️</span>
            <h2>What should we eat?</h2>
            <div className="options-grid">
              {menuItems.map((dish) => (
                <button
                  key={dish}
                  className={`option-btn ${selectedDishes.includes(dish) ? 'selected' : ''}`}
                  onClick={() => toggleDish(dish)}
                >
                  {dish}
                </button>
              ))}
            </div>

            <div className="dual-btn-group">
              <button className="btn btn-back" onClick={() => setStep(3)}>
                Back
              </button>
              <button
                className="btn btn-next"
                disabled={selectedDishes.length === 0}
                onClick={() => setStep(5)}
              >
                Next: Date & Time ➡️
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: SELECT DATE & TIME */}
        {step === 5 && (
          <div className="step-container">
            <span className="emoji">🗓️</span>
            <h2>Pick Date & Time</h2>
            <input
              type="datetime-local"
              className="input-field"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />

            <div className="dual-btn-group">
              <button className="btn btn-back" onClick={() => setStep(4)}>
                Back
              </button>
              <button
                className="btn btn-next"
                disabled={!dateTime}
                onClick={() => setStep(6)}
              >
                Review Confirmation ➡️
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION & 1-CLICK SEND TO YOUR NUMBER */}
        {step === 6 && (
          <div className="step-container">
            <span className="emoji">🎉</span>
            <h2>It's a Date!</h2>

            <div className="summary-box">
              <p><strong>City:</strong> {city}</p>
              <p><strong>Spot:</strong> {cafe}</p>
              <p><strong>Menu:</strong> {selectedDishes.join(', ')}</p>
              <p><strong>When:</strong> {new Date(dateTime).toLocaleString()}</p>
            </div>

            <p className="subtext">Tap below to send your plan directly to Mihir!</p>

            <div className="send-action-group">
              <button className="btn btn-whatsapp" onClick={sendWhatsApp}>
                Send to Mihir on WhatsApp 💬
              </button>
              <button className="btn btn-sms" onClick={sendSMS}>
                Send via Text / SMS ✉️
              </button>
            </div>

            <button className="btn btn-link" onClick={() => setStep(1)}>
              Start Over ↺
            </button>
          </div>
        )}

      </div>
    </main>
  );
}

export default App;