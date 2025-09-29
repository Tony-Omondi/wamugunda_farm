// pages/Home.tsx
import React from 'react';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import MediaGallery from '../components/MediaGallery';

const Home = () => {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('about');

  // Static product data
  const featuredProducts = [
    {
      id: 1,
      name: "Mangoes",
      description: "Sweet and juicy mangoes harvested at peak ripeness",
      price: "KSh 250/kg",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcEnfGLLTl8WW09ESF7dP7IhYH_wshgElqxmwyBR4ha4FNSNiARBMUFglrT6BbtiZ_y0z_Z_8SWPRlWQ8eZRvXE5Ji-Up5ZX3NwxW-PH4MF42eIv8Hz4wzJJZBNzDCdGnkrg0hhiVlK_8ZywOuDt2eC7ubWCHZ5JLeu45Z902cBxxLk5aaCCZ8zgPt2H9Hd4ynS4ViQCxEh4HIuw3eUG848aPiz5zxJMsPjDqRN9HcPsjDhcxjmY7c56HvRyaa46q6KKUTmeZ6u78N",
      category: "fruits",
      inStock: true,
      badge: "Organic"
    },
    {
      id: 2,
      name: "Avocados",
      description: "Creamy and rich Hass avocados, perfect for your recipes",
      price: "KSh 180/kg",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-9BbBTLkQjt3x7lrxrcEH3Y5AlA0u3oHRRLeIdji2SewnV_bJ6BUTL5_M9awX-BWtjfdtLj0Jr2g9OCf_dtZe-teEB9L8YKiqQdpSLHpz8z5DFPoWYPwRDNGtU295TXkYhBHi1GMbjLlZXjoOiePXPMt3D32bfN6gVv_B1yxtIvfvDUccW22RoRY5AuPd-uywKTvQYj7sfIYSla3v5GQl9DblSpFERwC9IQKa3msx3Tt2i6HbZ-GPyGx5NjRBtOtxLmOFpETw_DFK",
      category: "fruits",
      inStock: true,
      badge: "Local Favorite"
    },
    {
      id: 3,
      name: "Macadamia Oil",
      description: "Cold-pressed premium oil from our organic macadamia nuts",
      price: "KSh 1200/bottle",
      imageUrl: "https://images.unsplash.com/photo-1621277222927-84a728a5d9a0?w=500&h=400&fit=crop",
      category: "processed",
      inStock: true,
      badge: "Value Added"
    }
  ];

  // Static testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Aisha Kamau",
      location: "Nairobi",
      date: "2 months ago",
      rating: 5,
      comment: "The freshest produce I've ever had! The mangoes were incredibly sweet and the avocados were perfectly ripe. Highly recommend!",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3pbveEoD1dHXdT5dc99UhjnC7Ycq8f6jOEb_gScuCwqnQjPffbzKIqazJWoGCRvlZnSNWsE1ZTUOYxuv2vckQx7e8z33XtCwEnuME9VFNbppIZweND2JxHoUNkjqH5nEaQ9DyoP0BN24y8U-YA_RYJ0CO5f63B043U1FK8d0in6GX6Usv_2NtjHmRNxqjGM2v4tATAN44CQ2qlnDxzO5W-giFxvDspEMKaZRW9w2s3sbhIhYGSUJ1upZloE_RVhXBnq7SGBAn6IUgB"
    },
    {
      id: 2,
      name: "John Mwangi",
      location: "Murang'a",
      date: "1 month ago",
      rating: 5,
      comment: "As a local chef, I appreciate the quality and consistency of Wamugunda Farm products. Their sustainable practices make me proud to support them.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Grace Wanjiku",
      location: "Thika",
      date: "3 weeks ago",
      rating: 5,
      comment: "The macadamia oil has transformed my cooking! Knowing it's locally produced with care makes it even more special.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Static gallery data
  const galleryImages = [
    {
      id: 1,
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa7ula4vPOMWjG1wDpvdxIt-zJ90OyCsIMt4x_z24iKDRwQ5cEsBTquUVX9BLpamGu8GUfCz59lk0RoIdPi9WUHN_rwnmZQliEoGGzQtG6jx7Jx6FUMy31Vi9WE1Txe_NPPwz8l2AAxzOeFZtL9JBUhrLUtYs0APiMr3aFdmaE-SrrMOyyzJm6MCR39rl-PTj4yt3_bD0nyEfIQIt83cWjuT7DNeIw7BA7z1JJ88wfdr-BBaxvBNVYmfR0kOUMlf75FYdbYOnsnGFy",
      alt: "Farm landscape at sunrise"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
      alt: "Harvesting fresh mangoes"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
      alt: "Organic farming practices"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&h=400&fit=crop",
      alt: "Community workers harvesting"
    }
  ];

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    
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

  return (
    <div id="home">
      {/* Enhanced Hero Section */}
      <section
        className="min-vh-100 d-flex align-items-center justify-content-center text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(24, 33, 17, 0.85) 0%, rgba(34, 139, 34, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBg0sf2TILIMGeLMTzesQHuzHWc7WLLRYlTTyltXvHi2yfNM3YFFe6spaoHrH6UeZjOyzkl1V693yVXv7QFYe47_XF1JOGImqt6E1-ICZ_yRmgosmbx61rYG_iNFhlDRtPTjDdpIuC75DwagU0IQ-0MaAKc1DtcGwVcOP-s8kr_5gKn0bU6PBtrUgmmKBlsqvI1p7dEAdxk8iCGmIkEGu4JJ4XMk7KFnwgBBXkuumUQr1xBbjJSW-W9kWWboesDO2iRRzm-DSzNuEMD") center/cover',
        }}
      >
        {/* Animated background elements */}
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
              onClick={() => document.getElementById('about-mission').scrollIntoView({ behavior: 'smooth' })}
            >
              Our Story
            </button>
          </div>
          
          {/* Scroll indicator */}
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
                
                {/* Tab Navigation */}
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
                
                {/* Tab Content */}
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

      {/* Enhanced Featured Products */}
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
            {featuredProducts.map((product, index) => (
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

      {/* Enhanced Testimonials */}
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

      {/* Enhanced Gallery */}
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