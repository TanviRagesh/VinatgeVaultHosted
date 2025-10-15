import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onProductClick: (productId: string) => void;
  isInWishlist: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  onProductClick,
  isInWishlist 
}: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="vintage-hover cursor-pointer bg-[var(--vintage-cream)] border-[var(--vintage-gold)] overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          onClick={() => onProductClick(product.id)}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.vintage && (
            <Badge className="bg-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-gold)]">
              Vintage
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-[var(--vintage-maroon)] text-white hover:bg-[var(--vintage-maroon)]">
              {discountPercentage}% OFF
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="bg-gray-500 text-white">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 w-8 h-8 p-0 rounded-full ${
            isInWishlist 
              ? 'bg-[var(--vintage-maroon)] text-white hover:bg-[var(--vintage-maroon)]' 
              : 'bg-white/80 text-[var(--vintage-dark-brown)] hover:bg-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <CardContent className="p-4" onClick={() => onProductClick(product.id)}>
        <div className="space-y-2">
          <h3 className="text-lg line-clamp-2 text-[var(--vintage-dark-brown)]">
            {product.name}
          </h3>
          
          {product.year && (
            <p className="text-sm text-[var(--vintage-brown)] italic">
              Circa {product.year}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-[var(--vintage-gold)] fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[var(--vintage-brown)]">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-xl text-[var(--vintage-dark-brown)]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--vintage-brown)] line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full mt-3 bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}