import React, { useState } from 'react';

function App() {
  // Step navigation tracker (1 to 5)
  const [step, setStep] = useState(1);

  // Dodging "No" button coordinates
  const [noBtnPos, setNoBtnPos] = useState({ top: '50%', left: '60%' });

  // Collected responses
  const [selectedPlace, setSelectedPlace] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [note, setNote] = useState('');

  // Move "No" button randomly whenever hovered or touched
  const dodgeNoBtn = () => {
    const randomTop = Math.floor(Math.random() * 70) + 15;
    const randomLeft = Math.floor(Math.random() * 70) + 15;
    setNoBtnPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  // Pre-fill message and send via WhatsApp
  const sendToWhatsApp = () => {
    const yourPhoneNumber = '919876543210'; // Replace with your phone number with country code
    const message = encodeURIComponent(
      `Hey! I said YES! 🥰\n\n` +
      `📍 Activity: ${selectedPlace}\n` +
      `📅 When: ${dateTime}\n` +
      `💌 Note: ${note || 'Looking forward to it!'}`
    );
    window.open(`https://wa.me/${yourPhoneNumber}?text=${message}`, '_blank');
  };

  return (
    <main className="date-wrapper">
      <div className="card">
        {/* ================= STEP 1: THE PROPOSAL ================= */}
        {step === 1 && (
          <div className="step-container">
            <span className="emoji">💖</span>
            <h2>Will you go on a date with Mihir ?</h2>
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

        {/* ================= STEP 2: SELECT PLACE ================= */}
        {step === 2 && (
          <div className="step-container">
            <span className="emoji">☕</span>
            <h2>What should we do?</h2>
            <div className="options-grid">
              {['Cozy Coffee & Talk ☕', 'Romantic Dinner 🍕', 'Sunset Walk & Ice Cream 🍦', 'Cinema & Popcorn 🎬'].map(
                (place) => (
                  <button
                    key={place}
                    className={`option-btn ${selectedPlace === place ? 'selected' : ''}`}
                    onClick={() => setSelectedPlace(place)}
                  >
                    {place}
                  </button>
                )
              )}
            </div>
            <button
              className="btn btn-next"
              disabled={!selectedPlace}
              onClick={() => setStep(3)}
            >
              Next Step ➡️
            </button>
          </div>
        )}

        {/* ================= STEP 3: DATE & TIME ================= */}
        {step === 3 && (
          <div className="step-container">
            <span className="emoji">🗓️</span>
            <h2>Pick a Date & Time</h2>
            <input
              type="datetime-local"
              className="input-field"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
            <button
              className="btn btn-next"
              disabled={!dateTime}
              onClick={() => setStep(4)}
            >
              Next Step ➡️
            </button>
          </div>
        )}

        {/* ================= STEP 4: SWEET NOTE ================= */}
        {step === 4 && (
          <div className="step-container">
            <span className="emoji">💌</span>
            <h2>Leave a cute note!</h2>
            <textarea
              className="textarea-field"
              placeholder="Any favorite dish, song, or something you want to say..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="4"
            />
            <button className="btn btn-next" onClick={() => setStep(5)}>
              Finish 🎉
            </button>
          </div>
        )}

        {/* ================= STEP 5: CONFIRMATION ================= */}
        {step === 5 && (
          <div className="step-container">
            <span className="emoji">🎉</span>
            <h2>It's a Date!</h2>
            <div className="summary-box">
              <p><strong>Activity:</strong> {selectedPlace}</p>
              <p><strong>Time:</strong> {dateTime}</p>
              {note && <p><strong>Note:</strong> "{note}"</p>}
            </div>
            <p className="subtext">Tap below to notify me on WhatsApp!</p>
            <button className="btn btn-whatsapp" onClick={sendToWhatsApp}>
              Send via WhatsApp 💬
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;