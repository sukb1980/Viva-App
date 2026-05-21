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
  ShoppingCart
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [listCount, setListCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  
  // Scratch Card States
  const [homeScratchRevealed, setHomeScratchRevealed] = useState(false);
  const [rewardsScratchRevealed, setRewardsScratchRevealed] = useState(false);
  
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 55 });
  
  // Modals & Drawers
  const [deepLinkPartner, setDeepLinkPartner] = useState(null);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  
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
        <div className="brand-title">
          VIVA <span className="brand-plus">Plus+</span>
        </div>
        
        <div className="location-badge" onClick={() => triggerToast("Location updated to Sharjah, Al Nahda 2")}>
          <MapPin size={12} />
          <span>Sharjah, Al Nahda 2</span>
        </div>

        <button className="profile-btn" onClick={() => triggerToast("Profile settings coming soon!")} aria-label="Profile">
          <User size={18} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="app-content">
        
        {/* TAB 1: HOME */}
        {currentTab === 'home' && (
          <div>
            {/* Promo Carousel */}
            <div className="hero-carousel">
              <div className="carousel-slide" onClick={() => setCurrentTab('leaflet')}>
                <span className="carousel-tag">Featured Offer</span>
                <h2 className="carousel-title">🔥 WEEKLY MEGA DEALS: Up to 40% off on fresh imported goods!</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button className="carousel-btn">
                    <span>Shop Leaflet</span>
                    <ArrowRight size={14} />
                  </button>
                  <span style={{ fontSize: '0.65rem', opacity: 0.9 }}>1 of 3</span>
                </div>
              </div>
              <div className="carousel-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
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

              <div className="voucher-dash-divider"></div>

              {/* Barcode representation */}
              <div className="barcode-wrapper">
                <div className="barcode-canvas">
                  <div className="barcode-line" style={{ width: '4px' }}></div>
                  <div className="barcode-line" style={{ width: '1px' }}></div>
                  <div className="barcode-line" style={{ width: '2px' }}></div>
                  <div className="barcode-line" style={{ width: '5px' }}></div>
                  <div className="barcode-line" style={{ width: '1px' }}></div>
                  <div className="barcode-line" style={{ width: '3px' }}></div>
                  <div className="barcode-line" style={{ width: '4px' }}></div>
                  <div className="barcode-line" style={{ width: '2px' }}></div>
                  <div className="barcode-line" style={{ width: '6px' }}></div>
                  <div className="barcode-line" style={{ width: '1px' }}></div>
                  <div className="barcode-line" style={{ width: '3px' }}></div>
                  <div className="barcode-line" style={{ width: '5px' }}></div>
                  <div className="barcode-line" style={{ width: '2px' }}></div>
                  <div className="barcode-line" style={{ width: '4px' }}></div>
                </div>
                <div className="barcode-num">VIVAPLUS-98317-2026</div>
              </div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center' }}>Present to the cashier at checkout screen</p>
            </div>

            {/* Gamified Scratch Card */}
            <div className="gamified-scratch">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800 }}>⚡ Scratch & Win Special Offer</h3>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Reveal your exclusive daily discount voucher below</p>
              
              <div className="scratch-canvas-container" onClick={() => setRewardsScratchRevealed(true)}>
                <div className={`scratch-silver-mask ${rewardsScratchRevealed ? 'scratch-active' : ''}`}>
                  <Sparkles size={24} style={{ color: 'white' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>Tap or Scratch Here</span>
                </div>

                <div className="scratch-revealed-content">
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}>🎉 15% OFF</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1A1A' }}>Fresh Bakery Items</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '4px' }}>Auto-added to your wallet!</div>
                </div>
              </div>

              <div className="scratch-instruction">
                {!rewardsScratchRevealed ? 'Tap to reveal rewards instantly' : 'Discount added to VIVA loyalty account!'}
              </div>
            </div>
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

      </main>

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

      {/* Sticky Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentTab('home')}
        >
          <Home size={20} />
          <span>Home</span>
          <span className="nav-indicator"></span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'leaflet' ? 'active' : ''}`}
          onClick={() => setCurrentTab('leaflet')}
        >
          <Tag size={20} />
          <span>Leaflet</span>
          <span className="nav-indicator"></span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'rewards' ? 'active' : ''}`}
          onClick={() => setCurrentTab('rewards')}
        >
          <Gift size={20} />
          <span>Rewards</span>
          <span className="nav-indicator"></span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'support' ? 'active' : ''}`}
          onClick={() => setCurrentTab('support')}
        >
          <MessageCircle size={20} />
          <span>Support</span>
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
    </div>
  );
}
