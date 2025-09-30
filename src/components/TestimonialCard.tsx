
import React, { useState } from 'react';
import api from '../api/api';
import type { Produce, Testimonial, Media, Category, Customer, Order, OrderItem, ProduceImage, NutritionInfo, HealthBenefit } from '../api/api';


interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{
          fontSize: '1.1rem',
          color: index < rating ? '#FFD700' : '#E5E7EB',
          marginRight: '2px',
          filter: index < rating ? 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  const shouldTruncate = testimonial.comment.length > 120;
  const displayComment = shouldTruncate && !isExpanded
    ? testimonial.comment.slice(0, 120) + '...'
    : testimonial.comment;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="card h-100 position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid rgba(34, 139, 34, 0.1)',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: isHovered
          ? '0 12px 40px rgba(34, 139, 34, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Element */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
          opacity: isHovered ? 1 : 0.8,
          transition: 'opacity 0.3s ease',
        }}
      ></div>

      {/* Quote Icon */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          fontSize: '3rem',
          color: 'rgba(34, 139, 34, 0.1)',
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
          transition: 'all 0.3s ease',
          lineHeight: 1,
        }}
      >
        "
      </div>

      <div className="card-body d-flex flex-column p-4" style={{ paddingTop: '2rem' }}>
        {/* Header with Placeholder Avatar */}
        <div className="d-flex align-items-start gap-3 mb-4">
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.25rem',
              fontWeight: '600',
              border: '3px solid rgba(34, 139, 34, 0.1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {testimonial.customer.name.charAt(0)}
          </div>

          <div className="flex-grow-1">
            <h6
              style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#2F4F4F',
                marginBottom: '0.25rem',
                lineHeight: '1.2',
              }}
            >
              {testimonial.customer.name}
            </h6>
            <small
              style={{
                fontSize: '0.75rem',
                color: 'rgba(47, 79, 79, 0.6)',
                display: 'block',
                marginTop: '0.25rem',
              }}
            >
              {new Date(testimonial.created_at).toLocaleDateString()}
            </small>
          </div>
        </div>

        {/* Rating */}
        <div
          className="mb-3"
          style={{
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          {renderStars(testimonial.rating)}
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(47, 79, 79, 0.6)',
              marginLeft: '0.5rem',
              fontWeight: '500',
            }}
          >
            {testimonial.rating}.0
          </span>
        </div>

        {/* Testimonial Text */}
        <div className="flex-grow-1">
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(47, 79, 79, 0.8)',
              lineHeight: '1.6',
              marginBottom: '0.5rem',
              fontStyle: 'italic',
            }}
          >
            "{displayComment}"
          </p>

          {/* Read More/Less Toggle */}
          {shouldTruncate && (
            <button
              onClick={toggleExpand}
              className="btn btn-link p-0 border-0"
              style={{
                fontSize: '0.8rem',
                color: '#228B22',
                fontWeight: '600',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#1B691B')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#228B22')}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Product Mentioned */}
        <div
          className="mt-3 pt-3"
          style={{
            borderTop: '1px solid rgba(34, 139, 34, 0.1)',
            opacity: isHovered ? 1 : 0.8,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '0.8rem', color: '#228B22' }}>📦</span>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'rgba(47, 79, 79, 0.7)',
                fontWeight: '500',
              }}
            >
              Purchased: <strong>{testimonial.produce.name}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
