// pages/ProductDetail.tsx
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [notification, setNotification] = useState(null);

  // Enhanced product data with multiple images
  const product = {
    id: 1,
    name: "Mangoes",
    description: "Sweet and juicy mangoes harvested at peak ripeness",
    price: "KSh 250/kg",
    originalPrice: "KSh 300/kg",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcEnfGLLTl8WW09ESF7dP7IhYH_wshgElqxmwyBR4ha4FNSNiARBMUFglrT6BbtiZ_y0z_Z_8SWPRlWQ8eZRvXE5Ji-Up5ZX3NwxW-PH4MF42eIv8Hz4wzJJZBNzDCdGnkrg0hhiVlK_8ZywOuDt2eC7ubWCHZ5JLeu45Z902cBxxLk5aaCCZ8zgPt2H9Hd4ynS4ViQCxEh4HIuw3eUG848aPiz5zxJMsPjDqRN9HcPsjDhcxjmY7c56HvRyaa46q6KKUTmeZ6u78N",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcEnfGLLTl8WW09ESF7dP7IhYH_wshgElqxmwyBR4ha4FNSNiARBMUFglrT6BbtiZ_y0z_Z_8SWPRlWQ8eZRvXE5Ji-Up5ZX3NwxW-PH4MF42eIv8Hz4wzJJZBNzDCdGnkrg0hhiVlK_8ZywOuDt2eC7ubWCHZ5JLeu45Z902cBxxLk5aaCCZ8zgPt2H9Hd4ynS4ViQCxEh4HIuw3eUG848aPiz5zxJMsPjDqRN9HcPsjDhcxjmY7c56HvRyaa46q6KKUTmeZ6u78N",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1590502543744-9c7f5b7bdfc6?w=500&h=400&fit=crop"
    ],
    category: "fruits",
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    organic: true,
    deliveryTime: "1-2 days",
    details: "Our mangoes are grown using sustainable farming practices. They are hand-picked at peak ripeness to ensure the best flavor and nutritional value. Each mango is carefully selected for optimal sweetness and texture.",
    nutrition: [
      { name: "Calories", value: "60 cal per 100g" },
      { name: "Vitamin C", value: "60% of RDI" },
      { name: "Vitamin A", value: "35% of RDI" },
      { name: "Fiber", value: "1.6g per 100g" }
    ],
    storageTips: "Store at room temperature until ripe, then refrigerate to maintain freshness.",
    benefits: [
      "Rich in antioxidants and vitamins",
      "Supports immune system health",
      "Promotes digestive health",
      "Natural energy booster"
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Avocados",
      price: "KSh 180/kg",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-9BbBTLkQjt3x7lrxrcEH3Y5AlA0u3oHRRLeIdji2SewnV_bJ6BUTL5_M9awX-BWtjfdtLj0Jr2g9OCf_dtZe-teEB9L8YKiqQdpSLHpz8z5DFPoWYPwRDNGtU295TXkYhBHi1GMbjLlZXjoOiePXPMt3D32bfN6gVv_B1yxtIvfvDUccW22RoRY5AuPd-uywKTvQYj7sfIYSla3v5GQl9DblSpFERwC9IQKa3msx3Tt2i6HbZ-GPyGx5NjRBtOtxLmOFpETw_DFK"
    },
    {
      id: 3,
      name: "Bananas",
      price: "KSh 120/bunch",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqqGFwZvA0gjvfO25amMlhZeGgyv7YsRSSinI5DECd1l8Zz7DfiNogYNX7eBDTlFglp3XLEP2phsdhcdaWl9lzVfQUw9OBbPIDvYNbWNqmsdVmrjStZZ20wSREBIpWnxbrq4ShTDdV3tJfrdYXsLqHkmP6ddISGJ1f89uENyGeEtA0lwIwRd8S793lFiOw6lg6yhGFC6grAzfmg_5Q5-b5yZtTsBvTMsUZZJZ2mpNcxz48wZ7wa5zCwdd5m57_fVxULnaIUA78KITW"
    }
  ];

  const handleAddToCart = () => {
    setNotification({
      message: `${quantity} ${product.name} added to cart!`,
      type: 'success'
    });
    
    setTimeout(() => setNotification(null), 3000);
    
    // Here you would typically add to a global cart state
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout
    setTimeout(() => {
      // navigate('/checkout');
      alert('Proceeding to checkout!');
    }, 500);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="btn d-flex align-items-center gap-2 mb-4 p-0"
          style={{
            color: '#228B22',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#1B691B')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#228B22')}
        >
          <span style={{ fontSize: '1.25rem' }}>←</span>
          Back to Shop
        </button>

        <div className="row g-5">
          {/* Product Images */}
          <div className="col-lg-6">
            <div style={{ animation: 'slideInLeft 0.8s ease-out' }}>
              {/* Main Image */}
              <div 
                className="rounded-3 overflow-hidden mb-4"
                style={{
                  aspectRatio: '1/1',
                  background: '#f8f9fa',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="d-flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-0 rounded-2 overflow-hidden p-0 ${selectedImage === index ? 'border-2 border-success' : ''}`}
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#f8f9fa',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: selectedImage === index ? '3px solid #228B22' : '1px solid #dee2e6'
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
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-lg-6">
            <div style={{ animation: 'slideInRight 0.8s ease-out' }}>
              {/* Badges */}
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge bg-success">In Stock</span>
                {product.organic && <span className="badge bg-success">🌿 Organic</span>}
                <span className="badge bg-info text-capitalize">{product.category}</span>
                <span className="badge bg-warning text-dark">⭐ {product.rating} ({product.reviewCount})</span>
              </div>

              {/* Product Name */}
              <h1 className="display-5 fw-bold mb-3" style={{ color: '#2F4F4F' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        color: star <= Math.floor(product.rating) ? '#FFD700' : '#E5E7EB',
                        fontSize: '1.25rem'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ color: 'rgba(47, 79, 79, 0.7)', fontWeight: '500' }}>
                  {product.rating} out of 5 ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="display-6 fw-bold" style={{ color: '#228B22' }}>
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-muted text-decoration-line-through ms-2 fs-5">
                    {product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="badge bg-danger ms-2 fs-6">
                    Save {((1 - parseFloat(product.price.replace(/[^\d.]/g, '')) / parseFloat(product.originalPrice.replace(/[^\d.]/g, ''))) * 100).toFixed(0)}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="fs-5 text-muted mb-4" style={{ lineHeight: '1.6' }}>
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="fw-semibold">Quantity:</span>
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={decrementQuantity}
                    className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px' }}
                  >
                    -
                  </button>
                  <span className="fw-bold fs-5" style={{ minWidth: '50px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                <button
                  onClick={handleAddToCart}
                  className="btn flex-fill d-flex align-items-center justify-content-center gap-2 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span>🛒</span>
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn flex-fill d-flex align-items-center justify-content-center gap-2 py-3"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#228B22',
                    border: '2px solid #228B22',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>⚡</span>
                  Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              <div className="d-flex align-items-center gap-3 p-3 rounded" style={{ backgroundColor: 'rgba(34, 139, 34, 0.05)' }}>
                <span style={{ fontSize: '1.5rem' }}>🚚</span>
                <div>
                  <div style={{ fontWeight: '600', color: '#2F4F4F' }}>Free Delivery</div>
                  <div style={{ color: 'rgba(47, 79, 79, 0.7)', fontSize: '0.9rem' }}>
                    {product.deliveryTime} • Order today, delivered fresh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="border-top pt-5">
              {/* Tabs for Details */}
              <div className="row g-5">
                <div className="col-md-6">
                  <h4 className="fw-bold mb-4" style={{ color: '#2F4F4F' }}>Product Details</h4>
                  <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                    {product.details}
                  </p>
                  
                  <h5 className="fw-semibold mb-3">Health Benefits</h5>
                  <ul className="list-unstyled">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="d-flex align-items-center gap-2 mb-2">
                        <span style={{ color: '#228B22' }}>✓</span>
                        <span className="text-muted">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-md-6">
                  <h4 className="fw-bold mb-4" style={{ color: '#2F4F4F' }}>Nutritional Information</h4>
                  <div className="row g-3">
                    {product.nutrition.map((item, index) => (
                      <div key={index} className="col-6">
                        <div className="p-3 rounded text-center" style={{ backgroundColor: 'rgba(34, 139, 34, 0.05)' }}>
                          <div className="fw-bold text-success">{item.value}</div>
                          <div className="small text-muted">{item.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h5 className="fw-semibold mt-4 mb-3">Storage Tips</h5>
                  <p className="text-muted">{product.storageTips}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="fw-bold mb-4" style={{ color: '#2F4F4F' }}>You Might Also Like</h4>
            <div className="row g-4">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="col-md-6 col-lg-4">
                  <div 
                    className="card border-0 rounded-3 shadow-sm h-100"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h6 className="card-title fw-bold">{relatedProduct.name}</h6>
                      <p className="card-text text-success fw-semibold mb-0">{relatedProduct.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
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

      <style>
        {`
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetail;