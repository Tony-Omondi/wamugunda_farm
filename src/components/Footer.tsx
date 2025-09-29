// components/Footer.tsx
import React, { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setEmail('');
    setIsLoading(false);
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ 
      borderTop: '1px solid rgba(34, 139, 34, 0.2)', 
      backgroundColor: '#f8f9fa',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)'
    }}>
      <div className="container px-4 py-5" style={{ maxWidth: '1140px' }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5">
          {/* Brand Section */}
          <div className="col d-flex flex-column gap-4">
            <div className="d-flex align-items-center gap-3" style={{ animation: 'slideUp 0.6s ease-out' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(34, 139, 34, 0.2)'
              }}>
                <span style={{ fontSize: '1.5rem', color: 'white' }}>🌱</span>
              </div>
              <div>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2F4F4F' }}>Wamugunda Farm</span>
                <p style={{ fontSize: '0.75rem', color: '#228B22', fontWeight: '600', margin: 0 }}>
                  From Soil to Soul
                </p>
              </div>
            </div>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(47, 79, 79, 0.8)',
              lineHeight: '1.6',
              animation: 'slideUp 0.6s ease-out 0.1s'
            }}>
              Fresh, organic produce grown with care in the heart of Kenya. 
              Committed to sustainability, community, and quality since 1995.
            </p>
            <div className="d-flex gap-3" style={{ animation: 'slideUp 0.6s ease-out 0.2s' }}>
              <SocialLink href="#" icon="instagram" />
              <SocialLink href="#" icon="facebook" />
              <SocialLink href="#" icon="twitter" />
              <SocialLink href="#" icon="whatsapp" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col" style={{ animation: 'slideUp 0.6s ease-out 0.3s' }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: '#2F4F4F', 
              marginBottom: '1.5rem',
              position: 'relative'
            }}>
              Quick Links
              <div style={{
                width: '30px',
                height: '3px',
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                borderRadius: '2px',
                marginTop: '0.5rem'
              }}></div>
            </h3>
            <ul className="list-unstyled">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Shop', id: 'shop' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Testimonials', id: 'testimonials' },
                { name: 'About & Mission', id: 'about-mission' }
              ].map((link, index) => (
                <li key={link.id} style={{ marginBottom: '0.75rem' }}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    style={{ 
                      fontSize: '0.875rem', 
                      color: 'rgba(47, 79, 79, 0.8)', 
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      animation: `slideUp 0.6s ease-out ${0.4 + index * 0.1}s`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#228B22';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'rgba(47, 79, 79, 0.8)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span style={{ marginRight: '8px', color: '#228B22' }}>›</span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col" style={{ animation: 'slideUp 0.6s ease-out 0.4s' }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: '#2F4F4F', 
              marginBottom: '1.5rem',
              position: 'relative'
            }}>
              Contact Us
              <div style={{
                width: '30px',
                height: '3px',
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                borderRadius: '2px',
                marginTop: '0.5rem'
              }}></div>
            </h3>
            <ul className="list-unstyled">
              <ContactItem 
                icon="geo-alt" 
                text="Murang'a County, Kenya"
                description="Central Kenya"
                delay="0.5s"
              />
              <ContactItem 
                icon="telephone" 
                text="+254 712 345 678"
                description="Mon-Sun, 6AM-6PM"
                delay="0.6s"
              />
              <ContactItem 
                icon="envelope" 
                text="info@wamugundafarm.com"
                description="We reply within 24h"
                delay="0.7s"
              />
              <ContactItem 
                icon="clock" 
                text="Farm Visits"
                description="By appointment only"
                delay="0.8s"
              />
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col" style={{ animation: 'slideUp 0.6s ease-out 0.5s' }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: '#2F4F4F', 
              marginBottom: '1.5rem',
              position: 'relative'
            }}>
              Stay Updated
              <div style={{
                width: '30px',
                height: '3px',
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                borderRadius: '2px',
                marginTop: '0.5rem'
              }}></div>
            </h3>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(47, 79, 79, 0.8)', 
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Get the latest updates on new products, seasonal offers, and farming insights directly to your inbox.
            </p>
            
            {isSubscribed ? (
              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                border: '1px solid #c3e6cb',
                borderRadius: '12px',
                textAlign: 'center',
                animation: 'scaleIn 0.3s ease-out'
              }}>
                <div style={{ color: '#155724', fontWeight: '600', fontSize: '0.875rem' }}>
                  ✅ Thank you for subscribing!
                </div>
                <div style={{ color: '#155724', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  Welcome to the Wamugunda family!
                </div>
              </div>
            ) : (
              <NewsletterForm 
                email={email}
                setEmail={setEmail}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ 
          marginTop: '4rem', 
          borderTop: '1px solid rgba(34, 139, 34, 0.2)', 
          paddingTop: '2rem'
        }} className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(47, 79, 79, 0.7)',
              margin: 0
            }}>
              © {currentYear} Wamugunda Farm. From Soil to Soul.
            </p>
            <div style={{
              width: '4px',
              height: '4px',
              backgroundColor: 'rgba(47, 79, 79, 0.3)',
              borderRadius: '50%',
              display: 'flex'
            }}></div>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(47, 79, 79, 0.7)',
              margin: 0
            }}>
              Est. 1995 • Murang'a, Kenya
            </p>
          </div>
          <div className="d-flex gap-4">
            <FooterLink href="#" text="Privacy Policy" />
            <FooterLink href="#" text="Terms of Service" />
            <FooterLink href="#" text="Shipping Info" />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </footer>
  );
};

// Enhanced Social Link Component
const SocialLink = ({ href, icon }: { href: string; icon: string }) => {
  const icons = {
    instagram: (
      <svg style={{ height: '20px', width: '20px' }} fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
      </svg>
    ),
    facebook: (
      <svg style={{ height: '20px', width: '20px' }} fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
      </svg>
    ),
    twitter: (
      <svg style={{ height: '20px', width: '20px' }} fill="currentColor" viewBox="0 0 256 256">
        <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
      </svg>
    ),
    whatsapp: (
      <svg style={{ height: '20px', width: '20px' }} fill="currentColor" viewBox="0 0 256 256">
        <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
      </svg>
    )
  };

  return (
    <a
      href={href}
      style={{ 
        color: 'rgba(47, 79, 79, 0.7)', 
        textDecoration: 'none',
        padding: '10px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.5)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.backgroundColor = '#228B22';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 139, 34, 0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.color = 'rgba(47, 79, 79, 0.7)';
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {icons[icon as keyof typeof icons]}
      <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>{icon}</span>
    </a>
  );
};

// Enhanced Contact Item Component
const ContactItem = ({ icon, text, description, delay }: { icon: string; text: string; description?: string; delay?: string }) => (
  <li className="d-flex align-items-start gap-3" style={{ 
    marginBottom: '1rem',
    animation: `slideUp 0.6s ease-out ${delay}` 
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <span style={{ color: 'white', fontSize: '0.875rem' }} className={`bi bi-${icon}`}></span>
    </div>
    <div>
      <div style={{ fontSize: '0.875rem', color: '#2F4F4F', fontWeight: '600' }}>{text}</div>
      {description && (
        <div style={{ fontSize: '0.75rem', color: 'rgba(47, 79, 79, 0.6)' }}>{description}</div>
      )}
    </div>
  </li>
);

// Enhanced Newsletter Form Component
const NewsletterForm = ({ email, setEmail, onSubmit, isLoading }: { 
  email: string; 
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}) => {
  return (
    <form className="d-flex flex-column gap-3" onSubmit={onSubmit}>
      <div style={{ position: 'relative' }}>
        <input
          className="form-control"
          style={{ 
            padding: '0.75rem 1rem',
            fontSize: '0.875rem', 
            border: '1px solid rgba(34, 139, 34, 0.3)', 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(34, 139, 34, 0.1)'
          }}
          placeholder="Enter your email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#228B22';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 139, 34, 0.2)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(34, 139, 34, 0.3)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 139, 34, 0.1)';
          }}
        />
        <span style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(47, 79, 79, 0.4)',
          fontSize: '0.875rem'
        }}>✉️</span>
      </div>
      <button
        className="btn d-flex align-items-center justify-content-center gap-2"
        style={{ 
          background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)', 
          color: '#fff', 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '12px', 
          border: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)'
        }}
        type="submit"
        disabled={isLoading}
        onMouseOver={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 139, 34, 0.4)';
          }
        }}
        onMouseOut={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 139, 34, 0.3)';
          }
        }}
      >
        {isLoading ? (
          <>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: '2px solid currentColor',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Subscribing...
          </>
        ) : (
          <>
            Subscribe to Updates
            <span style={{ fontSize: '1rem' }}>📬</span>
          </>
        )}
      </button>
      <p style={{ 
        fontSize: '0.75rem', 
        color: 'rgba(47, 79, 79, 0.6)',
        textAlign: 'center',
        margin: 0
      }}>
        No spam, unsubscribe at any time
      </p>
    </form>
  );
};

// Footer Link Component
const FooterLink = ({ href, text }: { href: string; text: string }) => (
  <a
    href={href}
    style={{ 
      fontSize: '0.875rem', 
      color: 'rgba(47, 79, 79, 0.7)', 
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.color = '#228B22';
      e.currentTarget.style.transform = 'translateY(-1px)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.color = 'rgba(47, 79, 79, 0.7)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {text}
  </a>
);

export default Footer;