import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ProfilePage } from './components/ProfilePage';
import { WishlistPage } from './components/WishlistPage';
import { SearchPage } from './components/SearchPage';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { NotificationSystem } from './components/NotificationSystem';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { CartItem, Product, User, Address, Notification, Review, Order } from './types';
import { products } from './data/mockData';

type Page = 'home' | 'category' | 'product' | 'cart' | 'checkout' | 'login' | 'register' | 'profile' | 'wishlist' | 'search' | 'payment-success';

interface AppState {
  currentPage: Page;
  selectedCategory: string | null;
  selectedProduct: string | null;
  searchQuery: string;
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  isLoggedIn: boolean;
  notifications: Notification[];
  reviews: Review[];
}

export default function App() {
  const API_BASE: string = (import.meta as any)?.env?.VITE_API_BASE_URL || 'http://localhost:5000';
  const [state, setState] = useState<AppState>({
    currentPage: 'home',
    selectedCategory: null,
    selectedProduct: null,
    searchQuery: '',
    cart: [],
    wishlist: [],
    user: null,
    isLoggedIn: false,
    notifications: [],
    reviews: []
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vintageVaultCart');
    const savedWishlist = localStorage.getItem('vintageVaultWishlist');
    const savedUser = localStorage.getItem('vintageVaultUser');
    const savedReviews = localStorage.getItem('vintageVaultReviews');
    
    if (savedCart) {
      setState(prev => ({ ...prev, cart: JSON.parse(savedCart) }));
    }
    if (savedWishlist) {
      setState(prev => ({ ...prev, wishlist: JSON.parse(savedWishlist) }));
    }
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && Array.isArray(parsed.orders)) {
          parsed.orders = parsed.orders.map((o: any) => ({
            ...o,
            date: o?.date ? new Date(o.date) : new Date(),
          }));
        }
        setState(prev => ({ 
          ...prev, 
          user: parsed, 
          isLoggedIn: true 
        }));
      } catch {
        // if parse fails, clear corrupted user
        localStorage.removeItem('vintageVaultUser');
      }
    }
    if (savedReviews) {
      setState(prev => ({ ...prev, reviews: JSON.parse(savedReviews) }));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vintageVaultCart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vintageVaultWishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('vintageVaultReviews', JSON.stringify(state.reviews));
  }, [state.reviews]);

  const handleNavigate = (page: Page, data?: any) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
      selectedCategory: data?.category || prev.selectedCategory,
      selectedProduct: data?.product || prev.selectedProduct,
      searchQuery: data?.query || prev.searchQuery
    }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setState(prev => ({
      ...prev,
      currentPage: 'category',
      selectedCategory: categoryId
    }));
  };

  const handleProductClick = (productId: string) => {
    setState(prev => ({
      ...prev,
      currentPage: 'product',
      selectedProduct: productId
    }));
  };

  const handleSearch = (query: string) => {
    setState(prev => ({
      ...prev,
      currentPage: 'search',
      searchQuery: query
    }));
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setState(prev => {
      const existingItem = prev.cart.find(item => item.product.id === product.id);
      
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'cart',
        message: `✅ Added ${product.name} to cart!`,
        action: {
          label: 'View Cart',
          callback: () => handleNavigate('cart')
        },
        isVisible: true
      };
      
      if (existingItem) {
        const updatedCart = prev.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { 
          ...prev, 
          cart: updatedCart,
          notifications: [...prev.notifications, newNotification]
        };
      } else {
        const newCart = [...prev.cart, { product, quantity }];
        return { 
          ...prev, 
          cart: newCart,
          notifications: [...prev.notifications, newNotification]
        };
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.product.id !== productId)
    }));
    toast.success('Removed item from cart');
  };

  const handleToggleWishlist = (productId: string) => {
    setState(prev => {
      const isInWishlist = prev.wishlist.includes(productId);
      const product = products.find(p => p.id === productId);
      
      if (isInWishlist) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'wishlist',
          message: `Removed ${product?.name} from wishlist`,
          isVisible: true
        };
        
        return {
          ...prev,
          wishlist: prev.wishlist.filter(id => id !== productId),
          notifications: [...prev.notifications, newNotification]
        };
      } else {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'wishlist',
          message: `💖 Added ${product?.name} to wishlist!`,
          action: {
            label: 'View Wishlist',
            callback: () => handleNavigate('wishlist')
          },
          isVisible: true
        };
        
        return {
          ...prev,
          wishlist: [...prev.wishlist, productId],
          notifications: [...prev.notifications, newNotification]
        };
      }
    });
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Mock login - in real app, this would validate against backend
    const mockUser: User = {
      id: '1',
      name: 'John Collector',
      email: credentials.email,
      phone: '+1-555-0123',
      addresses: [],
      orders: [],
      wishlist: state.wishlist
    };
    
    setState(prev => ({
      ...prev,
      user: mockUser,
      isLoggedIn: true,
      currentPage: 'home'
    }));
    
    localStorage.setItem('vintageVaultUser', JSON.stringify(mockUser));
    toast.success('Welcome back to Vintage Vault!');
  };

  const handleRegister = (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
  }) => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      addresses: userData.address ? [{
        id: '1',
        name: userData.name,
        street: userData.address,
        city: '',
        state: '',
        zipCode: '',
        phone: userData.phone,
        isDefault: true
      }] : [],
      orders: [],
      wishlist: state.wishlist
    };
    
    setState(prev => ({
      ...prev,
      user: newUser,
      isLoggedIn: true,
      currentPage: 'home'
    }));
    
    localStorage.setItem('vintageVaultUser', JSON.stringify(newUser));
    toast.success('Account created successfully! Welcome to Vintage Vault!');
  };

  const handleLogout = () => {
    setState(prev => ({
      ...prev,
      user: null,
      isLoggedIn: false,
      currentPage: 'home'
    }));
    localStorage.removeItem('vintageVaultUser');
    toast.success('Logged out successfully');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setState(prev => ({ ...prev, user: updatedUser }));
    localStorage.setItem('vintageVaultUser', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
  };

  const handlePlaceOrder = async (orderData: any) => {
    try {
      if (!state.user) {
        toast.error('Please login first');
        return;
      }
      const payload = {
        items: state.cart.map(ci => ({
          productId: ci.product.id,
          name: ci.product.name,
          image: ci.product.image,
          price: ci.product.price,
          quantity: ci.quantity,
        })),
        subtotal: state.cart.reduce((t, i) => t + i.product.price * i.quantity, 0),
        tax: Math.round(state.cart.reduce((t, i) => t + i.product.price * i.quantity, 0) * 0.18),
        shipping: (state.cart.reduce((t, i) => t + i.product.price * i.quantity, 0) >= 999 ? 0 : 99),
        total: orderData.total,
        currency: 'USD',
        customer: { name: state.user.name, email: state.user.email, address: orderData.address?.street || '' },
      };
      const endpoint = orderData.paymentMethod === 'cod' ? '/api/orders/cod' : '/api/orders/create';
      const resp = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const j = await resp.json().catch(() => ({}));
        throw new Error(j.error || 'Failed to create order');
      }
      const data = await resp.json();
      if (orderData.paymentMethod === 'cod') {
        // Success locally: clear cart and go to success page
        setState(prev => ({ ...prev, cart: [], currentPage: 'payment-success' }));
        toast.success('Order placed (COD)');
        return;
      }
      // Paypal flow
      if (!data?.approveUrl) throw new Error('No PayPal approval URL returned');
      localStorage.setItem('pendingPaypal', JSON.stringify({ orderId: data.id, paypalOrderId: data.paypalOrderId }));
      window.location.href = data.approveUrl;
    } catch (e: any) {
      toast.error(e.message || 'Order creation failed');
    }
  };

  const handleDismissNotification = (notificationId: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== notificationId)
    }));
  };

  const handleNotificationAction = (notificationId: string) => {
    const notification = state.notifications.find(n => n.id === notificationId);
    if (notification?.action) {
      notification.action.callback();
    }
  };

  const handleAddReview = (productId: string, rating: number, comment: string) => {
    if (!state.user) {
      toast.error('Please log in to leave a review');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      productId,
      userId: state.user.id,
      userName: state.user.name,
      rating,
      comment,
      date: new Date(),
      verified: true
    };

    setState(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview]
    }));

    toast.success('Review added successfully!');
  };

  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'home':
        return (
          <HomePage
            onCategorySelect={handleCategorySelect}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={state.wishlist}
          />
        );

      case 'category':
        return (
          <CategoryPage
            categoryId={state.selectedCategory}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={state.wishlist}
          />
        );

      case 'product':
        return (
          <ProductDetailPage
            productId={state.selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={state.wishlist.includes(state.selectedProduct || '')}
            onNavigateToCategory={handleCategorySelect}
            reviews={state.reviews}
            onAddReview={handleAddReview}
            currentUser={state.user}
          />
        );

      case 'cart':
        return (
          <CartPage
            cart={state.cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onCheckout={() => handleNavigate('checkout')}
            onContinueShopping={() => handleNavigate('home')}
          />
        );

      case 'checkout':
        return (
          <CheckoutPage
            cart={state.cart}
            user={state.user}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => handleNavigate('cart')}
            isLoggedIn={state.isLoggedIn}
            onLoginPrompt={() => handleNavigate('login')}
          />
        );

      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => handleNavigate('register')}
            onBackToHome={() => handleNavigate('home')}
          />
        );

      case 'register':
        return (
          <RegisterPage
            onRegister={handleRegister}
            onNavigateToLogin={() => handleNavigate('login')}
            onBackToHome={() => handleNavigate('home')}
          />
        );

      case 'profile':
        return (
          <ProfilePage
            user={state.user}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
            onBackToHome={() => handleNavigate('home')}
          />
        );

      case 'wishlist':
        return (
          <WishlistPage
            wishlist={state.wishlist}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onContinueShopping={() => handleNavigate('home')}
          />
        );

      case 'search':
        return (
          <SearchPage
            searchQuery={state.searchQuery}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={state.wishlist}
            onNewSearch={handleSearch}
          />
        );

      case 'payment-success':
        return (
          <PaymentSuccessPage
            onContinueShopping={() => handleNavigate('home')}
            onViewProfile={() => handleNavigate('profile')}
          />
        );

      default:
        return <HomePage 
          onCategorySelect={handleCategorySelect}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={state.wishlist}
        />;
    }
  };

  // Handle PayPal return/cancel
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isReturn = params.get('paypalReturn');
    const isCancel = params.get('paypalCancel');
    if (isCancel) {
      localStorage.removeItem('pendingPaypal');
      toast.error('Payment cancelled');
      // clean params from URL
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
      return;
    }
    if (isReturn) {
      const stored = localStorage.getItem('pendingPaypal');
      if (!stored) return;
      const { orderId, paypalOrderId } = JSON.parse(stored);
      (async () => {
        try {
          const resp = await fetch(`${API_BASE}/api/orders/capture`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId, paypalOrderId }),
          });
          if (!resp.ok) throw new Error('Payment capture failed');
          localStorage.removeItem('pendingPaypal');
          // clean params from URL
          const url = new URL(window.location.href);
          url.search = '';
          window.history.replaceState({}, '', url.toString());
          // navigate to success and clear cart
          setState(prev => ({ ...prev, cart: [], currentPage: 'payment-success' }));
          toast.success('Payment completed');
        } catch (err: any) {
          toast.error(err.message || 'Payment capture failed');
        }
      })();
    }
  }, []);

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)]">
      <Navbar
        cartItemsCount={cartItemsCount}
        wishlistCount={state.wishlist.length}
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
        currentPage={state.currentPage}
        onNavigate={(page) => {
          if (page === 'login' && state.isLoggedIn) {
            handleNavigate('profile');
          } else {
            handleNavigate(page as Page);
          }
        }}
      />

      <main>
        {renderCurrentPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
      <BackToTop />
      <NotificationSystem 
        notifications={state.notifications}
        onDismiss={handleDismissNotification}
        onAction={handleNotificationAction}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}