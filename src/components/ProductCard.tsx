// components/ProductCard.tsx
import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (onAddToCart && product.inStock) {
      setIsAddingToCart(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      onAddToCart(product);
      setIsAddingToCart(false);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    // Show a placeholder image or icon
  };

  return (
    <div
      className="card h-100 position-relative"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        cursor: 'pointer', 
        border: '1px solid rgba(34, 139, 34, 0.1)', 
        backgroundColor: '#fff', 
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
      }}
    >
      {/* Product Badges */}
      <div className="position-absolute top-0 start-0 d-flex flex-column gap-2 p-3" style={{ zIndex: 2 }}>
        {product.badge && (
          <span
            className="badge"
            style={{ 
              backgroundColor: '#228B22', 
              color: '#fff', 
              fontSize: '0.75rem', 
              padding: '0.5rem 0.75rem', 
              borderRadius: '25px',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(34, 139, 34, 0.3)'
            }}
          >
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span
            className="badge"
            style={{ 
              backgroundColor: '#DC3545', 
              color: '#fff', 
              fontSize: '0.75rem', 
              padding: '0.5rem 0.75rem', 
              borderRadius: '25px',
              fontWeight: '600'
            }}
          >
            Out of Stock
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        className="position-absolute top-0 end-0 border-0 bg-transparent p-3"
        style={{ zIndex: 2 }}
        onClick={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '1.25rem', color: 'rgba(0, 0, 0, 0.3)' }}>♡</span>
      </button>

      {/* Product Image */}
      <div className="position-relative" style={{ height: '250px', overflow: 'hidden' }}>
        {/* Loading Skeleton */}
        {!isImageLoaded && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(34, 139, 34, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px 16px 0 0'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(34, 139, 34, 0.2)',
              borderTop: '3px solid #228B22',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        )}

        <img
          src={product.imageUrl}
          alt={product.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            opacity: isImageLoaded ? 1 : 0
          }}
        />

        {/* Quick View Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.9) 0%, rgba(27, 105, 27, 0.8) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            borderRadius: '16px 16px 0 0'
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: '600',
              padding: '0.75rem 1.5rem',
              border: '2px solid #fff',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            Quick View
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column p-4">
        {/* Category */}
        {product.category && (
          <span
            style={{
              fontSize: '0.75rem',
              color: '#228B22',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '0.5rem'
            }}
          >
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <h5 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          color: '#2F4F4F', 
          marginBottom: '0.75rem',
          lineHeight: '1.3'
        }}>
          {product.name}
        </h5>

        {/* Product Description */}
        <p style={{ 
          fontSize: '0.875rem', 
          color: 'rgba(47, 79, 79, 0.7)', 
          flexGrow: 1, 
          marginBottom: '1rem',
          lineHeight: '1.5'
        }}>
          {product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    color: star <= product.rating ? '#FFD700' : '#E5E7EB',
                    fontSize: '0.875rem'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(47, 79, 79, 0.6)' }}>
              ({product.reviewCount || '0'})
            </span>
          </div>
        )}

        {/* Price and Action */}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: '800', 
              color: '#228B22' 
            }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(47, 79, 79, 0.5)', 
                textDecoration: 'line-through',
                marginLeft: '0.5rem'
              }}>
                {product.originalPrice}
              </span>
            )}
          </div>

          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="btn d-flex align-items-center justify-content-center position-relative"
              style={{
                backgroundColor: isAddingToCart ? '#1B691B' : '#228B22',
                color: '#fff',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                if (!isAddingToCart) {
                  e.currentTarget.style.backgroundColor = '#1B691B';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }
              }}
              onMouseOut={(e) => {
                if (!isAddingToCart) {
                  e.currentTarget.style.backgroundColor = '#228B22';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {isAddingToCart ? (
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid transparent',
                  borderTop: '2px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></div>
              ) : (
                <span style={{ fontSize: '1.25rem', transition: 'transform 0.3s ease' }}>
                  🛒
                </span>
              )}
            </button>
          ) : (
            <span
              className="badge"
              style={{ 
                backgroundColor: 'rgba(220, 53, 69, 0.1)', 
                color: '#DC3545', 
                fontSize: '0.75rem', 
                padding: '0.75rem 1rem', 
                borderRadius: '25px',
                fontWeight: '600',
                border: '1px solid rgba(220, 53, 69, 0.2)'
              }}
            >
              Out of Stock
            </span>
          )}
        </div>

        {/* Additional Info */}
        {(product.deliveryTime || product.organic) && (
          <div className="d-flex gap-3 mt-3 pt-3" style={{ borderTop: '1px solid rgba(34, 139, 34, 0.1)' }}>
            {product.deliveryTime && (
              <div className="d-flex align-items-center gap-1">
                <span style={{ fontSize: '0.875rem', color: '#228B22' }}>🚚</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(47, 79, 79, 0.6)' }}>
                  {product.deliveryTime}
                </span>
              </div>
            )}
            {product.organic && (
              <div className="d-flex align-items-center gap-1">
                <span style={{ fontSize: '0.875rem', color: '#228B22' }}>🌿</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(47, 79, 79, 0.6)' }}>
                  Organic
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          .card:hover {
            box-shadow: 0 20px 40px rgba(34, 139, 34, 0.15);
          }
        `}
      </style>
    </div>
  );
};

export default ProductCard;