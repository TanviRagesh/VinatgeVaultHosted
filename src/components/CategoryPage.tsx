import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { products, categories } from '../data/mockData';
import { Product } from '../types';

interface CategoryPageProps {
  categoryId: string | null;
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'name';

export function CategoryPage({
  categoryId,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlist
}: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = categories.find(cat => cat.id === categoryId);
  const categoryName = categoryId === 'all' ? 'All Products' : category?.name || 'Products';

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (categoryId && categoryId !== 'all') {
      filtered = filtered.filter(product => product.category === categoryId);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by rating
    filtered = filtered.filter(product => product.rating >= minRating);

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return 0; // Keep original order for newest
      }
    });

    return sorted;
  }, [categoryId, sortBy, priceRange, minRating]);

  const maxPrice = Math.max(...products.map(p => p.price));

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-4 text-[var(--vintage-dark-brown)]">{categoryName}</h1>
          {category && (
            <p className="text-lg text-[var(--vintage-brown)]">{category.description}</p>
          )}
          <div className="flex items-center justify-between mt-6">
            <p className="text-[var(--vintage-brown)]">
              {filteredAndSortedProducts.length} products found
            </p>
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-[var(--vintage-cream)] rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-[var(--vintage-gold)]' : ''}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-[var(--vintage-gold)]' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-48 bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4 text-[var(--vintage-dark-brown)]">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={maxPrice}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[var(--vintage-brown)]">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4 text-[var(--vintage-dark-brown)]">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1, 0].map((rating) => (
                      <Button
                        key={rating}
                        variant={minRating === rating ? 'default' : 'ghost'}
                        className={`w-full justify-start ${
                          minRating === rating 
                            ? 'bg-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]' 
                            : 'text-[var(--vintage-dark-brown)]'
                        }`}
                        onClick={() => setMinRating(rating)}
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < rating ? 'text-[var(--vintage-gold)]' : 'text-gray-300'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="ml-2">& Up</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4 text-[var(--vintage-dark-brown)]">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex justify-between items-center">
                        <span className="text-[var(--vintage-dark-brown)]">{cat.name}</span>
                        <Badge variant="secondary" className="bg-[var(--vintage-beige)]">
                          {cat.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl mb-2 text-[var(--vintage-dark-brown)]">No Products Found</h3>
                <p className="text-[var(--vintage-brown)]">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    onProductClick={onProductClick}
                    isInWishlist={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}