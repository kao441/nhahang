import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TableReservationModal } from './components/common/TableReservationModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SearchModal } from './components/common/SearchModal';
import { ToastNotification } from './components/common/ToastNotification';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { LocationsPage } from './pages/LocationsPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPages } from './pages/AuthPages';
import { UserAccountPage } from './pages/UserAccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [paramId, setParamId] = useState<string | undefined>(undefined);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  const { isSearchOpen, closeSearchModal } = useCart();

  const handleNavigate = (tab: string, param?: string) => {
    setActiveTab(tab);
    if (param) setParamId(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (orderId: string) => {
    setConfirmedOrderId(orderId);
    setActiveTab('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-zinc-100 font-sans antialiased selection:bg-rose-600 selection:text-white">
      
      {/* Header */}
      <Header activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Page View */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage onNavigate={handleNavigate} />}
        {activeTab === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {activeTab === 'products' && (
          <ProductsPage 
            selectedCategory={paramId} 
            onNavigateDetail={(id) => handleNavigate('product-detail', id)} 
          />
        )}
        {activeTab === 'product-detail' && (
          <ProductDetailPage 
            productId={paramId || 'p-1'} 
            onNavigateDetail={(id) => handleNavigate('product-detail', id)} 
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'cart' && <CartPage onNavigate={handleNavigate} />}
        {activeTab === 'checkout' && (
          <CheckoutPage 
            onOrderSuccess={handleOrderSuccess} 
            onNavigate={handleNavigate} 
          />
        )}
        {activeTab === 'order-confirmation' && (
          <OrderConfirmationPage 
            orderId={confirmedOrderId} 
            onNavigate={handleNavigate} 
          />
        )}
        {activeTab === 'promotions' && <PromotionsPage onNavigate={handleNavigate} />}
        {activeTab === 'locations' && <LocationsPage />}
        {activeTab === 'blog-list' && (
          <BlogListPage onNavigateDetail={(id) => handleNavigate('blog-detail', id)} />
        )}
        {activeTab === 'blog-detail' && (
          <BlogDetailPage 
            blogId={paramId} 
            onNavigateBlogList={() => handleNavigate('blog-list')} 
            onNavigateDetail={(id) => handleNavigate('blog-detail', id)}
          />
        )}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'auth' && <AuthPages onSuccess={() => handleNavigate('account')} />}
        {activeTab === 'account' && (
          <UserAccountPage 
            initialSubTab={paramId}
            onNavigateDetail={(id) => handleNavigate('product-detail', id)}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Overlays */}
      <TableReservationModal />
      <QuickViewModal onNavigateDetail={(id) => handleNavigate('product-detail', id)} />
      {isSearchOpen && <SearchModal onNavigateDetail={(id) => handleNavigate('product-detail', id)} />}
      <ToastNotification />

    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
