import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart')); // Add Cart import

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    }, 1500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Header />
          <main className="flex-grow-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} /> {/* Add Cart route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

// Cart Page Component (if you want a dedicated cart page)
const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Load cart items from localStorage or context
  useEffect(() => {
    // You can replace this with context or state management
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      const filteredItems = prevItems.filter(item => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      return filteredItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="display-4 fw-bold text-dark mb-4">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4" style={{ fontSize: '4rem' }}>🛒</div>
              <h3 className="text-dark mb-3">Your cart is empty</h3>
              <p className="text-muted mb-4">
                Discover our fresh produce and add items to your cart.
              </p>
              <a
                href="/shop"
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                  color: '#fff',
                  fontWeight: '600',
                  padding: '0.75rem 2rem',
                  borderRadius: '50px',
                  border: 'none',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                {cartItems.map(item => (
                  <div key={item.id} className="card mb-3 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <h5 className="card-title text-dark mb-1">{item.name}</h5>
                          <p className="text-success mb-0 fw-bold">KSh {item.price}</p>
                        </div>
                        <div className="col-md-3">
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="fw-bold">{item.quantity}</span>
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <p className="fw-bold text-dark mb-0">
                            KSh {item.price * item.quantity}
                          </p>
                        </div>
                        <div className="col-md-1">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="col-lg-4">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark mb-4">Order Summary</h5>
                    
                    <div className="d-flex justify-content-between mb-3">
                      <span>Subtotal:</span>
                      <span className="fw-bold">KSh {totalPrice}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-3">
                      <span>Shipping:</span>
                      <span className="fw-bold">KSh 200</span>
                    </div>
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between mb-4">
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold text-success">KSh {totalPrice + 200}</span>
                    </div>
                    
                    <button
                      className="btn w-100 mb-3"
                      style={{
                        background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                        color: '#fff',
                        fontWeight: '600',
                        padding: '0.75rem',
                        border: 'none',
                        borderRadius: '8px'
                      }}
                    >
                      Proceed to Checkout
                    </button>
                    
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Loading Screen Component
const LoadingScreen = ({ progress }: { progress: number }) => (
  <div className="d-flex justify-content-center align-items-center min-vh-100" style={{
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <div className="text-center" style={{ maxWidth: '320px', padding: '2rem' }}>
      {/* Animated Logo */}
      <div className="mb-4" style={{ animation: 'bounceIn 1s ease-out' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
          borderRadius: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(34, 139, 34, 0.3)'
        }}>
          <span style={{ fontSize: '2rem', color: 'white' }}>🌱</span>
        </div>
      </div>

      {/* Brand Text */}
      <h3 style={{ 
        fontWeight: '800', 
        color: '#2F4F4F',
        marginBottom: '0.5rem',
        animation: 'slideUp 0.8s ease-out 0.2s both'
      }}>
        Wamugunda Farm
      </h3>
      <p style={{ 
        color: '#228B22',
        fontWeight: '600',
        marginBottom: '2rem',
        animation: 'slideUp 0.8s ease-out 0.3s both'
      }}>
        From Soil to Soul
      </p>

      {/* Progress Bar */}
      <div style={{
        width: '200px',
        height: '6px',
        backgroundColor: 'rgba(34, 139, 34, 0.2)',
        borderRadius: '3px',
        margin: '0 auto 1rem',
        overflow: 'hidden',
        animation: 'slideUp 0.8s ease-out 0.4s both'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
          borderRadius: '3px',
          transition: 'width 0.3s ease',
          boxShadow: '0 2px 8px rgba(34, 139, 34, 0.3)'
        }}></div>
      </div>

      {/* Loading Text */}
      <p style={{ 
        fontSize: '0.875rem',
        color: 'rgba(47, 79, 79, 0.7)',
        margin: 0,
        animation: 'slideUp 0.8s ease-out 0.5s both'
      }}>
        {progress < 50 && 'Preparing fresh produce...'}
        {progress >= 50 && progress < 80 && 'Loading farm goodness...'}
        {progress >= 80 && 'Almost ready...'}
      </p>

      {/* Animated Dots */}
      <div style={{ 
        marginTop: '1rem',
        animation: 'slideUp 0.8s ease-out 0.6s both'
      }}>
        <div style={{
          display: 'inline-flex',
          gap: '4px'
        }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#228B22',
                borderRadius: '50%',
                animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>

    <style>
      {`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// Page Loader for Suspense fallback
const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
    <div className="text-center">
      <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid rgba(34, 139, 34, 0.2)',
        borderTop: '3px solid #228B22',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }}></div>
      <p style={{ color: '#2F4F4F', fontWeight: '500' }}>Loading page...</p>
    </div>
  </div>
);

// 404 Not Found Page
const NotFound = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
    <div className="text-center">
      <div style={{
        fontSize: '4rem',
        marginBottom: '1rem'
      }}>🌾</div>
      <h2 style={{ color: '#2F4F4F', fontWeight: '700', marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'rgba(47, 79, 79, 0.7)', marginBottom: '2rem' }}>
        Sorry, we couldn't find the page you're looking for.
      </p>
      <button
        className="btn"
        style={{
          background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
          color: '#fff',
          fontWeight: '600',
          padding: '0.75rem 2rem',
          borderRadius: '50px',
          border: 'none',
          boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 139, 34, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 139, 34, 0.3)';
        }}
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </button>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)'
        }}>
          <div className="text-center" style={{ maxWidth: '400px', padding: '2rem' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>⚠️</div>
            <h3 style={{ color: '#2F4F4F', fontWeight: '700', marginBottom: '1rem' }}>
              Something went wrong
            </h3>
            <p style={{ color: 'rgba(47, 79, 79, 0.7)', marginBottom: '1.5rem' }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                  color: '#fff',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  border: 'none'
                }}
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  color: '#228B22',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  border: '2px solid #228B22'
                }}
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: '2rem', 
                textAlign: 'left',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.875rem'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
                  Error Details (Development)
                </summary>
                <pre style={{ 
                  marginTop: '1rem', 
                  whiteSpace: 'pre-wrap',
                  color: 'rgba(47, 79, 79, 0.8)'
                }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default App;