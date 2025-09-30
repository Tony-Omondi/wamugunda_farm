// components/Header.tsx
import { useState, useEffect } from 'react';
import React from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Theme detection
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Scroll detection
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme', !isDarkMode ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: 'home', label: 'Home', type: 'scroll' },
    { id: 'shop', label: 'Shop', type: 'link', path: '/shop' },
    { id: 'gallery', label: 'Gallery', type: 'scroll' },
    { id: 'testimonials', label: 'Testimonials', type: 'scroll' },
    { id: 'about-mission', label: 'About', type: 'scroll' }
  ];

  const handleNavigation = (item: any) => {
    if (item.type === 'scroll') {
      scrollToSection(item.id);
    } else if (item.type === 'link') {
      window.location.href = item.path;
      setIsMobileMenuOpen(false);
    }
  };

  // Mock cart items count - in a real app, this would come from a global state
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        borderBottom: isScrolled ? '1px solid rgba(34, 139, 34, 0.1)' : '1px solid transparent',
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none'
      }}>
        <div className="container d-flex align-items-center justify-content-between px-4 py-3" style={{ maxWidth: '1140px' }}>
          {/* Logo */}
          <div 
            className="d-flex align-items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
            style={{ 
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              animation: 'slideDown 0.6s ease-out'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)'
            }}>
              <span style={{ fontSize: '1.25rem', color: 'white' }}>🌱</span>
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '800', 
                color: '#2F4F4F',
                margin: 0,
                lineHeight: '1.2'
              }}>
                Wamugunda Farm
              </h2>
              <p style={{ 
                fontSize: '0.7rem', 
                color: '#228B22', 
                fontWeight: '600',
                margin: 0,
                opacity: 0.8
              }}>
                From Soil to Soul
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="d-none d-lg-flex align-items-center gap-1">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '600', 
                  color: '#2F4F4F', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  animation: `slideDown 0.6s ease-out ${0.1 * index}s`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#228B22';
                  e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#2F4F4F';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {item.label}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '2px',
                  background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                  borderRadius: '2px',
                  transition: 'width 0.3s ease'
                }} className="nav-indicator"></div>
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn position-relative d-flex align-items-center gap-2"
              style={{ 
                backgroundColor: 'transparent', 
                color: '#2F4F4F', 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                padding: '0.5rem 1rem', 
                borderRadius: '25px',
                border: '1px solid rgba(34, 139, 34, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
                e.currentTarget.style.color = '#228B22';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#2F4F4F';
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>🛒</span>
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: '#DC3545',
                    color: '#fff',
                    fontSize: '0.7rem',
                    padding: '0.25rem 0.5rem',
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Shop Now Button */}
            <button
              onClick={() => window.location.href = '/shop'}
              className="d-none d-sm-flex align-items-center gap-2 btn"
              style={{ 
                backgroundColor: '#228B22', 
                color: '#fff', 
                fontSize: '0.875rem', 
                fontWeight: '700', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '50px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)',
                transition: 'all 0.3s ease',
                animation: 'slideDown 0.6s ease-out 0.5s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1B691B';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 139, 34, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#228B22';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 139, 34, 0.3)';
              }}
            >
              <span>Shop Now</span>
              <span style={{ fontSize: '1rem' }}>🛍️</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{ 
                padding: '0.75rem', 
                color: '#2F4F4F', 
                borderRadius: '10px', 
                backgroundColor: 'transparent', 
                border: 'none',
                transition: 'all 0.3s ease',
                animation: 'slideDown 0.6s ease-out 0.6s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {isDarkMode ? (
                <span style={{ fontSize: '1.1rem' }}>☀️</span>
              ) : (
                <span style={{ fontSize: '1.1rem' }}>🌙</span>
              )}
              <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>
                Toggle theme
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="d-lg-none"
              style={{ 
                padding: '0.75rem', 
                color: '#2F4F4F', 
                borderRadius: '10px', 
                backgroundColor: 'transparent', 
                border: 'none',
                transition: 'background-color 0.3s',
                animation: 'slideDown 0.6s ease-out 0.6s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>☰</span>
              <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>
                Menu
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div
        className={`d-lg-none fixed-top ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
        style={{ 
          zIndex: 60,
          height: '100vh',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Backdrop */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Menu Content */}
        <div
          className="position-absolute end-0 top-0 h-100 d-flex flex-column"
          style={{
            width: '320px',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="d-flex flex-column h-100 p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div 
                className="d-flex align-items-center gap-3 cursor-pointer"
                onClick={() => {
                  scrollToSection('home');
                  setIsMobileMenuOpen(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.25rem', color: 'white' }}>🌱</span>
                </div>
                <div>
                  <h2 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '800', 
                    color: '#2F4F4F',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    Wamugunda Farm
                  </h2>
                  <p style={{ 
                    fontSize: '0.7rem', 
                    color: '#228B22', 
                    fontWeight: '600',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    From Soil to Soul
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ 
                  padding: '0.75rem', 
                  color: '#2F4F4F', 
                  borderRadius: '10px', 
                  backgroundColor: 'transparent',
                  border: 'none',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>×</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="d-flex flex-column flex-grow gap-1">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    color: '#2F4F4F', 
                    padding: '1rem 1.5rem', 
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `slideInRight 0.4s ease-out ${0.1 * index}s both`
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#228B22';
                    e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '#2F4F4F';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ marginRight: '12px', color: '#228B22' }}>•</span>
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Footer Actions */}
            <div style={{ 
              marginTop: '2rem', 
              paddingTop: '2rem', 
              borderTop: '1px solid rgba(34, 139, 34, 0.2)',
              animation: 'slideInRight 0.4s ease-out 0.6s both'
            }}>
              {/* Cart Button in Mobile Menu */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2 mb-3 position-relative"
                style={{ 
                  backgroundColor: 'rgba(34, 139, 34, 0.1)', 
                  color: '#228B22', 
                  fontSize: '1rem', 
                  fontWeight: '700', 
                  padding: '1rem 2rem', 
                  borderRadius: '12px',
                  border: '1px solid rgba(34, 139, 34, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>🛒</span>
                View Cart
                {cartItemsCount > 0 && (
                  <span
                    className="position-absolute top-0 end-0 translate-middle badge rounded-pill"
                    style={{
                      backgroundColor: '#DC3545',
                      color: '#fff',
                      fontSize: '0.7rem',
                      padding: '0.25rem 0.5rem',
                      minWidth: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => window.location.href = '/shop'}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                style={{ 
                  backgroundColor: '#228B22', 
                  color: '#fff', 
                  fontSize: '1rem', 
                  fontWeight: '700', 
                  padding: '1rem 2rem', 
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#1B691B';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 139, 34, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#228B22';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 139, 34, 0.3)';
                }}
              >
                <span>Shop Now</span>
                <span style={{ fontSize: '1.1rem' }}>🛍️</span>
              </button>
              
              {/* Contact Info in Mobile Menu */}
              <div style={{ 
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(34, 139, 34, 0.05)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: '#2F4F4F',
                  margin: '0 0 0.5rem 0',
                  fontWeight: '600'
                }}>
                  Need help?
                </p>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#228B22',
                  margin: 0,
                  fontWeight: '600'
                }}>
                  +254 712 345 678
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(productId, newQuantity) => {
          // Update cart items logic
          setCartItems(prev => 
            newQuantity === 0 
              ? prev.filter(item => item.id !== productId)
              : prev.map(item => 
                  item.id === productId ? { ...item, quantity: newQuantity } : item
                )
          );
        }}
        onRemoveItem={(productId) => {
          setCartItems(prev => prev.filter(item => item.id !== productId));
        }}
        onCheckout={() => {
          alert('Proceeding to checkout!');
          setIsCartOpen(false);
        }}
      />

      <style>
        {`
          @keyframes slideDown {
            from { 
              opacity: 0; 
              transform: translateY(-20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideInRight {
            from { 
              opacity: 0; 
              transform: translateX(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }

          .nav-indicator {
            width: 0;
          }

          button:hover .nav-indicator {
            width: 20px;
          }

          .cursor-pointer {
            cursor: pointer;
          }

          /* Smooth transitions for theme toggle */
          * {
            transition: background-color 0.3s ease, color 0.3s ease;
          }
        `}
      </style>
    </>
  );
};

// Cart Component (Add this at the bottom of the file)
const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`position-fixed top-0 start-0 w-100 h-100 ${isOpen ? 'visible' : 'invisible'}`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1040,
          transition: 'all 0.3s ease',
          opacity: isOpen ? 1 : 0
        }}
        onClick={handleClose}
      ></div>

      {/* Cart Sidebar */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white d-flex flex-column"
        style={{
          width: '400px',
          maxWidth: '90vw',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
          <h4 style={{ fontWeight: '700', color: '#2F4F4F', margin: 0 }}>
            Shopping Cart ({cartItems.length})
          </h4>
          <button
            onClick={handleClose}
            className="btn p-2"
            style={{
              color: '#2F4F4F',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>×</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow-1 overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <h5 style={{ color: '#2F4F4F', marginBottom: '0.5rem' }}>Your cart is empty</h5>
              <p style={{ color: 'rgba(47, 79, 79, 0.7)' }}>Add some fresh produce to get started!</p>
              <button
                onClick={handleClose}
                className="btn mt-3"
                style={{
                  background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                  color: '#fff',
                  fontWeight: '600',
                  padding: '0.75rem 2rem',
                  borderRadius: '25px'
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.quantity}`}
                  className="d-flex gap-3 p-3 rounded"
                  style={{
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    backgroundColor: 'rgba(34, 139, 34, 0.02)'
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 style={{ fontWeight: '600', color: '#2F4F4F', marginBottom: '0.25rem' }}>
                      {item.name}
                    </h6>
                    <p style={{ color: '#228B22', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {item.price}
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="btn p-1"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid rgba(34, 139, 34, 0.3)',
                            color: '#228B22',
                            fontSize: '1.2rem'
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="btn p-1"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid rgba(34, 139, 34, 0.3)',
                            color: '#228B22',
                            fontSize: '1.2rem'
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="btn p-1 ms-auto"
                        style={{
                          color: '#DC3545',
                          fontSize: '0.875rem'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-top p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontWeight: '600', color: '#2F4F4F' }}>Total:</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#228B22' }}>
                KSh {totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="btn w-100"
              style={{
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                color: '#fff',
                fontWeight: '600',
                padding: '0.75rem',
                borderRadius: '12px',
                fontSize: '1rem'
              }}
            >
              Proceed to Checkout
            </button>
            <div className="text-center mt-2">
              <small style={{ color: 'rgba(47, 79, 79, 0.6)' }}>
                Free delivery on orders over KSh 1000
              </small>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;