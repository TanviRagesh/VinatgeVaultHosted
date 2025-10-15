import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { categories } from '../data/mockData';

interface NavbarProps {
  cartItemsCount: number;
  wishlistCount: number;
  onCategorySelect: (categoryId: string) => void;
  onSearch: (query: string) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ 
  cartItemsCount, 
  wishlistCount, 
  onCategorySelect, 
  onSearch, 
  currentPage, 
  onNavigate 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onNavigate('search');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--vintage-cream)] vintage-shadow border-b-2 border-[var(--vintage-gold)]">
      {/* Top Bar */}
      <div className="bg-[var(--vintage-dark-brown)] text-[var(--vintage-off-white)] py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">✨ Free Shipping on Orders Above ₹999 | Authenticity Guaranteed ✨</p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="text-3xl mr-3">🏺</div>
            <div>
              <h1 className="text-2xl vintage-text-pattern">Vintage Vault</h1>
              <p className="text-xs text-[var(--vintage-brown)] -mt-1">Timeless Treasures</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for vintage treasures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-2 w-full bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)]"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 bg-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-dark-brown)]"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('login')}
              className="text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
            >
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('wishlist')}
              className="relative text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[var(--vintage-maroon)] text-white text-xs px-1">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('cart')}
              className="relative text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[var(--vintage-maroon)] text-white text-xs px-1">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Categories Bar - Desktop */}
        <div className="hidden md:flex items-center justify-center mt-4 space-x-6">
          <Button
            variant="ghost"
            className="text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
            onClick={() => onNavigate('home')}
          >
            Home
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              className="text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              Categories
            </Button>
            
            {showCategories && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-[var(--vintage-cream)] vintage-shadow rounded-lg border border-[var(--vintage-gold)] z-50"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <div className="p-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="w-full text-left px-3 py-2 hover:bg-[var(--vintage-beige)] rounded transition-colors"
                      onClick={() => {
                        onCategorySelect(category.id);
                        setShowCategories(false);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--vintage-dark-brown)]">{category.name}</span>
                        <span className="text-xs text-[var(--vintage-brown)]">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {categories.slice(0, 4).map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
              onClick={() => onCategorySelect(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for vintage treasures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-12 py-2 w-full bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1 bg-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)]"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--vintage-parchment)] border-t border-[var(--vintage-gold)]">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-[var(--vintage-dark-brown)]"
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Button>
              
              <div className="space-y-2">
                <p className="font-medium text-[var(--vintage-dark-brown)]">Categories</p>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className="w-full justify-start pl-4 text-[var(--vintage-brown)]"
                    onClick={() => {
                      onCategorySelect(category.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
              
              <div className="pt-4 border-t border-[var(--vintage-gold)] space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-[var(--vintage-dark-brown)]"
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 mr-2" />
                  Account
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-[var(--vintage-dark-brown)]"
                  onClick={() => {
                    onNavigate('wishlist');
                    setIsMenuOpen(false);
                  }}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist ({wishlistCount})
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-[var(--vintage-dark-brown)]"
                  onClick={() => {
                    onNavigate('cart');
                    setIsMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({cartItemsCount})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}