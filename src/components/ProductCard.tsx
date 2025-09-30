import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import type { Produce, Testimonial, Media, Category, Customer, Order, OrderItem, ProduceImage, NutritionInfo, HealthBenefit } from '../api/api';

interface ProductCardProps {
  product: Produce;
  onAddToCart: (product: Produce) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onAddToCart && product.available) {
      setIsAddingToCart(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      onAddToCart(product);
      setIsAddingToCart(false);
    }
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://www.flaticon.com/free-icon/organic_5267982?term=organic+product&page=1&position=4&origin=search&related_id=5267982';
  };

  // Use the first image from product.images if available, else fall back to product.image
  const primaryImage = product.images?.[0]?.url || product.image || 'https://www.flaticon.com/free-icon/organic_5267982?term=organic+product&page=1&position=4&origin=search&related_id=5267982';
  const primaryAlt = product.images?.[0]?.alt || product.name || 'Product Image';

  // Convert price and original_price to numbers for toFixed, with fallbacks
  const price = parseFloat(product.price) || 0;
  const originalPrice = product.original_price ? parseFloat(product.original_price) : null;

  return (
    <div
      className="card h-100 position-relative"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
        border: '1px solid rgba(34, 139, 34, 0.2)',
        backgroundColor: '#fff',
        borderRadius: '0.375rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        animation: 'fadeIn 0.8s ease-out'
      }}
    >
      {/* Product Badges */}
      <div className="position-absolute top-0 start-0 d-flex flex-column gap-2 p-2" style={{ zIndex: 2 }}>
        {product.badge && (
          <span
            className="badge"
            style={{
              backgroundColor: '#228B22',
              color: '#fff',
              fontSize: '0.75rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.25rem',
              fontWeight: '600'
            }}
          >
            {product.badge}
          </span>
        )}
        {!product.available && (
          <span
            className="badge"
            style={{
              backgroundColor: '#DC3545',
              color: '#fff',
              fontSize: '0.75rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.25rem',
              fontWeight: '600'
            }}
          >
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="position-relative" style={{ height: '250px', overflow: 'hidden' }}>
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
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(34, 139, 34, 0.2)',
                borderTop: '3px solid #228B22',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}
            ></div>
          </div>
        )}
        <img
          src={primaryImage}
          alt={primaryAlt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="img-fluid"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            opacity: isImageLoaded ? 1 : 0
          }}
        />
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
            transition: 'opacity 0.3s ease'
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: '600',
              padding: '0.75rem 1.5rem',
              border: '2px solid #fff',
              borderRadius: '0.25rem',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            Quick View
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column" style={{ padding: '1rem' }}>
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
          {product.category?.name || 'Unknown Category'}
        </span>
        <h5
          style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#2F4F4F',
            marginBottom: '0.75rem',
            lineHeight: '1.3'
          }}
        >
          {product.name || 'Unnamed Product'}
        </h5>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'rgba(47, 79, 79, 0.7)',
            flexGrow: 1,
            marginBottom: '1rem',
            lineHeight: '1.5'
          }}
        >
          {product.description || 'No description available.'}
        </p>
        {product.rating > 0 && (
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    color: star <= Math.round(product.rating) ? '#FFD700' : '#E5E7EB',
                    fontSize: '0.875rem'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(47, 79, 79, 0.6)' }}>
              ({product.review_count || 0})
            </span>
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#228B22' }}>
              KSh {price.toFixed(2)}
            </span>
            {originalPrice && (
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(47, 79, 79, 0.5)',
                  textDecoration: 'line-through',
                  marginLeft: '0.5rem'
                }}
              >
                KSh {originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.available ? (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="btn d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: isAddingToCart ? '#1B691B' : '#228B22',
                color: '#fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                border: 'none',
                transition: 'background-color 0.3s, transform 0.2s',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
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
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid transparent',
                    borderTop: '2px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}
                ></div>
              ) : (
                <span className="bi bi-cart" style={{ fontSize: '1.25rem' }}></span>
              )}
            </button>
          ) : (
            <span
              className="badge"
              style={{
                backgroundColor: '#DC3545',
                color: '#fff',
                fontSize: '0.75rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.25rem',
                fontWeight: '600'
              }}
            >
              Out of Stock
            </span>
          )}
        </div>
        {(product.delivery_time || product.is_organic) && (
          <div className="d-flex gap-3 mt-3 pt-3" style={{ borderTop: '1px solid rgba(34, 139, 34, 0.1)' }}>
            {product.delivery_time && (
              <div className="d-flex align-items-center gap-1">
                <span style={{ fontSize: '0.875rem', color: '#228B22' }}>🚚</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(47, 79, 79, 0.6)' }}>
                  {product.delivery_time}
                </span>
              </div>
            )}
            {product.is_organic && (
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
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}
      </style>
    </div>
  );
};

export default ProductCard;