// src/components/Success.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, totalPrice } = location.state || { orderId: 'N/A', totalPrice: 0 };

  return (
    <div className="container py-5 text-center" style={{ minHeight: '100vh' }}>
      <div style={{ fontSize: '4rem', color: '#228B22', marginBottom: '1rem' }}>✅</div>
      <h2 style={{ fontWeight: '700', color: '#2F4F4F', marginBottom: '1rem' }}>
        Payment Successful!
      </h2>
      <p style={{ color: 'rgba(47, 79, 79, 0.7)', marginBottom: '2rem' }}>
        Thank you for your order (ID: {orderId}). Your payment of KSh {totalPrice.toFixed(2)} has been received.
      </p>
      <p style={{ color: 'rgba(47, 79, 79, 0.7)', marginBottom: '2rem' }}>
        A confirmation email will be sent to you shortly.
      </p>
      <button
        onClick={() => navigate('/')}
        className="btn"
        style={{
          background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
          color: '#fff',
          fontWeight: '600',
          padding: '0.75rem 2rem',
          borderRadius: '12px'
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;