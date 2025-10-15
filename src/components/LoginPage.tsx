import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onNavigateToRegister: () => void;
  onBackToHome: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister, onBackToHome }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ email, password });
      setIsLoading(false);
    }, 1000);
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
            <h1 className="text-3xl mb-2 text-[var(--vintage-dark-brown)]">Welcome Back</h1>
            <p className="text-[var(--vintage-brown)]">Sign in to your Vintage Vault account</p>
          </div>

          {/* Login Form */}
          <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)] vintage-shadow">
            <CardHeader>
              <CardTitle className="text-center text-[var(--vintage-dark-brown)]">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="flex items-center mb-2">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)]"
                    required
                  />
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)] pr-10"
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
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-[var(--vintage-brown)] hover:text-[var(--vintage-dark-brown)]"
                  >
                    Forgot your password?
                  </Button>
                </div>
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
                  Continue with Google
                </Button>

                <div className="text-center">
                  <span className="text-[var(--vintage-brown)]">Don't have an account? </span>
                  <Button
                    variant="link"
                    onClick={onNavigateToRegister}
                    className="text-[var(--vintage-dark-brown)] hover:text-[var(--vintage-brown)] p-0 h-auto"
                  >
                    Create one here
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="mt-6 bg-[var(--vintage-beige)] border-[var(--vintage-gold)]">
            <CardContent className="p-4">
              <p className="text-sm text-[var(--vintage-dark-brown)] text-center mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-xs text-[var(--vintage-brown)] text-center">
                Email: demo@vintagevault.com<br />
                Password: vintage123
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}