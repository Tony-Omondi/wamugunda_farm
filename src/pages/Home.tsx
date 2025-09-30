import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import MediaGallery from '../components/MediaGallery';
import api from '../api/api';
import type { Produce, Testimonial, Media, Category, Customer, Order, OrderItem, ProduceImage, NutritionInfo, HealthBenefit } from '../api/api';


const Home = () => {
  const [cart, setCart] = useState<(Produce & { quantity?: number })[]>([]);
  const [activeTab, setActiveTab] = useState('about');
  const [products, setProducts] = useState<Produce[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryImages, setGalleryImages] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [produceData, testimonialsData, mediaData] = await Promise.all([
          api.getProduceList(),
          api.getTestimonials(),
          api.getMedia(),
        ]);
        setProducts(produceData.slice(0, 3)); // Limit to 3 featured products
        setTestimonials(testimonialsData.slice(0, 3)); // Limit to 3 testimonials
        setGalleryImages(mediaData);
        setLoading(false);
      } catch (error: any) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product: Produce) => {
    setCart(prev => [...prev, { ...product, quantity: 1 }]);

    // Enhanced notification with better animation
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '1rem';
    notification.style.right = '1rem';
    notification.style.backgroundColor = '#228B22';
    notification.style.color = '#fff';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '12px';
    notification.style.boxShadow = '0 8px 25px rgba(34, 139, 34, 0.3)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100px)';
    notification.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '0.75rem';
    notification.style.fontWeight = '600';
    notification.style.borderLeft = '4px solid #1B691B';

    notification.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      ${product.name} added to cart!
    `;

    document.body.appendChild(notification);

    // Slide-in animation
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Slide-out and remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      setTimeout(() => notification.remove(), 400);
    }, 3000);
  };

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

  if (error) {
    return (
      <div className="text-center py-5" style={{ minHeight: '100vh' }}>
        <p style={{ color: '#DC3545', fontSize: '1.25rem' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn"
          style={{
            backgroundColor: '#228B22',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            marginTop: '1rem'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div id="home">
      {/* Hero Section */}
      <section
        className="min-vh-100 d-flex align-items-center justify-content-center text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(24, 33, 17, 0.85) 0%, rgba(34, 139, 34, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBg0sf2TILIMGeLMTzesQHuzHWc7WLLRYlTTyltXvHi2yfNM3YFFe6spaoHrH6UeZjOyzkl1V693yVXv7QFYe47_XF1JOGImqt6E1-ICZ_yRmgosmbx61rYG_iNFhlDRtPTjDdpIuC75DwagU0IQ-0MaAKc1DtcGwVcOP-s8kr_5gKn0bU6PBtrUgmmKBlsqvI1p7dEAdxk8iCGmIkEGu4JJ4XMk7KFnwgBBXkuumUQr1xBbjJSW-W9kWWboesDO2iRRzm-DSzNuEMD") center/cover',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(34, 139, 34, 0.1) 0%, transparent 50%)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="container text-center position-relative z-1">
          <div className="mb-4" style={{ animation: 'bounceIn 1s ease-out' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '2rem' }}>🌱</span>
            </div>
          </div>
          <h1
            className="display-3 fw-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #e8f5e8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'slideUp 0.8s ease-out'
            }}
          >
            From Soil to Soul
          </h1>
          <p
            className="lead mb-5 px-3"
            style={{
              fontSize: '1.4rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto',
              animation: 'slideUp 0.8s ease-out 0.2s',
              lineHeight: '1.6'
            }}
          >
            Wamugunda Farm: Your trusted source for fresh, organic produce in Kenya.
            Discover our commitment to sustainability, community, and quality.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button
              className="btn btn-lg px-5 py-3 fw-bold shadow"
              style={{
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                color: '#fff',
                borderRadius: '50px',
                border: 'none',
                transition: 'all 0.3s ease',
                animation: 'slideUp 0.8s ease-out 0.4s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(34, 139, 34, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 139, 34, 0.3)';
              }}
            >
              Order Fresh Produce
            </button>
            <button
              className="btn btn-lg px-5 py-3 fw-bold shadow"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                animation: 'slideUp 0.8s ease-out 0.4s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onClick={() => document.getElementById('about-mission')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Our Story
            </button>
          </div>
          <div className="mt-5" style={{ animation: 'fadeIn 1s ease-out 1s' }}>
            <div style={{
              width: '30px',
              height: '50px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '15px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <div style={{
                width: '4px',
                height: '12px',
                backgroundColor: '#fff',
                borderRadius: '2px',
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'scrollBounce 2s infinite'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Mission Section */}
      <section
        id="about-mission"
        className="py-5"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div style={{
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                borderRadius: '20px',
                padding: '3rem',
                color: 'white',
                height: '100%',
                boxShadow: '0 20px 40px rgba(34, 139, 34, 0.1)'
              }}>
                <h2 className="display-5 fw-bold mb-4">Our Journey</h2>
                <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7', opacity: 0.9 }}>
                  Wamugunda Farm was established in 1995 in Murang'a County, Central Kenya,
                  on land previously occupied by the defunct Sisal Farm near Murang'a Pioneers School.
                </p>
                <div className="row text-center mt-4">
                  <div className="col-4">
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>10+</div>
                    <div style={{ opacity: 0.8 }}>Hectares</div>
                  </div>
                  <div className="col-4">
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>25+</div>
                    <div style={{ opacity: 0.8 }}>Years</div>
                  </div>
                  <div className="col-4">
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>50+</div>
                    <div style={{ opacity: 0.8 }}>Local Workers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-5">
                <h2 className="display-5 fw-bold mb-4 text-dark">About Our Farm</h2>
                <div className="d-flex gap-2 mb-4">
                  {['about', 'mission', 'values'].map((tab) => (
                    <button
                      key={tab}
                      className={`btn ${activeTab === tab ? '' : 'btn-outline-'}`}
                      style={{
                        backgroundColor: activeTab === tab ? '#228B22' : 'transparent',
                        color: activeTab === tab ? '#fff' : '#228B22',
                        border: `2px solid #228B22`,
                        borderRadius: '25px',
                        padding: '0.5rem 1.5rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                <div style={{ minHeight: '200px' }}>
                  {activeTab === 'about' && (
                    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                      <p className="lead text-muted mb-4">
                        Spanning about 10 hectares, part of which is rocky terrain ideal for mangoes and other fruits,
                        our farm began with a vision for environmental restoration.
                      </p>
                      <ul className="list-unstyled">
                        <li className="mb-3 d-flex align-items-start">
                          <span className="me-3" style={{ color: '#228B22' }}>✓</span>
                          <span>Established 1995 in Murang'a County</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <span className="me-3" style={{ color: '#228B22' }}>✓</span>
                          <span>10 hectares of diverse agricultural land</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <span className="me-3" style={{ color: '#228B22' }}>✓</span>
                          <span>Rocky terrain perfect for fruit cultivation</span>
                        </li>
                        <li className="d-flex align-items-start">
                          <span className="me-3" style={{ color: '#228B22' }}>✓</span>
                          <span>Pioneers in micro-climate improvement through tree planting</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  {activeTab === 'mission' && (
                    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                      <p className="lead text-muted mb-4">
                        Wamugunda Farm isn't just about food — it's about climate restoration,
                        community empowerment, and nourishing families with safe, wholesome produce.
                      </p>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <h5 style={{ color: '#228B22' }}>Sustainability</h5>
                          <p className="small text-muted">
                            Passionate about sustainable farming and organic practices
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <h5 style={{ color: '#228B22' }}>Community</h5>
                          <p className="small text-muted">
                            Employing local workers and supporting smallholder farmers
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <h5 style={{ color: '#228B22' }}>Innovation</h5>
                          <p className="small text-muted">
                            Embracing value-added techniques like macadamia oil processing
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <h5 style={{ color: '#228B22' }}>Heritage</h5>
                          <p className="small text-muted">
                            Building on 25+ years of agricultural excellence
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'values' && (
                    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                      <p className="lead text-muted mb-4">
                        Our core values guide everything we do, from soil preparation to community engagement.
                      </p>
                      <div className="d-flex flex-wrap gap-3">
                        {['Environmental Stewardship', 'Community Focus', 'Quality Excellence', 'Sustainable Innovation', 'Local Empowerment'].map((value, index) => (
                          <span
                            key={value}
                            className="px-3 py-2"
                            style={{
                              backgroundColor: 'rgba(34, 139, 34, 0.1)',
                              color: '#228B22',
                              borderRadius: '20px',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              animation: `scaleIn 0.3s ease-out ${index * 0.1}s`
                            }}
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="py-5 position-relative"
        style={{ backgroundColor: '#fff' }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2
              className="display-5 fw-bold mb-3"
              style={{ color: '#2F4F4F' }}
            >
              Fresh From Our Farm
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Hand-picked, organic produce grown with care and sustainable practices
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="col"
                style={{ animation: `scaleIn 0.6s ease-out ${0.1 * index}s` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)'
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2
              className="display-5 fw-bold mb-3"
              style={{ color: '#2F4F4F' }}
            >
              Loved by Our Community
            </h2>
            <p className="lead text-muted">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="col"
                style={{ animation: `slideUp 0.6s ease-out ${0.2 * index}s` }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <MediaGallery
        images={galleryImages}
        title="Experience Our Farm"
        description="Take a visual journey through our sustainable farming practices and beautiful landscape"
      />

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes scrollBounce {
            0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
            40% { transform: translateX(-50%) translateY(-10px); }
            60% { transform: translateX(-50%) translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;