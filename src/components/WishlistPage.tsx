import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { products } from '../data/mockData';
import { Product } from '../types';

interface WishlistPageProps {
  wishlist: string[];
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onContinueShopping: () => void;
}

export function WishlistPage({
  wishlist,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  onContinueShopping
}: WishlistPageProps) {
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--vintage-off-white)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">💝</div>
            <h2 className="text-3xl mb-4 text-[var(--vintage-dark-brown)]">Your Wishlist is Empty</h2>
            <p className="text-[var(--vintage-brown)] mb-8">
              Save your favorite vintage treasures for later by clicking the heart icon
            </p>
            <Button
              size="lg"
              className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
              onClick={onContinueShopping}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Discover Treasures
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
            <h1 className="text-4xl mb-2 text-[var(--vintage-dark-brown)] flex items-center">
              <Heart className="h-8 w-8 mr-3 text-[var(--vintage-maroon)] fill-current" />
              My Wishlist
            </h1>
            <p className="text-[var(--vintage-brown)]">{wishlistProducts.length} treasured items</p>
          </div>
          <Button
            variant="outline"
            onClick={onContinueShopping}
            className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Wishlist Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onProductClick={onProductClick}
              isInWishlist={true}
            />
          ))}
        </div>

        {/* Add All to Cart */}
        {wishlistProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)] px-8"
              onClick={() => {
                wishlistProducts.forEach(product => onAddToCart(product));
              }}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add All to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}