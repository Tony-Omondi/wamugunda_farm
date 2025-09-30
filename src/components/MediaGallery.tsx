import React, { useState, useEffect } from 'react';
import api from '../api/api';
import type { Produce, Testimonial, Media, Category, Customer, Order, OrderItem, ProduceImage, NutritionInfo, HealthBenefit } from '../api/api';

const MediaGallery = ({ images = [], title = "Gallery", description }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    // Preload images for better performance
    images.forEach((image) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [image.id]: true }));
      };
      img.onerror = () => {
        setLoadedImages(prev => ({ ...prev, [image.id]: false }));
      };
    });
  }, [images]);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <section style={{ 
      marginTop: '4rem', 
      marginBottom: '4rem',
      padding: '2rem 0',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #e8f5e8 100%)'
    }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            color: '#2F4F4F', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #2F4F4F 0%, #228B22 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {title}
          </h2>
          {description && (
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(47, 79, 79, 0.8)', 
              marginBottom: '0',
              maxWidth: '600px', 
              marginLeft: 'auto', 
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
              {description}
            </p>
          )}
        </div>
        
        {/* Gallery Grid */}
        {images.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(47, 79, 79, 0.8)' }}>
            No images available.
          </p>
        ) : (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
            {images.map((image, index) => (
              <div 
                key={image.id} 
                className="col"
                style={{ 
                  animation: `scaleIn 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div
                  className="gallery-item"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    aspectRatio: '1/1',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onClick={() => openModal(image, index)}
                >
                  {/* Loading Skeleton */}
                  {!loadedImages[image.id] && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(34, 139, 34, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '16px'
                    }}>
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

                  {/* Hover Overlay */}
                  <div
                    className="gallery-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.9) 0%, rgba(27, 105, 27, 0.8) 100%)',
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      color: '#fff',
                      fontSize: '1.5rem',
                      marginBottom: '0.5rem',
                      transform: 'translateY(20px)',
                      transition: 'transform 0.3s ease'
                    }}>🔍</div>
                    <p style={{
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      margin: 0,
                      transform: 'translateY(20px)',
                      transition: 'transform 0.3s ease 0.1s',
                      opacity: 0
                    }}>
                      Click to view
                    </p>
                    {image.caption && (
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '0.8rem',
                        margin: '0.5rem 0 0 0',
                        transform: 'translateY(20px)',
                        transition: 'transform 0.3s ease 0.2s',
                        opacity: 0
                      }}>
                        {image.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Image Modal */}
        {selectedImage && (
          <div 
            className="modal-backdrop show d-block" 
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
            onClick={closeModal}
          >
            <div 
              className="position-relative h-100 d-flex align-items-center justify-content-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ×
              </button>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: 'absolute',
                      left: '2rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    ‹
                  </button>

                  <button
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      right: '2rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  {currentIndex + 1} / {images.length}
                </div>
              )}

              {/* Image Content */}
              <div style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                position: 'relative'
              }}>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    animation: 'zoomIn 0.3s ease-out'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400';
                  }}
                />
                
                {/* Image Info */}
                <div style={{
                  textAlign: 'center',
                  marginTop: '1.5rem',
                  color: '#fff'
                }}>
                  <h4 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    {selectedImage.alt}
                  </h4>
                  {selectedImage.caption && (
                    <p style={{ 
                      fontSize: '1rem', 
                      opacity: 0.8,
                      margin: 0,
                      maxWidth: '500px'
                    }}>
                      {selectedImage.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes scaleIn {
            from { 
              opacity: 0; 
              transform: scale(0.8); 
            }
            to { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          @keyframes zoomIn {
            from { 
              opacity: 0; 
              transform: scale(0.9); 
            }
            to { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .gallery-item:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(34, 139, 34, 0.3);
          }

          .gallery-item:hover .gallery-overlay {
            opacity: 1;
          }

          .gallery-item:hover .gallery-overlay > * {
            transform: translateY(0);
            opacity: 1;
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .modal-backdrop .position-relative {
              padding: 1rem;
            }
            
            .modal-backdrop button {
              width: 40px !important;
              height: 40px !important;
              fontSize: 1.25rem !important;
            }
            
            .modal-backdrop button:first-of-type {
              top: 1rem !important;
              right: 1rem !important;
            }
            
            .modal-backdrop button:nth-of-type(2),
            .modal-backdrop button:nth-of-type(3) {
              width: 45px !important;
              height: 45px !important;
              fontSize: 1.25rem !important;
            }
            
            .modal-backdrop button:nth-of-type(2) {
              left: 1rem !important;
            }
            
            .modal-backdrop button:nth-of-type(3) {
              right: 1rem !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default MediaGallery;