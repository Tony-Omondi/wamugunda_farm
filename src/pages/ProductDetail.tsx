import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import type { Produce } from '../api/api';

interface ProductDetailProps {
  cart: Array<Produce & { quantity: number }>;
  setCart: React.Dispatch<React.SetStateAction<Array<Produce & { quantity: number }>>>;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Produce | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Produce[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productData, produceData] = await Promise.all([
          api.getProduceDetail(Number(id)),
          api.getProduceList(),
        ]);
        setProduct(productData);
        setRelatedProducts(
          produceData
            .filter(p => p.category?.name === productData.category?.name && p.id !== productData.id)
            .slice(0, 3)
        );
        setLoading(false);
      } catch (error: any) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setCart(prev => [...prev, { ...product, quantity }]);
    setNotification({
      message: `${quantity} ${product.name} added to cart!`,
      type: 'success',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate('/cart'), 500);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (loading) {
    return (
      <div className="text-center py-5" style={{ minHeight: '100vh' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(34, 139, 34, 0.2)',
            borderTop: '3px solid #228B22',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}
        ></div>
        <p>Loading...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-5" style={{ minHeight: '100vh' }}>
        <p style={{ color: '#DC3545', fontSize: '1.25rem' }}>
          {error || 'Product not found.'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn"
          style={{
            backgroundColor: '#228B22',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            marginTop: '1rem'
          }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  // Convert price and original_price to numbers for toFixed, with fallbacks
  const price = parseFloat(product.price) || 0;
  const originalPrice = product.original_price ? parseFloat(product.original_price) : null;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="btn d-flex align-items-center gap-2 mb-4 p-0"
          style={{
            color: '#228B22',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s',
            animation: 'fadeIn 0.8s ease-out'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#1B691B')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#228B22')}
        >
          <span className="bi bi-arrow-left" style={{ fontSize: '1.25rem' }}></span>
          Back to Shop
        </button>

        <div className="row g-4">
          <div className="col-lg-6" style={{ animation: 'slideInLeft 0.8s ease-out' }}>
            <div className="rounded" style={{ position: 'relative', aspectRatio: '1/1', background: '#f8f9fa' }}>
              <img
                src={product.images?.[selectedImage]?.image || product.image || 'https://via.placeholder.com/400'}
                alt={product.images?.[selectedImage]?.alt_text || product.name || 'Product Image'}
                className="img-fluid rounded"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {product.images?.length > 0 && (
              <div className="d-flex gap-3 mt-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="border-0 rounded p-0"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#f8f9fa',
                      cursor: 'pointer',
                      border: selectedImage === index ? '3px solid #228B22' : '1px solid #dee2e6',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      if (selectedImage !== index) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.borderColor = '#228B22';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedImage !== index) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = '#dee2e6';
                      }
                    }}
                  >
                    <img
                      src={image.image || 'https://via.placeholder.com/80'}
                      alt={image.alt_text || `${product.name} view ${index + 1}`}
                      className="w-100 h-100 rounded"
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ animation: 'slideInRight 0.8s ease-out' }}>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span
                className="badge"
                style={{
                  backgroundColor: product.available ? '#28A745' : '#DC3545',
                  color: '#fff',
                  fontSize: '0.875rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.25rem'
                }}
              >
                {product.available ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.is_organic && (
                <span
                  className="badge"
                  style={{
                    backgroundColor: '#228B22',
                    color: '#fff',
                    fontSize: '0.875rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  Organic
                </span>
              )}
              <span
                className="badge"
                style={{
                  backgroundColor: '#17A2B8',
                  color: '#fff',
                  fontSize: '0.875rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.25rem',
                  textTransform: 'capitalize'
                }}
              >
                {product.category?.name || 'Unknown Category'}
              </span>
              {product.badge && (
                <span
                  className="badge"
                  style={{
                    backgroundColor: '#FFC107',
                    color: '#2F4F4F',
                    fontSize: '0.875rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#2F4F4F',
                marginBottom: '1rem',
                animation: 'slideUp 0.8s ease-out'
              }}
            >
              {product.name || 'Unnamed Product'}
            </h1>

            {product.rating > 0 && (
              <div className="d-flex align-items-center gap-2 mb-4" style={{ animation: 'slideUp 0.8s ease-out 0.1s' }}>
                <div className="d-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        color: star <= Math.round(product.rating) ? '#FFD700' : '#E5E7EB',
                        fontSize: '1rem'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: '0.875rem', color: 'rgba(47, 79, 79, 0.6)' }}>
                  {product.rating} ({product.review_count || 0} reviews)
                </span>
              </div>
            )}

            <div className="mb-4" style={{ animation: 'slideUp 0.8s ease-out 0.2s' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: '#228B22' }}>
                KSh {price.toFixed(2)}
              </span>
              {originalPrice && (
                <span
                  style={{
                    fontSize: '1.25rem',
                    color: 'rgba(47, 79, 79, 0.5)',
                    textDecoration: 'line-through',
                    marginLeft: '0.5rem'
                  }}
                >
                  KSh {originalPrice.toFixed(2)}
                </span>
              )}
              {originalPrice && (
                <span
                  className="badge"
                  style={{
                    backgroundColor: '#DC3545',
                    color: '#fff',
                    fontSize: '0.875rem',
                    padding: '0.25rem 0.5rem',
                    marginLeft: '0.5rem'
                  }}
                >
                  Save {((1 - price / originalPrice) * 100).toFixed(0)}%
                </span>
              )}
            </div>

            <p
              style={{
                fontSize: '1.25rem',
                color: 'rgba(47, 79, 79, 0.7)',
                marginBottom: '1.5rem',
                animation: 'slideUp 0.8s ease-out 0.3s'
              }}
            >
              {product.description || 'No description available.'}
            </p>

            {product.available && (
              <div className="d-flex align-items-center gap-3 mb-4" style={{ animation: 'slideUp 0.8s ease-out 0.4s' }}>
                <span style={{ fontSize: '1rem', fontWeight: '600', color: '#2F4F4F' }}>
                  Quantity:
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={decrementQuantity}
                    className="btn btn-outline-secondary rounded-circle"
                    style={{ width: '40px', height: '40px', lineHeight: '1' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '1rem', minWidth: '50px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="btn btn-outline-secondary rounded-circle"
                    style={{ width: '40px', height: '40px', lineHeight: '1' }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {product.available && (
              <div className="d-flex flex-column flex-sm-row gap-3 mb-4" style={{ animation: 'slideUp 0.8s ease-out 0.5s' }}>
                <button
                  onClick={handleAddToCart}
                  className="btn flex-fill"
                  style={{
                    backgroundColor: '#228B22',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '700',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    transition: 'background-color 0.3s, transform 0.2s'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1B691B')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#228B22')}
                  onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
                  onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <span className="bi bi-cart me-2"></span>Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn flex-fill"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#228B22',
                    border: '2px solid #228B22',
                    fontSize: '1rem',
                    fontWeight: '700',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    transition: 'background-color 0.3s, transform 0.2s'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
                  onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <span className="bi bi-lightning-fill me-2"></span>Buy Now
                </button>
              </div>
            )}

            {product.delivery_time && (
              <div
                className="d-flex align-items-center gap-3 p-3 rounded"
                style={{
                  backgroundColor: 'rgba(34, 139, 34, 0.05)',
                  animation: 'slideUp 0.8s ease-out 0.6s'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🚚</span>
                <div>
                  <div style={{ fontWeight: '600', color: '#2F4F4F' }}>Free Delivery</div>
                  <div style={{ color: 'rgba(47, 79, 79, 0.7)', fontSize: '0.9rem' }}>
                    {product.delivery_time} • Order today, delivered fresh
                  </div>
                </div>
              </div>
            )}
          </div>

          {(product.details || product.storage_tips || product.nutrition?.length > 0 || product.benefits?.length > 0) && (
            <div className="col-12 mt-5">
              <div className="border-top pt-5">
                <div className="row g-4">
                  {(product.details || product.benefits?.length > 0) && (
                    <div className="col-md-6">
                      <h4
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#2F4F4F',
                          marginBottom: '1rem'
                        }}
                      >
                        Product Details
                      </h4>
                      {product.details && (
                        <p
                          style={{
                            fontSize: '1rem',
                            color: 'rgba(47, 79, 79, 0.7)',
                            marginBottom: '1.5rem'
                          }}
                        >
                          {product.details}
                        </p>
                      )}
                      {product.benefits?.length > 0 && (
                        <>
                          <h5 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2F4F4F', marginBottom: '1rem' }}>
                            Health Benefits
                          </h5>
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {product.benefits.map((benefit, index) => (
                              <li key={index} className="d-flex align-items-center gap-2 mb-2">
                                <span style={{ color: '#228B22' }}>✓</span>
                                <span style={{ color: 'rgba(47, 79, 79, 0.7)' }}>{benefit.description}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                  {(product.nutrition?.length > 0 || product.storage_tips) && (
                    <div className="col-md-6">
                      {product.nutrition?.length > 0 && (
                        <>
                          <h4
                            style={{
                              fontSize: '1.5rem',
                              fontWeight: '700',
                              color: '#2F4F4F',
                              marginBottom: '1rem'
                            }}
                          >
                            Nutritional Information
                          </h4>
                          <div className="row g-3">
                            {product.nutrition.map((item, index) => (
                              <div key={index} className="col-6">
                                <div
                                  className="p-3 rounded text-center"
                                  style={{ backgroundColor: 'rgba(34, 139, 34, 0.05)' }}
                                >
                                  <div style={{ fontWeight: '700', color: '#228B22' }}>{item.value}</div>
                                  <div style={{ fontSize: '0.875rem', color: 'rgba(47, 79, 79, 0.7)' }}>
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      {product.storage_tips && (
                        <>
                          <h5
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: '600',
                              color: '#2F4F4F',
                              marginTop: '1.5rem',
                              marginBottom: '1rem'
                            }}
                          >
                            Storage Tips
                          </h5>
                          <p style={{ fontSize: '1rem', color: 'rgba(47, 79, 79, 0.7)' }}>
                            {product.storage_tips}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {relatedProducts.length > 0 && (
            <div className="col-12 mt-5">
              <h4
                style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#2F4F4F',
                  marginBottom: '1.5rem',
                  animation: 'fadeIn 0.8s ease-out'
                }}
              >
                You Might Also Like
              </h4>
              <div className="row g-4">
                {relatedProducts.map((relatedProduct, index) => (
                  <div
                    key={relatedProduct.id}
                    className="col-md-6 col-lg-4"
                    style={{ animation: `scaleIn 0.5s ease-out ${0.2 * index}s` }}
                  >
                    <div
                      className="card h-100"
                      style={{
                        border: '1px solid rgba(34, 139, 34, 0.2)',
                        cursor: 'pointer',
                        borderRadius: '0.375rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                      onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    >
                      <img
                        src={relatedProduct.image || 'https://via.placeholder.com/200'}
                        alt={relatedProduct.name || 'Related Product'}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h6 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2F4F4F' }}>
                          {relatedProduct.name || 'Unnamed Product'}
                        </h6>
                        <p style={{ fontSize: '1rem', fontWeight: '700', color: '#228B22', marginBottom: '0' }}>
                          KSh {(parseFloat(relatedProduct.price) || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {notification && (
          <div
            className="position-fixed top-0 end-0 m-4 p-3 rounded shadow"
            style={{
              backgroundColor: notification.type === 'success' ? '#228B22' : '#DC3545',
              color: '#fff',
              zIndex: 1060,
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            {notification.message}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        `}
      </style>
    </div>
  );
};

export default ProductDetail;