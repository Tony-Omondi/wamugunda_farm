import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Checkout from './components/Checkout';
import Success from './components/Success';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
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
    <CartProvider>
      <ErrorBoundary>
        <Router>
          <AppContent isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </Router>
      </ErrorBoundary>
    </CartProvider>
  );
};

const AppContent: React.FC<{ isCartOpen: boolean; setIsCartOpen: (open: boolean) => void }> = ({ isCartOpen, setIsCartOpen }) => {
  const { cartItems } = useCart();

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header setCartOpen={setIsCartOpen} cartItemCount={cartItems.length} />
      <main className="flex-grow-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

const LoadingScreen = ({ progress }: { progress: number }) => (
  <div className="d-flex justify-content-center align-items-center min-vh-100" style={{
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <div className="text-center" style={{ maxWidth: '320px', padding: '2rem' }}>
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