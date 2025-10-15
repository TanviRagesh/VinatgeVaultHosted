export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  vintage?: boolean;
  year?: string;
  material?: string;
  dimensions?: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  originalTotal: number;
  discount: number;
  couponCode?: string;
  status: 'placed' | 'packed' | 'shipped' | 'delivered';
  date: Date;
  address: Address;
  paymentMethod: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  validUntil: Date;
  image?: string;
  type: 'percentage' | 'fixed' | 'bogo';
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  validUntil: Date;
  isActive: boolean;
}

export interface Notification {
  id: string;
  type: 'cart' | 'wishlist' | 'success' | 'error';
  message: string;
  action?: {
    label: string;
    callback: () => void;
  };
  isVisible: boolean;
}