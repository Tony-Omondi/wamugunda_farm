// src/components/Checkout.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api';

interface CartItem {
  id: number;
  name: string;
  price: string | number;
  quantity: number;
  image: string;
}

interface Customer {
  name: string;
  email: string;
  phone_number: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || { cartItems: [] as CartItem[], totalPrice: 0 };

  const [formData, setFormData] = useState<Customer>({
    name: '',
    email: '',
    phone_number: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stkStatus, setStkStatus] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setStkStatus(null);

    try {
      const response = await api.checkout(cartItems, formData, totalPrice);
      if (response.checkout_request_id) {
        setStkStatus('STK Push sent to your phone. Please enter your M-Pesa PIN.');
        const checkoutRequestId = response.checkout_request_id;
        const orderId = response.order_id;
        let attempts = 0;
        const maxAttempts = 10;

        const checkStatus = async () => {
          if (attempts >= maxAttempts) {
            setError('Payment timed out. Please try again.');
            setIsSubmitting(false);
            return;
          }

          const statusResponse = await api.checkStkStatus(checkoutRequestId);
          if (statusResponse.status?.ResultCode === '0') {
            setIsSubmitting(false);
            localStorage.removeItem('cartItems');
            navigate('/success', { state: { orderId, totalPrice } });
          } else if (statusResponse.status?.ResultCode) {
            setError('Payment failed: ' + statusResponse.status.ResultDesc);
            setIsSubmitting(false);
          } else {
            attempts++;
            setTimeout(checkStatus, 3000);
          }
        };
        setTimeout(checkStatus, 3000);
      } else {
        setError(response.error || 'Failed to initiate payment.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: '100vh' }}>
      <h2 style={{ fontWeight: '700', color: '#2F4F4F', marginBottom: '2rem' }}>
        Checkout
      </h2>
      <div className="row g-4">
        <div className="col-lg-6">
          <h4 style={{ color: '#2F4F4F', marginBottom: '1.5rem' }}>Customer Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" style={{ color: '#2F4F4F', fontWeight: '600' }}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control"
                required
                style={{ borderRadius: '8px', border: '1px solid rgba(34, 139, 34, 0.3)' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" style={{ color: '#2F4F4F', fontWeight: '600' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                required
                style={{ borderRadius: '8px', border: '1px solid rgba(34, 139, 34, 0.3)' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone_number" style={{ color: '#2F4F4F', fontWeight: '600' }}>Phone Number (e.g., 07XX XXX XXX)</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="form-control"
                required
                placeholder="07XX XXX XXX"
                style={{ borderRadius: '8px', border: '1px solid rgba(34, 139, 34, 0.3)' }}
              />
            </div>
            {error && (
              <div className="alert alert-danger" style={{ borderRadius: '8px' }}>
                {error}
              </div>
            )}
            {stkStatus && (
              <div className="alert alert-info" style={{ borderRadius: '8px' }}>
                {stkStatus}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-100"
              style={{
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                color: '#fff',
                fontWeight: '600',
                padding: '0.75rem',
                borderRadius: '12px'
              }}
            >
              {isSubmitting ? (
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                  }}
                ></div>
              ) : (
                'Pay with M-Pesa'
              )}
            </button>
          </form>
        </div>
        <div className="col-lg-6">
          <h4 style={{ color: '#2F4F4F', marginBottom: '1.5rem' }}>Order Summary</h4>
          <div className="border rounded p-3" style={{ backgroundColor: 'rgba(34, 139, 34, 0.02)' }}>
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>KSh {(typeof item.price === 'string' ? parseFloat(item.price) : item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-3 pt-3 border-top">
              <span style={{ fontWeight: '600' }}>Total</span>
              <span style={{ fontWeight: '700', color: '#228B22' }}>
                KSh {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Checkout;