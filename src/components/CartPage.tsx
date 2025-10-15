import React from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartPage({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping
}: CartPageProps) {
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;
  const savings = cart.reduce((total, item) => {
    const originalPrice = item.product.originalPrice || item.product.price;
    return total + (originalPrice - item.product.price) * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--vintage-off-white)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-3xl mb-4 text-[var(--vintage-dark-brown)]">Your Cart is Empty</h2>
            <p className="text-[var(--vintage-brown)] mb-8">
              Discover unique vintage treasures and add them to your collection
            </p>
            <Button
              size="lg"
              className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
              onClick={onContinueShopping}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-[var(--vintage-dark-brown)]">Shopping Cart</h1>
            <p className="text-[var(--vintage-brown)]">{cart.length} items in your cart</p>
          </div>
          <Button
            variant="outline"
            onClick={onContinueShopping}
            className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const discountPercentage = item.product.originalPrice 
                ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
                : 0;

              return (
                <Card key={item.product.id} className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg text-[var(--vintage-dark-brown)]">{item.product.name}</h3>
                            {item.product.year && (
                              <p className="text-sm text-[var(--vintage-brown)] italic">Circa {item.product.year}</p>
                            )}
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-lg text-[var(--vintage-dark-brown)]">
                                ₹{item.product.price.toLocaleString()}
                              </span>
                              {item.product.originalPrice && (
                                <>
                                  <span className="text-sm text-[var(--vintage-brown)] line-through">
                                    ₹{item.product.originalPrice.toLocaleString()}
                                  </span>
                                  <Badge className="bg-[var(--vintage-maroon)] text-white text-xs">
                                    {discountPercentage}% OFF
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[var(--vintage-maroon)] hover:text-[var(--vintage-maroon)] hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-[var(--vintage-brown)]">Quantity:</span>
                            <div className="flex items-center border border-[var(--vintage-gold)] rounded">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="px-3 py-1 text-[var(--vintage-dark-brown)] min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= 10}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg text-[var(--vintage-dark-brown)]">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </p>
                            {item.product.originalPrice && (
                              <p className="text-sm text-[var(--vintage-brown)]">
                                You save ₹{((item.product.originalPrice - item.product.price) * item.quantity).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)] sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl mb-4 text-[var(--vintage-dark-brown)]">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[var(--vintage-brown)]">Subtotal ({cart.length} items)</span>
                    <span className="text-[var(--vintage-dark-brown)]">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-[var(--vintage-brown)]">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : 'text-[var(--vintage-dark-brown)]'}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-[var(--vintage-brown)]">
                      Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
                    </p>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-[var(--vintage-brown)]">Tax (GST 18%)</span>
                    <span className="text-[var(--vintage-dark-brown)]">₹{tax.toLocaleString()}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Total Savings</span>
                      <span>-₹{savings.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg">
                    <span className="text-[var(--vintage-dark-brown)]">Total</span>
                    <span className="text-[var(--vintage-dark-brown)]">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button
                  size="lg"
                  className="w-full mt-6 bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                  onClick={onCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 space-y-2 text-sm text-[var(--vintage-brown)]">
                  <div className="flex items-center space-x-2">
                    <span>🔒</span>
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📜</span>
                    <span>Authenticity guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🚚</span>
                    <span>Professional packaging</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Offer Banner */}
        <Card className="mt-8 bg-gradient-to-r from-[var(--vintage-gold)] to-[var(--vintage-brown)] text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl mb-2">🎉 Special Offer!</h3>
            <p>Use code VINTAGE20 for an additional 20% off on orders above ₹2000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}