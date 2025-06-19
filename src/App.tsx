import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ServicesPage from './components/ServicesPage';
import CommunitiesPage from './components/CommunitiesPage';
import Cart from './components/Cart';
import { useCart } from './hooks/useCart';
import StatsPage from './components/Stats';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems
  } = useCart();

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Page change with loading
  const handlePageChange = (page: string) => {
    if (page === currentPage) return;
    
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageLoading(false);
    }, 300);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'products':
        return <ProductsPage onAddToCart={addToCart} />;
      case 'services':
        return <ServicesPage />;
      case 'communities':
        return <CommunitiesPage />;
      case 'stats':
        return <StatsPage/>
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        cartItemCount={getTotalItems()}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <AnimatePresence mode="wait">
        {pageLoading ? (
          <LoadingScreen key="page-loading" />
        ) : (
          <div key={currentPage}>
            {renderCurrentPage()}
          </div>
        )}
      </AnimatePresence>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}

export default App;