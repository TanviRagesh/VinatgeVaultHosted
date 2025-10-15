import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, CheckCircle, Tag, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { CartItem, User, Address } from '../types';
import { coupons } from '../data/mockData';

interface CheckoutPageProps {
  cart: CartItem[];
  user: User | null;
  onPlaceOrder: (orderData: any) => void;
  onBackToCart: () => void;
  isLoggedIn: boolean;
  onLoginPrompt: () => void;
}

export function CheckoutPage({
  cart,
  user,
  onPlaceOrder,
  onBackToCart,
  isLoggedIn,
  onLoginPrompt
}: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({
    name: user?.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: user?.phone || ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [showCouponDialog, setShowCouponDialog] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  
  // Calculate discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discount) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discount = appliedCoupon.discount;
    }
  }
  
  const total = subtotal + shipping + tax - discount;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[var(--vintage-off-white)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🔐</div>
            <h2 className="text-3xl mb-4 text-[var(--vintage-dark-brown)]">Login Required</h2>
            <p className="text-[var(--vintage-brown)] mb-8">
              Please login to continue with your purchase
            </p>
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                onClick={onLoginPrompt}
              >
                Login to Continue
              </Button>
              <Button
                variant="outline"
                onClick={onBackToCart}
                className="w-full border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]"
              >
                Back to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddressSubmit = () => {
    if (shippingAddress.name && shippingAddress.street && shippingAddress.city && 
        shippingAddress.state && shippingAddress.zipCode && shippingAddress.phone) {
      setStep(2);
    }
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive);
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    
    if (coupon.minAmount && subtotal < coupon.minAmount) {
      setCouponError(`Minimum order value of ₹${coupon.minAmount.toLocaleString()} required`);
      return;
    }
    
    setAppliedCoupon(coupon);
    setCouponCode('');
    setShowCouponInput(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCouponDialogChoice = (wantsCoupon: boolean) => {
    setShowCouponDialog(false);
    if (wantsCoupon) {
      setShowCouponInput(true);
    }
  };

  const handlePlaceOrder = () => {
    if (!appliedCoupon && !showCouponDialog && !showCouponInput) {
      // Ask if user wants to apply a coupon
      setShowCouponDialog(true);
      return;
    }
    
    onPlaceOrder({
      cart,
      shippingAddress,
      paymentMethod,
      total,
      originalTotal: subtotal + shipping + tax,
      discount,
      couponCode: appliedCoupon?.code,
      address: shippingAddress,
      timestamp: new Date()
    });
  };

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-[var(--vintage-dark-brown)]">Checkout</h1>
            <p className="text-[var(--vintage-brown)]">Complete your vintage treasure purchase</p>
          </div>
          <Button
            variant="outline"
            onClick={onBackToCart}
            className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]' : 'bg-gray-300 text-gray-600'
            }`}>
              {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
            </div>
            <span className={`${step >= 1 ? 'text-[var(--vintage-dark-brown)]' : 'text-gray-500'}`}>
              Shipping Address
            </span>
            <div className="w-16 h-1 bg-gray-300">
              <div className={`h-full transition-all duration-300 ${
                step >= 2 ? 'w-full bg-[var(--vintage-gold)]' : 'w-0'
              }`} />
            </div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]' : 'bg-gray-300 text-gray-600'
            }`}>
              {step > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
            </div>
            <span className={`${step >= 2 ? 'text-[var(--vintage-dark-brown)]' : 'text-gray-500'}`}>
              Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[var(--vintage-dark-brown)]">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={shippingAddress.name}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Textarea
                      id="street"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                      className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                        className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                        className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">PIN Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                        className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleAddressSubmit}
                    className="w-full bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[var(--vintage-dark-brown)]">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI Payment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking">Net Banking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-[var(--vintage-parchment)] rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                          className="bg-white border-[var(--vintage-gold)]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          value={cardDetails.cardholderName}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                          className="bg-white border-[var(--vintage-gold)]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                            className="bg-white border-[var(--vintage-gold)]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                            className="bg-white border-[var(--vintage-gold)]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]"
                    >
                      Back to Address
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                    >
                      Place Order - ₹{total.toLocaleString()}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)] sticky top-8">
              <CardHeader>
                <CardTitle className="text-[var(--vintage-dark-brown)]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-[var(--vintage-dark-brown)] line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-[var(--vintage-brown)]">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm text-[var(--vintage-dark-brown)]">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[var(--vintage-brown)]">Subtotal</span>
                      <span className="text-[var(--vintage-dark-brown)]">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--vintage-brown)]">Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600' : 'text-[var(--vintage-dark-brown)]'}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--vintage-brown)]">Tax</span>
                      <span className="text-[var(--vintage-dark-brown)]">₹{tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span className="text-[var(--vintage-dark-brown)]">Total</span>
                      <span className="text-[var(--vintage-dark-brown)]">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}