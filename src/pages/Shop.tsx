
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from './Cart';
import api from '../api/api';
import type { Produce, Category } from '../api/api';

// Fallback data for products
const FALLBACK_PRODUCTS: Produce[] = [
  {
    id: 1,
    name: 'Mangoes',
    category: { id: 1, name: 'Fruits' },
    description: 'Sweet and juicy mangoes harvested at peak ripeness.',
    price: 'KSh 250/kg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcEnfGLLTl8WW09ESF7dP7IhYH_wshgElqxmwyBR4ha4FNSNiARBMUFglrT6BbtiZ_y0z_Z_8SWPRlWQ8eZRvXE5Ji-Up5ZX3NwxW-PH4MF42eIv8Hz4wzJJZBNzDCdGnkrg0hhiVlK_8ZywOuDt2eC7ubWCHZ5JLeu45Z902cBxxLk5aaCCZ8zgPt2H9Hd4ynS4ViQCxEh4HIuw3eUG848aPiz5zxJMsPjDqRN9HcPsjDhcxjmY7c56HvRyaa46q6KKUTmeZ6u78N',
    available: true,
    seasonal: true,
    stock_quantity: 100,
    is_organic: true,
    rating: 4.8,
    review_count: 124,
    delivery_time: '1-2 days',
    badge: 'Best Seller',
    images: [],
    nutrition: [],
    benefits: [],
  },
  {
    id: 2,
    name: 'Avocados',
    category: { id: 1, name: 'Fruits' },
    description: 'Creamy and rich Hass avocados, perfect for your recipes.',
    price: 'KSh 180/kg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-9BbBTLkQjt3x7lrxrcEH3Y5AlA0u3oHRRLeIdji2SewnV_bJ6BUTL5_M9awX-BWtjfdtLj0Jr2g9OCf_dtZe-teEB9L8YKiqQdpSLHpz8z5DFPoWYPwRDNGtU295TXkYhBHi1GMbjLlZXjoOiePXPMt3D32bfN6gVv_B1yxtIvfvDUccW22RoRY5AuPd-uywKTvQYj7sfIYSla3v5GQl9DblSpFERwC9IQKa3msx3Tt2i6HbZ-GPyGx5NjRBtOtxLmOFpETw_DFK',
    available: true,
    seasonal: true,
    stock_quantity: 150,
    is_organic: true,
    rating: 4.6,
    review_count: 89,
    delivery_time: '1-2 days',
    badge: 'Local Favorite',
    images: [],
    nutrition: [],
    benefits: [],
  },
  {
    id: 3,
    name: 'Bananas',
    category: { id: 1, name: 'Fruits' },
    description: 'Fresh and ripe bananas, rich in potassium and energy.',
    price: 'KSh 120/bunch',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqqGFwZvA0gjvfO25amMlhZeGgyv7YsRSSinI5DECd1l8Zz7DfiNogYNX7eBDTlFglp3XLEP2phsdhcdaWl9lzVfQUw9OBbPIDvYNbWNqmsdVmrjStZZ20wSREBIpWnxbrq4ShTDdV3tJfrdYXsLqHkmP6ddISGJ1f89uENyGeEtA0lwIwRd8S793lFiOw6lg6yhGFC6grAzfmg_5Q5-b5yZtTsBvTMsUZZJZ2mpNcxz48wZ7wa5zCwdd5m57_fVxULnaIUA78KITW',
    available: true,
    seasonal: true,
    stock_quantity: 200,
    is_organic: false,
    rating: 4.4,
    review_count: 67,
    delivery_time: 'Same day',
    images: [],
    nutrition: [],
    benefits: [],
  },
  {
    id: 4,
    name: 'Pineapples',
    category: { id: 1, name: 'Fruits' },
    description: 'Tangy and refreshing pineapples, perfect for juices and desserts.',
    price: 'KSh 200/ea',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFy6CObgFjdoPOrbucVVZ_zMZ1WvJrkDtPDkoD931RUYRIpR6lz7Z1QBlmIpsGovpT3cHnbSUiq4ZvXjfPMuce6ALaN8UYGS46Hv1aRPceDYWn-P7irLI9aJ0c-J54urWawoyi67v6lBcgPZxYHqqsz3LQamKUyzDsoYrj4kzKPcn_X0qXeK5rla-u1P_YoF6i7Aiu_uey4f_6aaVXj_sbp4xSvh4bxpL8UxjG-k06jHICy4k2W2p6Xe5lonQMQu5qos1GwI4eUaba',
    available: false,
    seasonal: true,
    stock_quantity: 0,
    is_organic: true,
    rating: 4.7,
    review_count: 93,
    delivery_time: '2-3 days',
    badge: 'Seasonal',
    images: [],
    nutrition: [],
    benefits: [],
  },
  {
    id: 5,
    name: 'Macadamia Nuts',
    category: { id: 2, name: 'Nuts & Seeds' },
    description: 'Premium quality macadamia nuts, rich and buttery.',
    price: 'KSh 800/kg',
    image: 'https://images.unsplash.com/photo-1621277222927-84a728a5d9a0?w=500&h=400&fit=crop',
    available: true,
    seasonal: false,
    stock_quantity: 50,
    is_organic: true,
    rating: 4.9,
    review_count: 45,
    delivery_time: '2-3 days',
    badge: 'Premium',
    images: [],
    nutrition: [],
    benefits: [],
  },
  {
    id: 6,
    name: 'Fresh Kale',
    category: { id: 3, name: 'Vegetables' },
    description: 'Organic kale packed with nutrients and vitamins.',
    price: 'KSh 150/bunch',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=400&fit=crop',
    available: true,
    seasonal: true,
    stock_quantity: 100,
    is_organic: true,
    rating: 4.3,
    review_count: 78,
    delivery_time: 'Same day',
    images: [],
    nutrition: [],
    benefits: [],
  },
];

// Fallback data for categories
const FALLBACK_CATEGORIES: Category[] = [
  { id: 1, name: 'Fruits', description: 'Fresh Fruits' },
  { id: 2, name: 'Nuts & Seeds', description: 'Nuts and Seeds' },
  { id: 3, name: 'Vegetables', description: 'Fresh Vegetables' },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<(Produce & { quantity: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const [products, setProducts] = useState<Produce[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [produceData, categoriesData] = await Promise.all([
          api.getProduceList(),
          api.getCategories(),
        ]);
        setProducts(produceData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError('Failed to load products or categories. Using fallback data.');
        setProducts(FALLBACK_PRODUCTS);
        setCategories(FALLBACK_CATEGORIES);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Derived categories for filtering
  const filterCategories = [
    { id: 'all', name: 'All Products', count: products.length },
    ...categories.map(category => ({
      id: category.name.toLowerCase(),
      name: category.name,
      count: products.filter(p => p.category.name === category.name).length,
    })),
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category.name.toLowerCase() === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''));
        case 'price-high':
          return parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product: Produce) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setNotification({ message: `${product.name} added to cart!`, type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout! Total items: ' + cartItems.length);
    // Implement checkout logic here
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
            margin: '0 auto',
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
            marginTop: '1rem',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div id="shop" className="py-5" style={{ minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              color: '#2F4F4F',
              background: 'linear-gradient(135deg, #2F4F4F 0%, #228B22 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Fresh Farm Products
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Discover our selection of fresh, organic produce grown with care and sustainable practices
          </p>
        </div>

        {/* Controls Bar */}
        <div className="row g-3 mb-5">
          <div className="col-md-6">
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control form-control-lg"
                style={{
                  borderRadius: '50px',
                  paddingLeft: '3rem',
                  border: '2px solid rgba(34, 139, 34, 0.2)',
                  fontSize: '1rem',
                }}
              />
              <span
                className="position-absolute top-50 start-0 translate-middle-y ms-3"
                style={{ color: 'rgba(34, 139, 34, 0.6)', fontSize: '1.25rem' }}
              >
                🔍
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select form-select-lg"
              style={{
                borderRadius: '50px',
                border: '2px solid rgba(34, 139, 34, 0.2)',
                fontSize: '1rem',
              }}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <div className="col-md-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-lg w-100 position-relative"
              style={{
                background: 'linear-gradient(135deg, #228B22 0%, #1B691B 100%)',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '50px',
                border: 'none',
              }}
            >
              🛒 View Cart
              {cartItems.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: '#DC3545',
                    color: '#fff',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="d-flex justify-content-center mb-5">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {filterCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`btn text-capitalize ${selectedCategory === category.id ? 'btn-success' : 'btn-outline-success'}`}
                style={{
                  borderRadius: '25px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
              >
                {category.name}
                <span className="badge bg-light text-dark ms-2" style={{ fontSize: '0.75rem' }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="text-muted mb-0">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="btn btn-sm btn-outline-secondary"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3">
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onClick={() => window.location.href = `/product/${product.id}`}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌾</div>
            <h5 className="text-muted mb-3">No products found</h5>
            <p className="text-muted mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn btn-success"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div
            className="position-fixed top-0 end-0 m-4 p-3 rounded shadow"
            style={{
              backgroundColor: notification.type === 'success' ? '#228B22' : '#DC3545',
              color: '#fff',
              zIndex: 1060,
              animation: 'slideInRight 0.3s ease-out',
            }}
          >
            {notification.message}
          </div>
        )}

        {/* Cart Component */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>

      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Shop;
