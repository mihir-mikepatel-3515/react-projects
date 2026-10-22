import React , { useState , useEffect , useRef} from 'react';



const CRACKER_OPTIONS = [
  { id: 'sparkler', name: '1. Sparklers / Phuljhari 🎇' },
  { id: 'anar', name: '2. Flower Pots / Anar 🌋' },
  { id: 'chakri', name: '3. Chakri 💫' },
  { id: 'ground_spinner', name: '4. Ground Spinner 🌀' },
  { id: 'rocket', name: '5. Rocket 🚀' },
  { id: 'pencil', name: '6. Pencil Cracker 🪄' },
  { id: 'ladi', name: '7. Ladi / Garland Crackers 🧨' },
  { id: 'sound_cracker', name: '8. Sound Cracker 💥' },
  { id: 'atom_bomb', name: '9. Atom Bomb 💣' },
  { id: 'sutli_bomb', name: '10. Sutli Bomb 🟢' },
  { id: 'twinkling_stars', name: '11. Twinkling Stars ⭐' },
  { id: 'colourful_fountain', name: '12. Colourful Fountain 🎨' },
  { id: 'aerial_firework', name: '13. Aerial Fireworks 🎆' },
  { id: 'multi_effect', name: '14. Multi-Effect Firework 🌈' },
  { id: 'green_cracker', name: '15. Green Cracker 🌿' }
];


const REAL_SOUNDS = {
  bomb: 'https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3', // મોટો ધડાકો
  rocket: 'https://assets.mixkit.co/active_storage/sfx/1698/1698-preview.mp3', // રોકેટ સિસકારો અને ધડાકો
  ladi: 'https://assets.mixkit.co/active_storage/sfx/2873/2873-preview.mp3', // લડીના ઉપરાઉપરી તડાકા
  sparkler: 'https://assets.mixkit.co/active_storage/sfx/2871/2871-preview.mp3', // ચકરી, અનાર, ફૂલઝડીનો સુસવાટો
};


function App() {

 


  const playRealMP3Sound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'sutli_bomb' || type === 'atom_bomb' || type === 'sound_cracker') {
        // હળવો ઊંડો બાસ ધડાકો (Duration: 0.8s)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);

        // બેકગ્રાઉન્ડ વિસ્ફોટ (Short 0.5s)
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < buffer.length; i++) data[i] = (Math.random() * 2 - 1) * 0.35;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const nGain = ctx.createGain();
        nGain.gain.setValueAtTime(0.35, ctx.currentTime);
        nGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        noise.connect(nGain);
        nGain.connect(ctx.destination);
        noise.start();
      } else if (type === 'rocket' || type === 'aerial_firework') {
        // રોકેટનો હળવો સનસનાટો અને નાનો ધડાકો (તીણી સીટી વગર)
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.8, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < buffer.length; i++) data[i] = (Math.random() * 2 - 1) * 0.2;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const nGain = ctx.createGain();
        nGain.gain.setValueAtTime(0.2, ctx.currentTime);
        nGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        noise.connect(nGain);
        nGain.connect(ctx.destination);
        noise.start();

        // 0.4 સેકન્ડે હળવો પોપ
        setTimeout(() => {
          const bOsc = ctx.createOscillator();
          const bGain = ctx.createGain();
          bOsc.type = 'triangle';
          bOsc.frequency.setValueAtTime(95, ctx.currentTime);
          bOsc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.4);
          bGain.gain.setValueAtTime(0.4, ctx.currentTime);
          bGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          bOsc.connect(bGain);
          bGain.connect(ctx.destination);
          bOsc.start();
          bOsc.stop(ctx.currentTime + 0.4);
        }, 400);
      } else if (type === 'ladi') {
        // લડીના ક્રમિક હળવા તડાકા (૧ સેકન્ડ)
        for (let t = 0; t < 10; t++) {
          setTimeout(() => {
            const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < buf.length; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
            const src = ctx.createBufferSource();
            src.buffer = buf;
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.25, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
            src.connect(g);
            g.connect(ctx.destination);
            src.start();
          }, t * 90);
        }
      } else {
        // ચકરી, અનાર, ફૂલઝડીનો ૧ સેકન્ડનો હળવો સનસનાટો
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.9, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < buffer.length; i++) data[i] = (Math.random() * 2 - 1) * 0.18;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.9);
        noise.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      }
    } catch (e) {
      console.log('Audio error:', e);
    }
  };





const [authorName, setAuthorName] = useState('');
const [wishText, setWishText] = useState('');


const [wishes, setWishes] = useState(() => {
  const saved = localStorage.getItem('diwali_wishes');
  if (saved) {
    return JSON.parse(saved);
  }
  return [
    { id: 1, author: 'Aarav & Family', text: 'May your life be as colorful as the Rangoli!', likes: 18 },
    { id: 2, author: 'Riya Dave', text: 'Wishing you good fortune and happiness all year long.', likes: 24 }
  ];
});


const handleAddWish = (e) => {
  e.preventDefault();
  if (!authorName.trim() || !wishText.trim()) return;

  const newWish = {
    id: Date.now(), // યુનિક આઈડી
    author: authorName,
    text: wishText,
    likes: 0,
  };

  // જૂની વિશિસ સાથે નવી વિશ આગળ ઉમેરી
  setWishes([newWish, ...wishes]);

  // ઇનપુટ બોક્સ ખાલી કર્યા
  setAuthorName('');
  setWishText('');
};
const handleLikeWish = (id) => {
  const updated = wishes.map((item) => {
    if (item.id === id) {
      return { ...item, likes: item.likes + 1 };
    }
    return item;
  });
  setWishes(updated);
};

const handleDeleteWish = (id) => {
  const filtered = wishes.filter((item) => item.id !== id);
  setWishes(filtered);
};

const [timeLeft , setTimeLeft] = useState
({
  days:0,
  hours:0,
  minutes:0,
  seconds:0,
});


const calculateTime = () => {
  const targetDate = new Date('November 8, 2026 12:00:00').getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if(difference > 0){
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
    });
  }
};




const [activeTab , setActiveTab] = useState('card');



const [senderName , setSenderName] = useState('Mihir');
const [receiverName , setReceiverName] = useState('Dear Friend');



const [theme , setTheme] = useState('royal');

const [crackerType, setCrackerType] = useState('brocade');
const canvasRef = useRef(null);



const [message,setMessage] = useState('May the glow of the auspicious diyas illuminate your path toward happiness, health, and limitless success. Wishing you and your family a dazzling and blessed Diwali 2026!');


const [copied, setCopied] = useState(false);

const copyGreetingLink = () => {
  // ૧. કરન્ટ વેબસાઈટનું URL લીધું (દા.ત. http://localhost:5173 અથવા vercel લિંક)
  const baseUrl = window.location.origin;

  // ૨. URLSearchParams વાપરીને સેન્ડર અને રિસીવરના નામ જોડી દીધા
  const shareableUrl = `${baseUrl}?sender=${encodeURIComponent(senderName)}&receiver=${encodeURIComponent(receiverName)}`;

  // ૩. બ્રાઉઝરના ક્લિપબોર્ડમાં આ લિંક કોપી કરી
  navigator.clipboard.writeText(shareableUrl);

  // ૪. બટનનું લખાણ બદલી નાખ્યું
  setCopied(true);

  // ૫. ૨ સેકન્ડ પછી પાછું મૂળ લખાણ કરી દીધું
  setTimeout(() => {
    setCopied(false);
  }, 2000);
};


const shareToWhatsApp = () => {
  const text = encodeURIComponent(
    `🪔 *Shubh Deepavali 2026* 🪔\n\n` +
    `Dear ${receiverName},\n\n` +
    `"${message}"\n\n` +
    `✨ With Warm Regards:\n*${senderName}*`
  );
  window.open(`https://wa.me/?text=${text}`, '_blank');
};


useEffect(() => {
  calculateTime();
  const timer = setInterval(calculateTime, 1000);
  return () => clearInterval(timer);
}, []);

useEffect(() => {

  const params = new URLSearchParams(window.location.search);
  const urlSender = params.get('sender');
  const urlReceiver = params.get('receiver');

  if (urlSender) setSenderName(urlSender);
  if (urlReceiver) setReceiverName(urlReceiver);
}, []);

useEffect(() => {
  if (activeTab !== 'crackers') return;

  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ૧. પૂરી સ્ક્રીનની સાઈઝ
  const resizeScreen = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeScreen();
  window.addEventListener('resize', resizeScreen);

  let sparks = [];
  let rockets = []; // આકાશમાં ઊડતા રોકેટ્સ
  let snakes = [];  // સાપની ગોળીની રાખ
  let screenFlash = 0; // બોમ્બ ફૂટે ત્યારે સ્ક્રીન ઝબકારો
  let animId;

  // ૧. સ્પાર્ક કણ (Spark Particle)
  class Spark {
    constructor(x, y, color, vx, vy, gravity = 0.05, decay = 0.015, size = 2.5, isTwinkle = false) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.vx = vx;
      this.vy = vy;
      this.gravity = gravity;
      this.decay = decay;
      this.size = size;
      this.alpha = 1;
      this.isTwinkle = isTwinkle;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.isTwinkle ? (Math.random() > 0.3 ? this.alpha : 0.2) : this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= this.decay;
    }
  }

  // ૨. ઊડતું રોકેટ (Flying Rocket Entity)
  class RocketTrail {
    constructor(startX, startY, targetX, targetY, crackerType) {
      this.x = startX;
      this.y = startY;
      this.targetY = targetY;
      this.targetX = targetX;
      this.type = crackerType;
      this.speed = 14;
      this.dead = false;
    }

    update() {
      this.y -= this.speed;
      // પાછળ સોનેરી પૂંછડી છોડશે
      sparks.push(new Spark(this.x + (Math.random() - 0.5) * 4, this.y, '#f59e0b', (Math.random() - 0.5) * 2, 2, 0.1, 0.08, 2));

      if (this.y <= this.targetY) {
        this.dead = true;
        // ટોપ પર પહોંચીને છત્ર જેવો મોટો વિસ્ફોટ
        explodeAerialRocket(this.targetX, this.targetY, this.type);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
  }

  // ૩. સાપની ગોળીની રાખ (Snake Tablet Ash Particle)
  class SnakeAsh {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = -(Math.random() * 2 + 1);
      this.size = Math.random() * 8 + 4;
      this.alpha = 1;
      this.color = Math.random() > 0.5 ? '#1f2937' : '#374151';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy *= 0.98; // ધીમો થઈને જમીન પર જમા થશે
      this.alpha -= 0.003;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  // ૬૦ FPS માસ્ટર રેન્ડર લૂપ
  const renderLoop = () => {
    // કાળું આકાશ
    ctx.fillStyle = 'rgba(6, 2, 12, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // બોમ્બનો સફેદ ઝબકારો (Screen Flash Effect)
    if (screenFlash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${screenFlash})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      screenFlash -= 0.08;
    }

    // રોકેટ્સ અપડેટ
    for (let r = 0; r < rockets.length; r++) {
      rockets[r].update();
      rockets[r].draw();
      if (rockets[r].dead) {
        rockets.splice(r, 1);
        r--;
      }
    }

    // સાપ અપડેટ
    for (let s = 0; s < snakes.length; s++) {
      snakes[s].update();
      snakes[s].draw();
      if (snakes[s].alpha <= 0) {
        snakes.splice(s, 1);
        s--;
      }
    }

    // તણખા અપડેટ
    for (let i = 0; i < sparks.length; i++) {
      sparks[i].update();
      sparks[i].draw();
      if (sparks[i].alpha <= 0) {
        sparks.splice(i, 1);
        i--;
      }
    }

    animId = requestAnimationFrame(renderLoop);
  };
  renderLoop();

  // રોકેટનો આકાશી વિસ્ફોટ
  const explodeAerialRocket = (x, y, type) => {
    const rainbow = ['#ef4444', '#f59e0b', '#10b981', '#38bdf8', '#ec4899', '#facc15', '#a855f7'];
    for (let i = 0; i < 140; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = Math.random() * 8 + 2;
      sparks.push(new Spark(x, y, rainbow[i % rainbow.length], Math.cos(ang) * spd, Math.sin(ang) * spd, 0.04, 0.012, 3));
    }
  };

  // ચોક્કસ ફટાકડાનું અનન્ય લોજિક
  const executeUniqueCracker = (x, y, type) => {
    const gold = ['#f59e0b', '#fbbf24', '#fef08a', '#d97706'];

    if (type === 'sutli_bomb' || type === 'atom_bomb' || type === 'sound_cracker') {
      // ૧. સુતળી / એટમ બોમ્બ: આખી સ્ક્રીન સફેદ ઝબકારો મારશે
      screenFlash = 0.65;
      for (let i = 0; i < 150; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 14 + 5;
        sparks.push(new Spark(x, y, '#ef4444', Math.cos(ang) * spd, Math.sin(ang) * spd, 0.08, 0.02, 3.5));
      }
    } else if (type === 'rocket' || type === 'aerial_firework' || type === 'multi_effect') {
      // ૨. રોકેટ: નીચે જમીન પરથી ઉપર ઊડતું જશે
      rockets.push(new RocketTrail(x, canvas.height, x, y, type));
    } else if (type === 'chakri' || type === 'ground_spinner') {
      // ૩. ચકરી: ગોળ ફરતી રિંગ બનાવીને સ્પાઈરલ તણખા ફેંકશે
      for (let i = 0; i < 130; i++) {
        const ang = i * 0.25;
        const spd = (i / 130) * 8.5;
        sparks.push(new Spark(x, y, gold[i % gold.length], Math.cos(ang) * spd, Math.sin(ang) * spd, 0, 0.016, 2.5));
      }
    } else if (type === 'anar' || type === 'colourful_fountain' || type === 'pencil') {
      // ૪. અનાર / ફુવારો: સતત ઉપર ઊછળતો સોનેરી ફુવારો
      for (let i = 0; i < 160; i++) {
        const ang = -Math.PI / 2 + (Math.random() - 0.5) * 0.55;
        const spd = Math.random() * 14 + 6;
        sparks.push(new Spark(x, y, gold[i % gold.length], Math.cos(ang) * spd, Math.sin(ang) * spd, 0.15, 0.016, 2.5));
      }
    } else if (type === 'ladi') {
      // ૫. લડી: શ્રેણીબદ્ધ લાલ તડાકાઓની લાઈન
      for (let seq = 0; seq < 14; seq++) {
        setTimeout(() => {
          const offsetX = x + (Math.random() - 0.5) * 120;
          const offsetY = y + (seq * 15) - 80;
          for (let k = 0; k < 25; k++) {
            const ang = Math.random() * Math.PI * 2;
            const spd = Math.random() * 5 + 2;
            sparks.push(new Spark(offsetX, offsetY, '#ef4444', Math.cos(ang) * spd, Math.sin(ang) * spd, 0.04, 0.035, 2));
          }
        }, seq * 65);
      }
    } else if (type === 'snake_tablet') {
      // ૬. કાળો સાપ: જમીન પરથી ઊંચો થતો કાળો સર્પાકાર
      for (let i = 0; i < 90; i++) {
        setTimeout(() => {
          snakes.push(new SnakeAsh(x, y));
        }, i * 30);
      }
    } else if (type === 'twinkling_stars' || type === 'sparkler') {
      // ૭. ફૂલઝડી / ટ્વિંકલિંગ સ્ટાર્સ: ચમચમતા તારા જેવા ચમકારા
      for (let i = 0; i < 90; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 5 + 1;
        sparks.push(new Spark(x, y, '#ffffff', Math.cos(ang) * spd, Math.sin(ang) * spd, 0.01, 0.01, 2, true));
      }
    } else {
      // ૮. ગ્રીન ક્રેકર / અન્ય
      for (let i = 0; i < 90; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 9 + 3;
        sparks.push(new Spark(x, y, '#10b981', Math.cos(ang) * spd, Math.sin(ang) * spd, 0.04, 0.014, 2.8));
      }
    }
  };

  // ક્લિક હેન્ડલર: સાઉન્ડ વગાડવો અને આખા મોનિટર પર ફેલાવવું
  const handleStageClick = (e) => {
    // ઓરિજિનલ MP3 વગાડો
    playRealMP3Sound(crackerType);

    // ૧. મુખ્ય ક્લિક પોઈન્ટ પર ચોક્કસ ફટાકડો ચલાવો
    executeUniqueCracker(e.clientX, e.clientY, crackerType);

    // ૨. આખી સ્ક્રીન પર રેન્ડમલી ૭ થી ૮ જગ્યાએ પણ વિસ્ફોટ ફેલાવો
    const totalScatter = 7;
    for (let b = 1; b <= totalScatter; b++) {
      setTimeout(() => {
        const randX = Math.random() * (window.innerWidth - 120) + 60;
        const randY = Math.random() * (window.innerHeight - 150) + 80;
        executeUniqueCracker(randX, randY, crackerType);
      }, b * 80);
    }
  };

  canvas.addEventListener('click', handleStageClick);

  return () => {
    cancelAnimationFrame(animId);
    canvas.removeEventListener('click', handleStageClick);
    window.removeEventListener('resize', resizeScreen);
  };
}, [activeTab, crackerType]);

useEffect(() => {
  localStorage.setItem('diwali_wishes', JSON.stringify(wishes));
}, [wishes]);

  return (
    <main className="app-root theme-royal">
      {/* 1. HERO & COUNTDOWN HEADER */}
      <header className="hero-header">
        <div className="diya-badge">
          <span className="flame-icon">🪔</span>
          <span>Shubh Deepavali 2026</span>
        </div>
        <h1 className="main-title">Festival of Lights & Prosperity</h1>
        <p className="subtitle">
          Celebrate joy, spread blessings, and ignite virtual fireworks.
        </p>

        <div className="countdown-container">
          <div className="time-card">
            <span className="time-val">{timeLeft.days}</span>
            <span className="time-label">Days</span>
          </div>
          <div className="time-card">
            <span className="time-val">{timeLeft.hours}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-card">
            <span className="time-val">{timeLeft.minutes}</span>
            <span className="time-label">Mins</span>
          </div>
          <div className="time-card">
            <span className="time-val">{timeLeft.seconds}</span>
            <span className="time-label">Secs</span>
          </div>
        </div>
      </header>

      {/* 2. TAB CONTROLS */}
      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "card" ? "active" : ""}`}
          onClick={() => setActiveTab("card")}
        >
          🪔 Greeting Card
        </button>
        <button
          className={`tab-btn ${activeTab === "crackers" ? "active" : ""}`}
          onClick={() => setActiveTab("crackers")}
        >
          🎆 Crackers Zone
        </button>
        <button
          className={`tab-btn ${activeTab === "wall" ? "active" : ""}`}
          onClick={() => setActiveTab("wall")}
        >
          💌 Wishes Wall
        </button>
      </nav>

      {/* 3. MAIN INTERACTIVE CONTENT AREA */}
      <section className="content-section">
        {/* PANEL 1: PERSONALIZED GREETING GENERATOR */}
        {activeTab === "card" && (
          <div className="generator-panel">
            {/* Left: Input Form */}
            <div className="form-card">
              <h3>Custom Greeting Studio</h3>

              <div className="form-group">
                <label>Your Name (Sender)</label>
                <input
                  type="text"
                  placeholder="e.g. Mihir Patel"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Recipient's Name</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Color Theme</label>
                <select
                  defaultValue="royal"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="royal">Royal Gold & Purple</option>
                  <option value="crimson">Crimson Red & Marigold</option>
                  <option value="midnight">Midnight Sparkler</option>
                </select>
              </div>

              <div className="form-group">
                <label>Custom Blessing / Wish</label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="action-group">
                <button className="btn btn-whatsapp" onClick={shareToWhatsApp}>
                  Send to WhatsApp 💬
                </button>
                <button className="btn btn-copy" onClick={copyGreetingLink}>
                  {copied ? "Copied to Clipboard! ✅" : "Copy Greeting Link 🔗"}
                </button>
              </div>
            </div>

            {/* Right: Live Interactive Card */}
            <div className="preview-card-wrapper">
              <div className="card-ornament top-ornament">✦ ✦ ✦</div>
              <div className={`live-preview-card card-${theme}`}>
                <div className="diya-glow-container">
                  <div className="animated-diya">🪔</div>
                  <div className="sparkle-ring"></div>
                </div>

                <span className="festive-badge">✨ Happy Diwali 2026 ✨</span>
                <h2 className="card-receiver">{receiverName},</h2>
                <p className="card-message">"{message}"</p>
                <div className="card-signature">
                  <span className="signature-label">Warm Regards:</span>
                  <h4 className="card-sender">{senderName}</h4>
                </div>
              </div>
              <div className="card-ornament bottom-ornament">✦ ✦ ✦</div>
            </div>
          </div>
        )}

        {/* PANEL 2: VIRTUAL CRACKERS SIMULATOR (Static representation) */}
       {/* PANEL 2: FULL-SCREEN MULTI-BURST CRACKERS (20 TYPES) */}
        {activeTab === "crackers" && (
          <div className="fullscreen-cracker-wrapper">
            {/* આખી સ્ક્રીનનો કેનવાસ */}
            <canvas ref={canvasRef} className="fullscreen-canvas" />

            {/* ઉપર તરતી ૨૦ ફટાકડાની મેનુ પટ્ટી */}
            <div className="floating-cracker-bar">
              <h3>Select Firecracker ({CRACKER_OPTIONS.length} Types):</h3>
              <div className="cracker-scroll-list">
                {CRACKER_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    className={`cracker-chip ${crackerType === item.id ? "active" : ""}`}
                    onClick={() => setCrackerType(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <p className="hint">
                👆 Tap anywhere on screen to trigger multiple bursts!
              </p>
            </div>
          </div>
        )}

        {/* PANEL 3: COMMUNITY WISHES WALL */}
        {activeTab === "wall" && (
          <div className="wishes-wall">
            <div className="wall-header">
              <h3>Community Festive Wall</h3>
              <p>
                Leave your blessing for everyone celebrating around the world.
              </p>
            </div>

            {/* ૧. ઇનપુટ ફોર્મ (Two-way binding સાથે) */}
            <form className="add-wish-form" onSubmit={handleAddWish}>
              <input
                type="text"
                placeholder="Your Name"
                className="wall-input"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Write a warm festive wish..."
                className="wall-input flex-grow"
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
              />
              <button type="submit" className="btn btn-add">
                Post Wish 🪔
              </button>
            </form>

            {/* ૨. એરે મેપિંગ (.map) દ્વારા લાઈવ કાર્ડ્સ ડિસ્પ્લે */}
            <div className="wishes-grid">
              {wishes.map((item) => (
                <article key={item.id} className="wish-card">
                  <h4>{item.author}</h4>
                  <p>"{item.text}"</p>
                  <div className="wish-footer">
                    <button
                      type="button"
                      className="like-btn"
                      onClick={() => handleLikeWish(item.id)}
                    >
                      ❤️ {item.likes}
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDeleteWish(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. FOOTER */}
      <footer className="page-footer">
        <p>Crafted from scratch with JavaScript & React • Happy Diwali 2026</p>
      </footer>
    </main>
  );
}

export default App;