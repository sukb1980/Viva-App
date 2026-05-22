import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Tag,
  Gift,
  MessageCircle,
  MapPin,
  Sparkles,
  ShoppingBag,
  Percent,
  ChevronRight,
  Plus,
  Phone,
  HelpCircle,
  Send,
  ChevronDown,
  ChevronUp,
  Star,
  X,
  Bell,
  Clock,
  ArrowRight,
  User,
  CheckCircle,
  Search,
  ShoppingCart,
  Menu
} from 'lucide-react';

const CAROUSEL_SLIDES = [
  {
    id: 0,
    tag: 'Featured Offer',
    title: '🔥 WEEKLY MEGA DEALS: Up to 40% off on fresh imported goods!',
    btnText: 'Shop Leaflet',
    tab: 'leaflet',
    gradient: 'linear-gradient(135deg, var(--primary) 0%, #ff4b52 100%)'
  },
  {
    id: 1,
    tag: 'Gamification',
    title: '🎡 SPIN & WIN DAILY: Earn extra points and shopping vouchers!',
    btnText: 'Spin Now',
    tab: 'rewards',
    gradient: 'linear-gradient(135deg, #7B3FA0 0%, #E040FB 100%)'
  },
  {
    id: 2,
    tag: 'Store Finder',
    title: '📍 FIND NEAREST STORE: Timings, map directions & contact numbers!',
    btnText: 'Find Stores',
    tab: 'stores',
    gradient: 'linear-gradient(135deg, #1565C0 0%, #00d2ff 100%)'
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [listCount, setListCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Auto-rotate carousel slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, []);
  
  // Mobile drawer states
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Internal page sub-tabs
  const [aboutSubTab, setAboutSubTab] = useState('about-us');
  const [brandSubTab, setBrandSubTab] = useState('concept');
  const [selectedStore, setSelectedStore] = useState(0);
  
  // Scratch Card States
  const [homeScratchRevealed, setHomeScratchRevealed] = useState(false);
  const [rewardsScratchRevealed, setRewardsScratchRevealed] = useState(false);
  // Gamification: reward points and daily spin
  const WHEEL_SEGMENTS = [
    { label: '5 Pts',    points: 5,   color: '#F8F0FB', textColor: '#7B3FA0' },
    { label: 'AED 2',   points: 20,  color: '#FFF3E0', textColor: '#E65100', isVoucher: true },
    { label: '10 Pts',  points: 10,  color: '#E8F5E9', textColor: '#2E7D32' },
    { label: '30 Pts',  points: 30,  color: '#FFF8E1', textColor: '#F57F17' },
    { label: 'AED 5',   points: 50,  color: '#FCE4EC', textColor: '#C62828', isVoucher: true },
    { label: '15 Pts',  points: 15,  color: '#E3F2FD', textColor: '#1565C0' },
    { label: '25 Pts',  points: 25,  color: '#F3E5F5', textColor: '#6A1B9A' },
    { label: 'Try Again', points: 0, color: '#F5F5F5', textColor: '#9E9E9E' },
  ];
  const NUM_SEGMENTS = WHEEL_SEGMENTS.length;
  const SEGMENT_DEG = 360 / NUM_SEGMENTS;
  const [rewardPoints, setRewardPoints] = useState(0);
  const [lastSpinDate, setLastSpinDate] = useState('');
  const [showWheel, setShowWheel] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [wonSegment, setWonSegment] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const startSpin = () => {
    const today = new Date().toDateString();
    if (lastSpinDate === today) {
      triggerToast('You have already spun today. Come back tomorrow! 🌅');
      return;
    }
    // Pick a random winning segment index
    const winIdx = Math.floor(Math.random() * NUM_SEGMENTS);
    // The pointer is at the top (270° in standard coords).
    // We want segment winIdx to stop under the pointer.
    // Each segment starts at: winIdx * SEGMENT_DEG (from 0°)
    // Mid of that segment: winIdx * SEGMENT_DEG + SEGMENT_DEG/2
    // We need the wheel to rotate so that mid lands at the top.
    const targetAngle = 360 - (winIdx * SEGMENT_DEG + SEGMENT_DEG / 2);
    const totalAngle = 360 * 8 + targetAngle; // 8 full spins + landing angle
    setWonSegment(winIdx);
    setSpinAngle(totalAngle);
    setIsSpinning(true);
    setShowResult(false);
  };

  const onSpinEnd = () => {
    if (!isSpinning) return;
    setIsSpinning(false);
    const seg = WHEEL_SEGMENTS[wonSegment];
    if (seg.points > 0) {
      setRewardPoints(prev => prev + seg.points);
    }
    setLastSpinDate(new Date().toDateString());
    setShowResult(true);
  };

  const closeWheel = () => {
    setShowWheel(false);
    setShowResult(false);
    setIsSpinning(false);
    setSpinAngle(0);
  };
  
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 55 });
  
  // Modals & Drawers
  const [deepLinkPartner, setDeepLinkPartner] = useState(null);
  const [showChatDrawer, setShowChatDrawer] = useState(false);

  // Store Locator data
  const storesData = [
    {
      id: 0,
      name: "VIVA Grand Avenue Sharjah",
      address: "Grand Avenue Mall, Al Nasriya, Sharjah, UAE",
      timings: "08:00 AM - 01:00 AM daily",
      phone: "+971 6 567 1234",
      mapUrl: "https://maps.google.com/maps?q=VIVA%20Supermarket%20-%20Grand%20Avenue%20Sharjah&t=&z=13&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: 1,
      name: "VIVA Ajman 1",
      address: "Al Bustan Building, Sheikh Khalifa Bin Zayed St, Ajman, UAE",
      timings: "08:00 AM - 01:00 AM daily",
      phone: "+971 6 742 5678",
      mapUrl: "https://maps.google.com/maps?q=VIVA%20Supermarket%20-%20Ajman&t=&z=13&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: 2,
      name: "VIVA Hor Al Anz East",
      address: "Hor Al Anz East, Deira, Dubai, UAE",
      timings: "08:00 AM - 01:00 AM daily",
      phone: "+971 4 238 9876",
      mapUrl: "https://maps.google.com/maps?q=VIVA%20Supermarket%20-%20Hor%20Al%20Anz&t=&z=13&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: 3,
      name: "VIVA Al Nahda Sharjah",
      address: "Ground Floor, Al Nahda Tower, Al Nahda 2, Sharjah, UAE",
      timings: "07:00 AM - 12:00 Midnight daily",
      phone: "+971 6 534 4321",
      mapUrl: "https://maps.google.com/maps?q=VIVA%20Supermarket%20-%20Al%20Nahda%20Sharjah&t=&z=13&ie=UTF8&iwloc=&output=embed"
    }
  ];

  // Events/Openings Showcase data
  const eventsData = [
    {
      id: 1,
      title: "New Store Opening - Ajman Bustan",
      date: "May 15, 2026",
      desc: "Celebrating our new branch opening ceremony in Ajman with massive voucher discounts and full baskets!",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "VIVA Grand Avenue Anniversary",
      date: "April 28, 2026",
      desc: "Honoring 2 years of providing cheaper and fresher groceries to Sharjah Al Nasriya residents.",
      img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "VIVA Hor Al Anz Ribbon Cutting",
      date: "March 10, 2026",
      desc: "Welcoming hundreds of Deira residents with half-price deals on imported European cheese and chocolates.",
      img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&auto=format&fit=crop&q=60"
    }
  ];
  
  // WhatsApp Simulated Chat
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! Welcome to VIVA Support. How can we help you today?", sender: 'agent', time: '08:45 AM' }
  ]);
  const [typedMessage, setTypedMessage] = useState('');
  const chatEndRef = useRef(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, showChatDrawer]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const addToList = (itemName) => {
    setListCount(prev => prev + 1);
    triggerToast(`Added ${itemName} to shopping list!`);
  };

  const formatNumber = (num) => String(num).padStart(2, '0');

  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;
    
    const userMsg = {
      id: Date.now(),
      text: typedMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setTypedMessage('');
    
    // Simulate auto-agent response after 1s
    setTimeout(() => {
      const agentMsg = {
        id: Date.now() + 1,
        text: "Thank you for reaching out. A VIVA Plus+ Support Agent is looking into your query. We will assist you shortly!",
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, agentMsg]);
    }, 1200);
  };

  const startDeepLink = (partnerName) => {
    setDeepLinkPartner(partnerName);
    setTimeout(() => {
      setDeepLinkPartner(null);
      triggerToast(`Redirected successfully to ${partnerName} app!`);
    }, 3000);
  };

  const faqs = [
    {
      q: "How do I redeem my vouchers in-store?",
      a: "Simply head over to the 'Rewards' tab, click on your active voucher to display the barcode, and present it to the cashier at checkout. They will scan it directly from your phone screen."
    },
    {
      q: "Which delivery partners do you support?",
      a: "We are partnered with Talabat, Careem, and Deliveroo. You can order directly through deep-links on any shoppable leaflet item for immediate home delivery."
    },
    {
      q: "How does the Scratch & Win work?",
      a: "Every day, active VIVA Plus+ users get a mystery scratch card on their dashboard and premium rewards on the rewards screen. Just tap/swipe the gray coating to reveal discounts, cashback points, or free products!"
    },
    {
      q: "What are the timings of the Sharjah, Al Nahda 2 branch?",
      a: "Our Al Nahda 2 branch is open daily from 7:00 AM to 12:00 Midnight, including public holidays."
    }
  ];

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          <CheckCircle size={16} color="#4CAF50" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="hamburger-btn" 
            onClick={() => setShowMoreMenu(true)}
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>
          <div className="brand-title">
            VIVA <span className="brand-plus">Plus+</span>
          </div>
        </div>
        
        {/* Desktop Navigation Links */}
        <nav className="header-nav">
          <button 
            className={`header-nav-item ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentTab('home')}
          >
            Home
          </button>
          <button 
            className={`header-nav-item ${currentTab === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentTab('about')}
          >
            About VIVA
          </button>
          <button 
            className={`header-nav-item ${currentTab === 'leaflet' ? 'active' : ''}`}
            onClick={() => setCurrentTab('leaflet')}
          >
            Promotions
          </button>
          <button 
            className={`header-nav-item ${currentTab === 'brands' ? 'active' : ''}`}
            onClick={() => setCurrentTab('brands')}
          >
            Exclusive Brands
          </button>
          <button 
            className={`header-nav-item ${currentTab === 'stores' ? 'active' : ''}`}
            onClick={() => setCurrentTab('stores')}
          >
            Store Finder
          </button>
          <button 
            className={`header-nav-item ${currentTab === 'events' ? 'active' : ''}`}
            onClick={() => setCurrentTab('events')}
          >
            Events
          </button>
          <button 
            className={`header-nav-item ${currentTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setCurrentTab('rewards')}
          >
            Rewards
          </button>
          <button 
            className={`header-nav-item ${currentTab === 'support' ? 'active' : ''}`}
            onClick={() => setCurrentTab('support')}
          >
            Support
          </button>
        </nav>
        
        <div className="header-right">
          <div className="location-badge" onClick={() => triggerToast("Location updated to Sharjah, Al Nahda 2")}>
            <MapPin size={12} />
            <span>Sharjah, Al Nahda 2</span>
          </div>

          <button className="profile-btn" onClick={() => triggerToast("Profile settings coming soon!")} aria-label="Profile">
            <User size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="app-content">
        
        {/* TAB 1: HOME */}
        {currentTab === 'home' && (
          <div>
            {/* Promo Carousel */}
            <div className="hero-carousel">
              <div 
                className="carousel-slide" 
                onClick={() => {
                  setCurrentTab(CAROUSEL_SLIDES[activeSlide].tab);
                  setShowMoreMenu(false);
                }}
                style={{ 
                  background: CAROUSEL_SLIDES[activeSlide].gradient,
                  transition: 'background 0.5s ease-in-out'
                }}
              >
                <span className="carousel-tag">{CAROUSEL_SLIDES[activeSlide].tag}</span>
                <h2 className="carousel-title">{CAROUSEL_SLIDES[activeSlide].title}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button className="carousel-btn">
                    <span>{CAROUSEL_SLIDES[activeSlide].btnText}</span>
                    <ArrowRight size={14} />
                  </button>
                  <span style={{ fontSize: '0.65rem', opacity: 0.9 }}>{activeSlide + 1} of 3</span>
                </div>
              </div>
              <div className="carousel-dots">
                {CAROUSEL_SLIDES.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`dot ${activeSlide === idx ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide(idx);
                    }}
                    style={{ cursor: 'pointer' }}
                  ></span>
                ))}
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="quick-grid">
              <button className="quick-action-btn" onClick={() => triggerToast("Opening Store Finder map...")}>
                <div className="quick-icon-wrapper" style={{ backgroundColor: '#E3F2FD', color: '#1E88E5' }}>
                  <MapPin size={20} />
                </div>
                <span className="quick-label">Store Finder</span>
              </button>

              <button className="quick-action-btn" onClick={() => setCurrentTab('leaflet')}>
                <div className="quick-icon-wrapper" style={{ backgroundColor: '#FFF3E0', color: '#FB8C00' }}>
                  <Tag size={20} />
                </div>
                <span className="quick-label">Promo Leaflet</span>
              </button>

              <button className="quick-action-btn" onClick={() => setCurrentTab('rewards')}>
                <div className="quick-icon-wrapper" style={{ backgroundColor: '#E8F5E9', color: '#43A047' }}>
                  <Gift size={20} />
                </div>
                <span className="quick-label">My Coupons</span>
              </button>

              <button className="quick-action-btn" onClick={() => triggerToast("Opening Partner Delivery list...")}>
                <div className="quick-icon-wrapper" style={{ backgroundColor: '#F3E5F5', color: '#8E24AA' }}>
                  <ShoppingBag size={20} />
                </div>
                <span className="quick-label">Home Delivery</span>
              </button>
            </div>

            {/* Exclusive Savings Section */}
            <h3 className="section-title">Your Exclusive Savings</h3>
            <div className="savings-section">
              {/* Scratch Card A */}
              <div className="savings-card">
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#E31B23', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> MYSTERY GIFT
                </span>
                
                <div className="scratch-box" onClick={() => setHomeScratchRevealed(true)}>
                  {!homeScratchRevealed ? (
                    <div className="scratch-overlay">
                      <Gift size={20} />
                      <span>Tap to scratch</span>
                    </div>
                  ) : null}
                  <div className="scratch-reward">
                    <div className="scratch-reward-title">You Won!</div>
                    <div className="scratch-reward-value">AED 5 OFF</div>
                    <div style={{ fontSize: '0.55rem', color: '#666' }}>Fresh Veggies</div>
                  </div>
                </div>
              </div>

              {/* Countdown Card B */}
              <div className="savings-card">
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#E65100', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> EXPIRING SOON
                </span>
                
                <div className="countdown-box">
                  <div style={{ fontSize: '0.6rem', color: '#666', marginBottom: '4px' }}>Voucher: AED 10.00</div>
                  <div className="countdown-time">
                    {formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}m {formatNumber(timeLeft.seconds)}s
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentTab('rewards')}
                  style={{ background: 'none', border: 'none', color: '#E31B23', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  View Coupon &rarr;
                </button>
              </div>
            </div>

            {/* Hot Trending Items */}
            <div className="section-title">
              <span>🔥 Hot Deals Today</span>
              <span className="section-link" onClick={() => setCurrentTab('leaflet')}>See All</span>
            </div>

            <div className="trending-grid">
              {/* Product 1 */}
              <div className="product-card-vertical" onClick={() => setCurrentTab('leaflet')}>
                <div className="prod-img-wrapper">
                  <span className="tag-badge">-24%</span>
                  <span className="flag-badge">🇮🇹 Italy</span>
                  <img src="https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=150&auto=format&fit=crop&q=60" alt="Amica Kettle Chips" className="prod-img" onError={(e) => {
                    e.target.src = "https://placehold.co/120x90/FFF0F1/CE1126?text=Amica+Chips";
                  }} />
                </div>
                <div className="prod-title">Amica Kettle Chips BBQ 130g</div>
                <div className="prod-meta">
                  <Star size={10} fill="#FFB300" color="#FFB300" />
                  <span>4.8 (85 ratings)</span>
                </div>
                <div className="prod-price-row">
                  <div className="price-box">
                    <span className="price-now">AED 7.99</span>
                    <span className="price-old">AED 10.50</span>
                  </div>
                  <button 
                    className="add-list-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToList("Amica Kettle Chips");
                    }}
                    aria-label="Add to List"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Product 2 */}
              <div className="product-card-vertical" onClick={() => setCurrentTab('leaflet')}>
                <div className="prod-img-wrapper">
                  <span className="tag-badge">-30%</span>
                  <span className="flag-badge">🇪🇸 Spain</span>
                  <img src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&auto=format&fit=crop&q=60" alt="Olive Oil" className="prod-img" onError={(e) => {
                    e.target.src = "https://placehold.co/120x90/FFF0F1/CE1126?text=Olive+Oil";
                  }} />
                </div>
                <div className="prod-title">Coosur Extra Virgin Olive Oil 1L</div>
                <div className="prod-meta">
                  <Star size={10} fill="#FFB300" color="#FFB300" />
                  <span>4.9 (120 ratings)</span>
                </div>
                <div className="prod-price-row">
                  <div className="price-box">
                    <span className="price-now">AED 24.50</span>
                    <span className="price-old">AED 35.00</span>
                  </div>
                  <button 
                    className="add-list-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToList("Coosur Extra Virgin Olive Oil");
                    }}
                    aria-label="Add to List"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEAFLET DETAIL */}
        {currentTab === 'leaflet' && (
          <div className="leaflet-detail">
            <div className="product-detail-card">
              
              <div className="detail-img-container">
                <img 
                  src="https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=60" 
                  alt="Amica Kettle Chips BBQ 130g" 
                  className="detail-img"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/250x180/FFF0F1/CE1126?text=Amica+Chips+BBQ";
                  }}
                />
              </div>

              <div className="badge-group">
                <span className="badge-pill import">🇮🇹 Imported from Italy</span>
                <span className="badge-pill save">Save 24%</span>
                <span className="badge-pill rating">
                  <Star size={10} fill="#F57F17" color="#F57F17" /> 4.8
                </span>
              </div>

              <h2 className="detail-title">Amica Kettle Chips BBQ 130g</h2>
              <p className="detail-desc">
                Crispy, premium hand-cooked kettle chips loaded with sweet and smoky Italian BBQ spices. Perfectly packed to preserve freshness.
              </p>

              <div className="detail-price-box">
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary)' }}>AED 7.99</span>
                <span style={{ fontSize: '1.05rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>AED 10.50</span>
              </div>

              {/* Instant Delivery Partners Section */}
              <div className="partner-section-title">
                <Sparkles size={14} color="var(--primary)" />
                <span>⚡ Order Now via Delivery Partners</span>
              </div>

              <div className="partner-buttons">
                <button className="partner-btn talabat" onClick={() => startDeepLink('Talabat')}>
                  <div className="partner-info">
                    <span className="partner-logo-box">🟧</span>
                    <div>
                      <div>Talabat Delivery</div>
                      <div className="partner-tagline">Deliver in 20-30 mins</div>
                    </div>
                  </div>
                  <ChevronRight size={18} />
                </button>

                <button className="partner-btn careem" onClick={() => startDeepLink('Careem')}>
                  <div className="partner-info">
                    <span className="partner-logo-box">🟩</span>
                    <div>
                      <div>Careem Grocery</div>
                      <div className="partner-tagline">Save on delivery fees</div>
                    </div>
                  </div>
                  <ChevronRight size={18} />
                </button>

                <button className="partner-btn deliveroo" onClick={() => startDeepLink('Deliveroo')}>
                  <div className="partner-info">
                    <span className="partner-logo-box">🟪</span>
                    <div>
                      <div>Deliveroo Express</div>
                      <div className="partner-tagline">Premium tracking enabled</div>
                    </div>
                  </div>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Secondary Utilities */}
              <div className="utility-buttons">
                <button className="btn-secondary-action" onClick={() => addToList("Amica Kettle Chips BBQ")}>
                  <Plus size={16} />
                  <span>Add to In-Store Shopping List</span>
                </button>

                <button 
                  className="btn-secondary-action" 
                  onClick={() => triggerToast("Downloading Weekly Leaflet PDF Booklet...")}
                  style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd', color: 'var(--text-main)', fontWeight: '600' }}
                >
                  📥 Download Booklet PDF
                </button>

                <div className="aisle-locator">
                  <MapPin size={16} />
                  <span>Find in Aisle 4 - Al Nahda Branch</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: REWARDS PAGE */}
        {currentTab === 'rewards' && (
          <div className="rewards-container">
            {/* Savings Tracker */}
            <div className="savings-tracker">
              <div>
                <div className="tracker-label">Total Saved This Month</div>
                <div className="tracker-value">AED 142.50</div>
              </div>
              <div className="tracker-savings-pill">
                <Percent size={12} />
                <span>Super Saver Level</span>
              </div>
            </div>

            {/* Active Coupon Card */}
            <div className="voucher-card">
              <div className="voucher-header">
                <div>
                  <span className="voucher-badge">Active Reward</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '6px' }}>May Shopping Voucher</h3>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Valid until 31/05/2026</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)' }}>AED 10.00</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#E65100' }}>Expiring soon!</div>
                </div>
              </div>
              <div className="voucher-dash-divider" />
              {/* Barcode representation */}
              <div className="barcode-wrapper">
                <div 
                  className="barcode-canvas" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'stretch', 
                    gap: 0, 
                    padding: '6px 20px', 
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0',
                    width: 'auto',
                    height: '60px',
                    boxSizing: 'border-box'
                  }}
                >
                  {[
                    2, -2, 1, -4, 3, -2, 1, -2, 2, -6, 4, -2, 1, -4, 2, -2, 3, -4, 1, -2, 2, -2, 4, -4, 1, -2, 3, -2, 2, -6, 1, -2, 2, -2, 3, -4, 1, -2, 2
                  ].map((val, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: `${Math.abs(val) * 1.5}px`,
                        backgroundColor: val > 0 ? '#000' : 'transparent',
                        height: '100%'
                      }}
                    />
                  ))}
                </div>
                <div className="barcode-num">VIVAPLUS-98317-2026</div>
              </div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Present to the cashier at checkout screen
              </p>
            </div>

            {/* Gamified Scratch Card */}
            <div className="gamified-scratch">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800 }}>⚡ Scratch &amp; Win Special Offer</h3>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Reveal your exclusive daily discount voucher below
              </p>
              <div className="scratch-canvas-container" onClick={() => setRewardsScratchRevealed(true)}>
                <div className={`scratch-silver-mask ${rewardsScratchRevealed ? 'scratch-active' : ''}`}>
                  <Sparkles size={24} style={{ color: 'white' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>Tap or Scratch Here</span>
                </div>
                <div className="scratch-revealed-content">
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}>🎉 15% OFF</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1A1A' }}>Fresh Bakery Items</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Auto-added to your wallet!
                  </div>
                </div>
                <div className="scratch-instruction">
                  {!rewardsScratchRevealed ? 'Tap to reveal rewards instantly' : 'Discount added to VIVA loyalty account!'}
                </div>
              </div>
            </div>

            {/* Gamification Panel */}
            <div className="gamification-panel">
              <div className="gamification-header">
                <div className="gamification-points-badge">
                  <span className="gamification-points-num">{rewardPoints}</span>
                  <span className="gamification-points-label">Points</span>
                </div>
                <div className="gamification-info">
                  <h3 className="panel-title">🎡 Spin &amp; Win!</h3>
                  <p className="gamification-sub">Spin daily for bonus points &amp; vouchers</p>
                </div>
              </div>
              <button
                className={`spin-trigger-btn ${lastSpinDate === new Date().toDateString() ? 'spin-trigger-btn--used' : ''}`}
                onClick={() => { setShowWheel(true); }}
              >
                {lastSpinDate === new Date().toDateString() ? '✅ Spun Today — Come Back Tomorrow!' : '🎡 Spin the Wheel Now'}
              </button>
            </div>

            {/* Wheel Modal */}
            {showWheel && (
              <div className="spin-wheel-backdrop" onClick={!isSpinning ? closeWheel : undefined}>
                <div className="spin-wheel-modal" onClick={e => e.stopPropagation()}>
                  {/* Close btn */}
                  {!isSpinning && (
                    <button className="spin-close-btn" onClick={closeWheel}>✕</button>
                  )}

                  <p className="spin-modal-title">🎰 Spin &amp; Win</p>

                  {/* Wheel container with pointer */}
                  <div className="wheel-outer-wrapper">
                    {/* Pointer / needle at top */}
                    <div className="wheel-pointer">▼</div>

                    {/* The spinning wheel drawn via SVG segments */}
                    <div
                      className="wheel-disc"
                      style={{
                        transform: `rotate(${spinAngle}deg)`,
                        transition: isSpinning ? 'transform 5s cubic-bezier(0.17,0.67,0.12,1)' : 'none'
                      }}
                      onTransitionEnd={onSpinEnd}
                    >
                      <svg viewBox="0 0 200 200" width="220" height="220">
                        {WHEEL_SEGMENTS.map((seg, idx) => {
                          const startAngle = (idx * SEGMENT_DEG - 90) * (Math.PI / 180);
                          const endAngle = ((idx + 1) * SEGMENT_DEG - 90) * (Math.PI / 180);
                          const x1 = 100 + 100 * Math.cos(startAngle);
                          const y1 = 100 + 100 * Math.sin(startAngle);
                          const x2 = 100 + 100 * Math.cos(endAngle);
                          const y2 = 100 + 100 * Math.sin(endAngle);
                          const midAngle = ((idx + 0.5) * SEGMENT_DEG - 90) * (Math.PI / 180);
                          const tx = 100 + 62 * Math.cos(midAngle);
                          const ty = 100 + 62 * Math.sin(midAngle);
                          const textRot = (idx + 0.5) * SEGMENT_DEG;
                          return (
                            <g key={idx}>
                              <path
                                d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`}
                                fill={seg.color}
                                stroke="white"
                                strokeWidth="1.5"
                              />
                              <text
                                x={tx}
                                y={ty}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="9"
                                fontWeight="700"
                                fill={seg.textColor}
                                transform={`rotate(${textRot}, ${tx}, ${ty})`}
                              >
                                {seg.label}
                              </text>
                            </g>
                          );
                        })}
                        {/* Center hub */}
                        <circle cx="100" cy="100" r="14" fill="white" stroke="#ddd" strokeWidth="2" />
                        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="12">🎁</text>
                      </svg>
                    </div>
                  </div>

                  {/* Spin button inside modal */}
                  {!isSpinning && !showResult && (
                    <button className="spin-go-btn" onClick={startSpin}>
                      TAP TO SPIN!
                    </button>
                  )}

                  {isSpinning && (
                    <p className="spin-status-text">✨ Spinning… good luck!</p>
                  )}

                  {/* Result reveal */}
                  {showResult && wonSegment !== null && (
                    <div className="spin-result-card">
                      {WHEEL_SEGMENTS[wonSegment].points > 0 ? (
                        <>
                          <div className="spin-result-emoji">🎉</div>
                          <div className="spin-result-headline">
                            {WHEEL_SEGMENTS[wonSegment].isVoucher
                              ? `You won a ${WHEEL_SEGMENTS[wonSegment].label} Voucher!`
                              : `You won ${WHEEL_SEGMENTS[wonSegment].points} Points!`}
                          </div>
                          <div className="spin-result-sub">Credited to your VIVA loyalty account</div>
                        </>
                      ) : (
                        <>
                          <div className="spin-result-emoji">😅</div>
                          <div className="spin-result-headline">Better luck tomorrow!</div>
                          <div className="spin-result-sub">Come back daily for another spin</div>
                        </>
                      )}
                      <button className="spin-result-close" onClick={closeWheel}>Collect &amp; Close</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CUSTOMER SUPPORT HUB */}
        {currentTab === 'support' && (
          <div className="support-container">
            {/* Notifications Feed */}
            <div className="notification-feed">
              <div className="notification-header">
                <Bell size={12} color="var(--primary)" />
                <span>Local Notifications</span>
              </div>
              <div className="notification-item">
                <span>🔔</span>
                <div>
                  <strong>Branch Update:</strong> Your local branch (Al Nahda 2) just restocked Fresh Hot Smoked Trout Filets! <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>(2h ago)</span>
                </div>
              </div>
            </div>

            {/* Communication Channels */}
            <div className="channels-section">
              <div className="channels-title">Contact Channels</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Whatsapp channel */}
                <button className="channel-btn" onClick={() => setShowChatDrawer(true)}>
                  <div className="channel-info">
                    <div className="channel-icon-box" style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                      <MessageCircle size={18} />
                    </div>
                    <span>Chat Live via WhatsApp</span>
                  </div>
                  <span className="channel-action">Open Chat</span>
                </button>

                {/* Call Support */}
                <a href="tel:80084824357" className="channel-btn" style={{ textDecoration: 'none' }} onClick={() => triggerToast("Initiating phone call to VIVA Help...")}>
                  <div className="channel-info">
                    <div className="channel-icon-box" style={{ backgroundColor: '#E3F2FD', color: '#1565C0' }}>
                      <Phone size={18} />
                    </div>
                    <span>Call Customer Care</span>
                  </div>
                  <span className="channel-action">800-VIVA-HELP</span>
                </a>
              </div>
            </div>

            {/* FAQ Accordion Matrix */}
            <div>
              <div className="channels-title">View FAQ Matrix</div>
              <div className="faq-list">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="faq-item">
                      <button 
                        className="faq-question" 
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {isOpen && (
                        <div className="faq-answer">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ABOUT VIVA */}
        {currentTab === 'about' && (
          <div className="tabbed-page-container">
            <div className="tabbed-sidebar">
              <button 
                className={`sidebar-tab-btn ${aboutSubTab === 'about-us' ? 'active' : ''}`}
                onClick={() => setAboutSubTab('about-us')}
              >
                About Us
              </button>
              <button 
                className={`sidebar-tab-btn ${aboutSubTab === 'vision' ? 'active' : ''}`}
                onClick={() => setAboutSubTab('vision')}
              >
                Our Vision & Mission
              </button>
              <button 
                className={`sidebar-tab-btn ${aboutSubTab === 'promise' ? 'active' : ''}`}
                onClick={() => setAboutSubTab('promise')}
              >
                Brand Promise
              </button>
            </div>

            <div className="tabbed-content-panel">
              {aboutSubTab === 'about-us' && (
                <div>
                  <h2 className="panel-title">About VIVA</h2>
                  <div className="panel-underline"></div>
                  <p className="panel-text">
                    VIVA is the UAE’s first food discounter, offering high-quality food and non-food products at investor-defying prices. Launched in 2018 under the Landmark Group umbrella, VIVA has grown to operate more than 100+ stores across the United Arab Emirates.
                  </p>
                  <p className="panel-text">
                    We operate on a discount supermarket model, which means direct sourcing, highly optimized logistics, and passing 100% of these operational savings straight to our shoppers.
                  </p>
                  <div className="highlight-box">
                    <h3>Fresher. Cheaper. Better.</h3>
                    <p>Everyday low prices, fresh local produce, and unique European brands delivered straight to your local neighborhood.</p>
                  </div>
                </div>
              )}

              {aboutSubTab === 'vision' && (
                <div>
                  <h2 className="panel-title">Our Vision & Mission</h2>
                  <div className="panel-underline"></div>
                  <div className="vision-card">
                    <h3>Our Vision</h3>
                    <p>To be the leading and most trusted discount supermarket chain in the region, enriching lives by offering high quality products at unbeatable prices.</p>
                  </div>
                  <div className="vision-card">
                    <h3>Our Mission</h3>
                    <p>To build lifetime customer loyalty by continuously offering a curated assortment of fresh, premium-quality products at prices that are at least 30% cheaper than traditional retailers, backed by an efficient supply chain.</p>
                  </div>
                </div>
              )}

              {aboutSubTab === 'promise' && (
                <div>
                  <h2 className="panel-title">Brand Promise</h2>
                  <div className="panel-underline"></div>
                  <p className="panel-text">
                    Our promise to you is built on three foundational pillars: <strong>Fresher, Cheaper, Better</strong>. We maintain these standards through a series of supply chain check-gates:
                  </p>
                  <ul className="promise-list">
                    <li>
                      <strong>Direct Sourcing:</strong> By cutting out middlemen and sourcing directly from top-tier European and regional manufacturers, we secure deep wholesale discounts.
                    </li>
                    <li>
                      <strong>Rigorous Quality Control:</strong> Every batch of fresh fruit, vegetables, and private label items is inspected daily by our Quality Assurance teams.
                    </li>
                    <li>
                      <strong>Smart Assortment:</strong> We stock exactly what you need without unnecessary display costs, ensuring ultra-fast turnover and maximum freshness.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: EXCLUSIVE BRANDS */}
        {currentTab === 'brands' && (
          <div className="tabbed-page-container">
            <div className="tabbed-sidebar">
              <button 
                className={`sidebar-tab-btn ${brandSubTab === 'concept' ? 'active' : ''}`}
                onClick={() => setBrandSubTab('concept')}
              >
                Exclusive Private Brands
              </button>
              <button 
                className={`sidebar-tab-btn ${brandSubTab === 'standards' ? 'active' : ''}`}
                onClick={() => setBrandSubTab('standards')}
              >
                Quality Standards
              </button>
              <button 
                className={`sidebar-tab-btn ${brandSubTab === 'safety' ? 'active' : ''}`}
                onClick={() => setBrandSubTab('safety')}
              >
                Food Safety
              </button>
            </div>

            <div className="tabbed-content-panel">
              {brandSubTab === 'concept' && (
                <div>
                  <h2 className="panel-title">VIVA Exclusive Private Brands</h2>
                  <div className="panel-underline"></div>
                  <p className="panel-text">
                    VIVA private labels are unique brands developed in partnership with leading global manufacturers. By controlling production, design, and distribution, we guarantee products of equal or superior quality to international household brands but at prices that are at least <strong>30% cheaper</strong>.
                  </p>
                  <div className="brand-metrics-grid">
                    <div className="metric-box">
                      <span className="metric-num">30%+</span>
                      <span className="metric-label">Cheaper than competitors</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-num">80%</span>
                      <span className="metric-label">Direct Import Share</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-num">100%</span>
                      <span className="metric-label">Satisfaction Guaranteed</span>
                    </div>
                  </div>
                  <p className="panel-text" style={{ marginTop: '16px' }}>
                    From European chocolates to fresh milk and cleaning detergents, our exclusive brands provide premium choices for every basket.
                  </p>
                </div>
              )}

              {brandSubTab === 'standards' && (
                <div>
                  <h2 className="panel-title">Quality Assurance Standards</h2>
                  <div className="panel-underline"></div>
                  <p className="panel-text">
                    We hold our manufacturers to the highest international food standard certification requirements (including BRC, IFS, and ISO 22000). 
                  </p>
                  <div className="standards-steps">
                    <div className="step-item">
                      <span className="step-badge">1</span>
                      <div>
                        <h4>Strict Supplier Auditing</h4>
                        <p>We audit our factories regularly to ensure absolute sanitary compliance and ingredient integrity.</p>
                      </div>
                    </div>
                    <div className="step-item">
                      <span className="step-badge">2</span>
                      <div>
                        <h4>VIVA Test Kitchen</h4>
                        <p>Our culinary specialists test every batch for taste, consistency, texture, and nutritional value before approving store release.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {brandSubTab === 'safety' && (
                <div>
                  <h2 className="panel-title">Food Safety & Compliance</h2>
                  <div className="panel-underline"></div>
                  <p className="panel-text">
                    VIVA is committed to absolute compliance with UAE Municipality Health and Food Safety directives.
                  </p>
                  <div className="safety-grid">
                    <div className="safety-card">
                      <h4>Cold Chain Maintenance</h4>
                      <p>State-of-the-art refrigerated vehicles and in-store cold cases ensure temperature is logged automatically 24/7.</p>
                    </div>
                    <div className="safety-card">
                      <h4>Clear Labeling & Tracing</h4>
                      <p>Batch tracking system allows us to pinpoint origins immediately, providing full traceability from farm to checkout.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: INTERACTIVE STORE FINDER */}
        {currentTab === 'stores' && (
          <div className="stores-view-container">
            <div className="store-sidebar">
              <h3 className="sidebar-header-title">Our Branches</h3>
              <div className="store-list-scroll">
                {storesData.map((store, index) => (
                  <div 
                    key={store.id} 
                    className={`store-list-item ${selectedStore === index ? 'active' : ''}`}
                    onClick={() => setSelectedStore(index)}
                  >
                    <h4>{store.name}</h4>
                    <p className="store-short-address">{store.address.split(',')[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="store-details-panel">
              <div className="store-info-header">
                <h2>{storesData[selectedStore].name}</h2>
                <div className="store-detail-row">
                  <MapPin size={16} color="var(--primary)" />
                  <span>{storesData[selectedStore].address}</span>
                </div>
                <div className="store-detail-row">
                  <Clock size={16} color="#FB8C00" />
                  <span>{storesData[selectedStore].timings}</span>
                </div>
                <div className="store-detail-row">
                  <Phone size={16} color="#4CAF50" />
                  <span>{storesData[selectedStore].phone}</span>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storesData[selectedStore].name)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="get-directions-btn"
                >
                  Get Directions
                </a>
              </div>

              <div className="store-map-wrapper">
                <iframe 
                  title={`Map of ${storesData[selectedStore].name}`}
                  src={storesData[selectedStore].mapUrl} 
                  className="store-map-iframe"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: EVENTS / OPENINGS SHOWCASE */}
        {currentTab === 'events' && (
          <div className="events-gallery-container">
            <div className="events-intro-header">
              <h2>Spreading Our Roots All Over UAE</h2>
              <p>Take a look at our latest store grand opening ceremonies, spreading everyday savings to more neighborhoods.</p>
            </div>

            <div className="events-grid-layout">
              {eventsData.map(event => (
                <div key={event.id} className="event-gallery-card">
                  <div className="event-card-img-container">
                    <img src={event.img} alt={event.title} className="event-card-img" />
                    <span className="event-date-badge">{event.date}</span>
                  </div>
                  <div className="event-card-body">
                    <h3>{event.title}</h3>
                    <p>{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


      {/* WhatsApp Chat Drawer */}
      {showChatDrawer && (
        <div className="drawer-backdrop" onClick={() => setShowChatDrawer(false)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={18} color="#075E54" />
                <span className="drawer-title">WhatsApp Live Support</span>
              </div>
              <button className="drawer-close" onClick={() => setShowChatDrawer(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="chat-window">
              <div className="chat-header">
                <div className="chat-avatar">💬</div>
                <div>
                  <div>VIVA Customer Support</div>
                  <div style={{ fontSize: '0.55rem', opacity: 0.8, fontWeight: 400 }}>Online | Fast Response</div>
                </div>
              </div>

              <div className="chat-messages">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                    <div>{msg.text}</div>
                    <div className="chat-time">{msg.time}</div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-bar">
                <input 
                  type="text" 
                  className="chat-input" 
                  placeholder="Type a message..." 
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button className="chat-send" onClick={handleSendMessage}>
                  <Send size={12} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
              Simulated Chat Environment for VIVA Plus+ Demo
            </div>
          </div>
        </div>
      )}

      {/* Deep Link Simulation Modal */}
      {deepLinkPartner && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-icon-bounce" style={{ 
              backgroundColor: deepLinkPartner === 'Talabat' ? '#FFEBE0' : deepLinkPartner === 'Careem' ? '#E8F5E9' : '#E0F7F4'
            }}>
              <span style={{ fontSize: '2rem' }}>
                {deepLinkPartner === 'Talabat' ? '🟧' : deepLinkPartner === 'Careem' ? '🟩' : '🟪'}
              </span>
            </div>
            <h3 className="modal-title">Handoff to {deepLinkPartner}</h3>
            <p className="modal-desc">
              We are initiating a secure deep-link connection to add <strong>Amica Kettle Chips BBQ 130g</strong> directly into your {deepLinkPartner} cart...
            </p>
            <div className="spinner"></div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '12px' }}>
              Connecting to Partner API Gateway
            </div>
          </div>
        </div>
      )}

      </div>

      {/* Sticky Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => { setCurrentTab('home'); setShowMoreMenu(false); }}
        >
          <Home size={20} />
          <span>Home</span>
          <span className="nav-indicator"></span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'leaflet' ? 'active' : ''}`}
          onClick={() => { setCurrentTab('leaflet'); setShowMoreMenu(false); }}
        >
          <Tag size={20} />
          <span>Leaflet</span>
          <span className="nav-indicator"></span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'stores' ? 'active' : ''}`}
          onClick={() => { setCurrentTab('stores'); setShowMoreMenu(false); }}
        >
          <MapPin size={20} />
          <span>Stores</span>
          <span className="nav-indicator"></span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'rewards' ? 'active' : ''}`}
          onClick={() => { setCurrentTab('rewards'); setShowMoreMenu(false); }}
        >
          <Gift size={20} />
          <span>Rewards</span>
          <span className="nav-indicator"></span>
        </button>

        <button 
          className={`nav-item ${showMoreMenu ? 'active' : ''}`}
          onClick={() => setShowMoreMenu(prev => !prev)}
        >
          <Sparkles size={20} />
          <span>More</span>
          <span className="nav-indicator"></span>
        </button>

        {/* Global List Item Counter Float Indicator */}
        {listCount > 0 && (
          <div 
            onClick={() => triggerToast(`My Shopping List contains ${listCount} items`)}
            style={{
              position: 'absolute',
              top: '-15px',
              right: '25px',
              backgroundColor: '#1A1A1A',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              border: '1.5px solid white'
            }}
          >
            <ShoppingCart size={12} color="var(--primary)" />
            <span>List: {listCount}</span>
          </div>
        )}
      </nav>

      {/* Mobile More Menu Bottom Drawer */}
      {showMoreMenu && (
        <div className="drawer-backdrop show" onClick={() => setShowMoreMenu(false)} style={{ zIndex: 9999 }}>
          <div className="drawer-content show bottom-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="drawer-title" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700' }}>Explore VIVA</span>
              <button className="drawer-close" onClick={() => setShowMoreMenu(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="mobile-more-links-grid">
              <button 
                className={`more-grid-link ${currentTab === 'home' ? 'active' : ''}`}
                onClick={() => { setCurrentTab('home'); setShowMoreMenu(false); }}
              >
                <span className="more-link-icon">🏠</span>
                <span className="more-link-label">Home</span>
              </button>

              <button 
                className={`more-grid-link ${currentTab === 'leaflet' ? 'active' : ''}`}
                onClick={() => { setCurrentTab('leaflet'); setShowMoreMenu(false); }}
              >
                <span className="more-link-icon">🏷️</span>
                <span className="more-link-label">Promotions</span>
              </button>

              <button 
                className={`more-grid-link ${currentTab === 'stores' ? 'active' : ''}`}
                onClick={() => { setCurrentTab('stores'); setShowMoreMenu(false); }}
              >
                <span className="more-link-icon">📍</span>
                <span className="more-link-label">Store Finder</span>
              </button>

              <button 
                className={`more-grid-link ${currentTab === 'rewards' ? 'active' : ''}`}
                onClick={() => { setCurrentTab('rewards'); setShowMoreMenu(false); }}
              >
                <span className="more-link-icon">🎁</span>
                <span className="more-link-label">Rewards</span>
              </button>

              <button 
                className={`more-grid-link ${currentTab === 'about' ? 'active' : ''}`}
                onClick={() => { setCurrentTab('about'); setShowMoreMenu(false); }}
              >
                <span className="more-link-icon">🏢</span>
                <span className="more-link-label">About VIVA</span>
              </button>

              <button 
                className={`more-grid-link ${currentTab === 'brands' ? 'active' : ''}`}
                onClick={() => { setCurrentTab('brands'); setShowMoreMenu(false); }}
              >
                <span className="more-link-icon">🛍️</span>
                <span className="more-link-label">Exclusive Brands</span>
              </button>

              <button 
                className={`more-grid-link ${currentTab === 'events' ? 'active' : ''}`}
                onClick={() => { setCurrentTab('events'); setShowMoreMenu(false); }}
              >
                <span className="more-link-icon">📸</span>
                <span className="more-link-label">Events & Openings</span>
              </button>

              <button 
                className={`more-grid-link ${currentTab === 'support' ? 'active' : ''}`}
                onClick={() => { setCurrentTab('support'); setShowMoreMenu(false); }}
              >
                <span className="more-link-icon">💬</span>
                <span className="more-link-label">Customer Support</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
