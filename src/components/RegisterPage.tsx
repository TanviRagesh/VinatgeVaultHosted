import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, User, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';

interface RegisterPageProps {
  onRegister: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
  }) => void;
  onNavigateToLogin: () => void;
  onBackToHome: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin, onBackToHome }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'Please agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onRegister({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)] vintage-paper flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={onBackToHome}
              className="mb-4 text-[var(--vintage-brown)] hover:text-[var(--vintage-dark-brown)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-4xl mb-4">🏺</div>
            <h1 className="text-3xl mb-2 text-[var(--vintage-dark-brown)]">Join the Vintage Circle</h1>
            <p className="text-[var(--vintage-brown)]">Create your account to start collecting</p>
          </div>

          {/* Registration Form */}
          <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)] vintage-shadow">
            <CardHeader>
              <CardTitle className="text-center text-[var(--vintage-dark-brown)]">Create Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center mb-2">
                    <User className="h-4 w-4 mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={`bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)] ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1-555-0123"
                    className={`bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)] ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="address" className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    Address (Optional)
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                    className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)]"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center mb-2">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Address (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className={`bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)] ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="flex items-center mb-2">
                    <Lock className="h-4 w-4 mr-2" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a password"
                      className={`bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)] pr-10 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-[var(--vintage-brown)]" />
                      ) : (
                        <Eye className="h-4 w-4 text-[var(--vintage-brown)]" />
                      )}
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="flex items-center mb-2">
                    <Lock className="h-4 w-4 mr-2" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      className={`bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)] pr-10 ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-[var(--vintage-brown)]" />
                      ) : (
                        <Eye className="h-4 w-4 text-[var(--vintage-brown)]" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => {
                      setAgreeToTerms(checked as boolean);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-[var(--vintage-brown)] leading-relaxed">
                    I agree to the{' '}
                    <Button variant="link" className="h-auto p-0 text-[var(--vintage-dark-brown)]">
                      Terms & Conditions
                    </Button>{' '}
                    and{' '}
                    <Button variant="link" className="h-auto p-0 text-[var(--vintage-dark-brown)]">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

                <Button
                  type="submit"
                  className="w-full bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </Button>

                <div className="text-center">
                  <span className="text-[var(--vintage-brown)]">Already have an account? </span>
                  <Button
                    variant="link"
                    onClick={onNavigateToLogin}
                    className="text-[var(--vintage-dark-brown)] hover:text-[var(--vintage-brown)] p-0 h-auto"
                  >
                    Sign in here
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}