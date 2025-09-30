import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  setCartOpen: (open: boolean) => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ setCartOpen, cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Theme detection
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
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

  const navigationItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'shop', label: 'Shop', path: '/shop' },
    { id: 'gallery', label: 'Gallery', path: '/gallery' },
    { id: 'testimonials', label: 'Testimonials', path: '/testimonials' },
    { id: 'about', label: 'About', path: '/about' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: isScrolled ? '1px solid rgba(34, 139, 34, 0.1)' : '1px solid transparent',
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
        }}
      >
        <div className="container d-flex align-items-center justify-content-between px-4 py-3" style={{ maxWidth: '1140px' }}>
          {/* Logo */}
          <Link
            to="/"
            className="d-flex align-items-center gap-3 text-decoration-none"
            style={{
              transition: 'transform 0.3s ease',
              animation: 'slideDown 0.6s ease-out',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)',
              }}
            >
              <span style={{ fontSize: '1.25rem', color: 'white' }}>🌱</span>
            </div>
            <div>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: '#2F4F4F',
                  margin: 0,
                  lineHeight: '1.2',
                }}
              >
                Wamugunda Farm
              </h2>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: '#228B22',
                  fontWeight: '600',
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                From Soil to Soul
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="d-none d-lg-flex align-items-center gap-1">
            {navigationItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.path}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#2F4F4F',
                  background: 'none',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  animation: `slideDown 0.6s ease-out ${0.1 * index}s`,
                  textDecoration: 'none',
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
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0',
                    height: '2px',
                    background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease',
                  }}
                  className="nav-indicator"
                ></div>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="btn position-relative d-flex align-items-center gap-2"
              style={{
                backgroundColor: 'transparent',
                color: '#2F4F4F',
                fontSize: '0.875rem',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                border: '1px solid rgba(34, 139, 34, 0.2)',
                transition: 'all 0.3s ease',
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
              {cartItemCount > 0 && (
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
                    justifyContent: 'center',
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Shop Now Button */}
            <Link
              to="/shop"
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
                animation: 'slideDown 0.6s ease-out 0.5s',
                textDecoration: 'none',
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
            </Link>

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
                animation: 'slideDown 0.6s ease-out 0.6s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {isDarkMode ? (
                <span style={{ fontSize: '1.1rem' }}>☀️</span>
              ) : (
                <span style={{ fontSize: '1.1rem' }}>🌙</span>
              )}
              <span
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  padding: '0',
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                }}
              >
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
                animation: 'slideDown 0.6s ease-out 0.6s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>☰</span>
              <span
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  padding: '0',
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                }}
              >
                Menu
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`d-lg-none fixed-top ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
        style={{
          zIndex: 60,
          height: '100vh',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Backdrop */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
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
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="d-flex flex-column h-100 p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <Link
                to="/"
                className="d-flex align-items-center gap-3 text-decoration-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.25rem', color: 'white' }}>🌱</span>
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      color: '#2F4F4F',
                      margin: 0,
                      lineHeight: '1.2',
                    }}
                  >
                    Wamugunda Farm
                  </h2>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: '#228B22',
                      fontWeight: '600',
                      margin: 0,
                      opacity: 0.8,
                    }}
                  >
                    From Soil to Soul
                  </p>
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  padding: '0.75rem',
                  color: '#2F4F4F',
                  borderRadius: '10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  transition: 'background-color 0.3s',
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
                <Link
                  key={item.id}
                  to={item.path}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#2F4F4F',
                    padding: '1rem 1.5rem',
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    animation: `slideInRight 0.4s ease-out ${0.1 * index}s both`,
                    textDecoration: 'none',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
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
                </Link>
              ))}
            </nav>

            {/* Footer Actions */}
            <div
              style={{
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(34, 139, 34, 0.2)',
                animation: 'slideInRight 0.4s ease-out 0.6s both',
              }}
            >
              {/* Cart Button in Mobile Menu */}
              <button
                onClick={() => {
                  setCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2 mb-3 position-relative"
                style={{
                  backgroundColor: 'rgba(34, 139, 34, 0.1)',
                  color: '#228B22',
                  fontSize: '1rem',
                  fontWeight: '700',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(34, 139, 34, 0.2)',
                  transition: 'all 0.3s ease',
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
                {cartItemCount > 0 && (
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
                      justifyContent: 'center',
                    }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>

              <Link
                to="/shop"
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
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
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
              </Link>

              {/* Contact Info in Mobile Menu */}
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(34, 139, 34, 0.05)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: '#2F4F4F',
                    margin: '0 0 0.5rem 0',
                    fontWeight: '600',
                  }}
                >
                  Need help?
                </p>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#228B22',
                    margin: 0,
                    fontWeight: '600',
                  }}
                >
                  +254 712 345 678
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

          a:hover .nav-indicator {
            width: 20px;
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

export default Header;