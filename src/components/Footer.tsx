import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[var(--vintage-dark-brown)] text-[var(--vintage-off-white)] pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-2">🏺</div>
              <div>
                <h3 className="text-xl vintage-text-pattern text-[var(--vintage-gold)]">Vintage Vault</h3>
                <p className="text-sm text-[var(--vintage-beige)]">Timeless Treasures</p>
              </div>
            </div>
            <p className="text-[var(--vintage-beige)] mb-4 leading-relaxed">
              Discover authentic vintage pieces that tell stories of elegance and craftsmanship from bygone eras.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)]">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)]">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)]">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 text-[var(--vintage-gold)]">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Us', page: 'about' },
                { label: 'Contact', page: 'contact' },
                { label: 'FAQs', page: 'faq' },
                { label: 'Shipping Info', page: 'shipping' },
                { label: 'Returns & Exchanges', page: 'returns' },
                { label: 'Size Guide', page: 'size-guide' }
              ].map((link) => (
                <li key={link.page}>
                  <Button
                    variant="link"
                    className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] p-0 h-auto"
                    onClick={() => onNavigate(link.page)}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg mb-4 text-[var(--vintage-gold)]">Categories</h4>
            <ul className="space-y-2">
              {[
                'Furniture',
                'Jewelry',
                'Books',
                'Home Decor',
                'Electronics',
                'Accessories'
              ].map((category) => (
                <li key={category}>
                  <Button
                    variant="link"
                    className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] p-0 h-auto"
                    onClick={() => onNavigate('category')}
                  >
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg mb-4 text-[var(--vintage-gold)]">Get in Touch</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[var(--vintage-gold)]" />
                <span className="text-[var(--vintage-beige)]">1-800-VINTAGE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[var(--vintage-gold)]" />
                <span className="text-[var(--vintage-beige)]">hello@vintagevault.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[var(--vintage-gold)] mt-1" />
                <span className="text-[var(--vintage-beige)]">
                  123 Antique Lane<br />
                  Heritage District<br />
                  New York, NY 10001
                </span>
              </div>
            </div>

            <div>
              <h5 className="text-[var(--vintage-gold)] mb-2">Newsletter</h5>
              <p className="text-sm text-[var(--vintage-beige)] mb-3">
                Get 10% off your first order!
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[var(--vintage-brown)] border-[var(--vintage-gold)] text-[var(--vintage-off-white)] placeholder:text-[var(--vintage-beige)]"
                />
                <Button className="bg-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-dark-brown)]">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-[var(--vintage-brown)] mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-[var(--vintage-beige)] text-sm">
              © 2024 Vintage Vault. All rights reserved.
            </p>
            <p className="text-[var(--vintage-beige)] text-xs mt-1">
              Authenticity guaranteed • Secure payments • Free shipping over ₹999
            </p>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 text-sm">
            <Button
              variant="link"
              className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] p-0 h-auto"
              onClick={() => onNavigate('privacy')}
            >
              Privacy Policy
            </Button>
            <Button
              variant="link"
              className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] p-0 h-auto"
              onClick={() => onNavigate('terms')}
            >
              Terms of Service
            </Button>
            <Button
              variant="link"
              className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] p-0 h-auto"
              onClick={() => onNavigate('cookies')}
            >
              Cookie Policy
            </Button>
            <Button
              variant="link"
              className="text-[var(--vintage-beige)] hover:text-[var(--vintage-gold)] p-0 h-auto"
              onClick={() => onNavigate('accessibility')}
            >
              Accessibility
            </Button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center items-center space-x-8 mt-8 pt-8 border-t border-[var(--vintage-brown)]">
          <div className="text-center">
            <div className="text-2xl mb-1">🛡️</div>
            <p className="text-xs text-[var(--vintage-beige)]">Secure<br />Payments</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🚚</div>
            <p className="text-xs text-[var(--vintage-beige)]">Free<br />Shipping</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🔄</div>
            <p className="text-xs text-[var(--vintage-beige)]">Easy<br />Returns</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⭐</div>
            <p className="text-xs text-[var(--vintage-beige)]">Expert<br />Verified</p>
          </div>
        </div>
      </div>
    </footer>
  );
}