import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Eye, Home, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface PaymentSuccessPageProps {
  onContinueShopping: () => void;
  onViewProfile: () => void;
}

export function PaymentSuccessPage({
  onContinueShopping,
  onViewProfile
}: PaymentSuccessPageProps) {
  const [orderId] = useState(`VV${Date.now()}`);
  const [trackingSteps, setTrackingSteps] = useState([
    { status: 'Order Placed', completed: true, date: new Date() },
    { status: 'Payment Confirmed', completed: true, date: new Date() },
    { status: 'Processing', completed: false, date: null },
    { status: 'Shipped', completed: false, date: null },
    { status: 'Delivered', completed: false, date: null }
  ]);

  useEffect(() => {
    // Simulate order processing updates
    const timer1 = setTimeout(() => {
      setTrackingSteps(prev => prev.map((step, index) => 
        index === 2 ? { ...step, completed: true, date: new Date() } : step
      ));
    }, 2000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl mb-4 text-[var(--vintage-dark-brown)]">Payment Successful!</h1>
            <p className="text-xl text-[var(--vintage-brown)]">
              Hooray! You have completed your payment for vintage treasures.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8 bg-[var(--vintage-cream)] border-[var(--vintage-gold)] vintage-shadow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-2xl mb-2 text-[var(--vintage-dark-brown)]">
                  <strong>Order ID: {orderId}</strong>
                </div>
                <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">
                  Order Confirmed
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <h3 className="text-lg text-[var(--vintage-dark-brown)]">Order Summary</h3>
                  <div className="space-y-2 text-[var(--vintage-brown)]">
                    <div className="flex justify-between">
                      <span>Amount Paid:</span>
                      <span className="text-[var(--vintage-dark-brown)]">₹2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="text-[var(--vintage-dark-brown)]">Credit Card</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="text-[var(--vintage-dark-brown)] text-sm">TXN{Date.now()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg text-[var(--vintage-dark-brown)]">Estimated Delivery</h3>
                  <div className="text-[var(--vintage-brown)]">
                    <p>3-7 Business Days</p>
                    <p className="text-sm">Professional packaging included</p>
                    <p className="text-sm">Tracking details will be sent via SMS/Email</p>
                  </div>
                </div>
              </div>

              {/* Order Tracking */}
              <div className="mb-8">
                <h3 className="text-lg mb-4 text-[var(--vintage-dark-brown)]">Order Tracking</h3>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        step.completed 
                          ? 'bg-[var(--vintage-gold)] border-[var(--vintage-gold)]' 
                          : 'border-gray-300'
                      }`} />
                      <div className="flex-1">
                        <span className={`${
                          step.completed 
                            ? 'text-[var(--vintage-dark-brown)]' 
                            : 'text-[var(--vintage-brown)]'
                        }`}>
                          {step.status}
                        </span>
                        {step.date && (
                          <span className="text-sm text-[var(--vintage-brown)] ml-2">
                            {step.date.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {step.completed && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button
                  variant="outline"
                  onClick={onViewProfile}
                  className="flex-1 border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Order Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Experience Rating */}
          <Card className="mb-8 bg-[var(--vintage-beige)] border-[var(--vintage-gold)]">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg mb-4 text-[var(--vintage-dark-brown)]">
                How was your payment experience?
              </h3>
              <div className="flex justify-center space-x-4 mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant="ghost"
                    className="w-12 h-12 p-0 hover:bg-[var(--vintage-gold)] text-2xl"
                  >
                    {rating <= 4 ? '😊' : '🥰'}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-[var(--vintage-brown)]">
                Your feedback helps us improve our service
              </p>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={onContinueShopping}
              className="flex-1 bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
            >
              <Home className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onViewProfile}
              className="flex-1 border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
            >
              <User className="h-5 w-5 mr-2" />
              View Profile
            </Button>
          </div>

          {/* Support Info */}
          <Card className="mt-8 bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-[var(--vintage-brown)]">
                Need help? Contact our vintage specialists at{' '}
                <strong>support@vintagevault.com</strong> or call{' '}
                <strong>1-800-VINTAGE</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}