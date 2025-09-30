import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return total + (price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { cartItems, totalPrice } });
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <div
        className={`position-fixed top-0 start-0 w-100 h-100 ${isOpen ? 'visible' : 'invisible'}`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1040,
          transition: 'all 0.3s ease',
          opacity: isOpen ? 1 : 0,
        }}
        onClick={handleClose}
      ></div>
      <div
        className="position-fixed top-0 end-0 h-100 bg-white d-flex flex-column"
        style={{
          width: '400px',
          maxWidth: '90vw',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
        }}
      >
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
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>×</span>
          </button>
        </div>
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
                  borderRadius: '25px',
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
                    backgroundColor: 'rgba(34, 139, 34, 0.02)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80';
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 style={{ fontWeight: '600', color: '#2F4F4F', marginBottom: '0.25rem' }}>
                      {item.name}
                    </h6>
                    <p style={{ color: '#228B22', fontWeight: '600', marginBottom: '0.5rem' }}>
                      KSh {(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)}
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="btn p-1"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid rgba(34, 139, 34, 0.3)',
                            color: '#228B22',
                            fontSize: '1.2rem',
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="btn p-1"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid rgba(34, 139, 34, 0.3)',
                            color: '#228B22',
                            fontSize: '1.2rem',
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn p-1 ms-auto"
                        style={{
                          color: '#DC3545',
                          fontSize: '0.875rem',
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
        {cartItems.length > 0 && (
          <div className="border-top p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontWeight: '600', color: '#2F4F4F' }}>Total:</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#228B22' }}>
                KSh {totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="btn w-100"
              style={{
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                color: '#fff',
                fontWeight: '600',
                padding: '0.75rem',
                borderRadius: '12px',
                fontSize: '1rem',
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

export default Cart;