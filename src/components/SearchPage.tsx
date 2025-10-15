import React, { useMemo, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ProductCard } from './ProductCard';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { products } from '../data/mockData';
import { Product } from '../types';

interface SearchPageProps {
  searchQuery: string;
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onNewSearch: (query: string) => void;
}

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'name';

export function SearchPage({
  searchQuery,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onNewSearch
}: SearchPageProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredResults = useMemo(() => {
    let results = products;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (product.material && product.material.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      results = results.filter(product => product.category === categoryFilter);
    }

    // Price range filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-500':
          results = results.filter(product => product.price < 500);
          break;
        case '500-1000':
          results = results.filter(product => product.price >= 500 && product.price <= 1000);
          break;
        case '1000-3000':
          results = results.filter(product => product.price > 1000 && product.price <= 3000);
          break;
        case 'over-3000':
          results = results.filter(product => product.price > 3000);
          break;
      }
    }

    // Sort results
    const sorted = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'relevance':
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortBy, priceRange, categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewSearch(localQuery);
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)] py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-4 text-[var(--vintage-dark-brown)]">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Products'}
          </h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for vintage treasures..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="pl-4 pr-12 py-3 bg-[var(--vintage-parchment)] border-[var(--vintage-gold)] focus:ring-[var(--vintage-gold)] text-lg"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 bg-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-dark-brown)]"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>

        {/* Filters and Sort */}
        <Card className="mb-8 bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-[var(--vintage-brown)]" />
                <span className="text-[var(--vintage-dark-brown)]">Filters:</span>
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48 bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500">Under ₹500</SelectItem>
                  <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                  <SelectItem value="1000-3000">₹1,000 - ₹3,000</SelectItem>
                  <SelectItem value="over-3000">Over ₹3,000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-48 bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setCategoryFilter('all');
                  setPriceRange('all');
                  setSortBy('relevance');
                }}
                className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[var(--vintage-brown)]">
            {filteredResults.length} product{filteredResults.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Results */}
        {filteredResults.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl mb-2 text-[var(--vintage-dark-brown)]">No Results Found</h3>
            <p className="text-[var(--vintage-brown)] mb-8">
              {searchQuery 
                ? `No products found for "${searchQuery}". Try adjusting your search or filters.`
                : 'Try searching for vintage furniture, jewelry, books, or other collectibles.'
              }
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-[var(--vintage-brown)]">Popular searches:</span>
                {['vintage furniture', 'antique jewelry', 'rare books', 'collectibles', 'home decor'].map(term => (
                  <Button
                    key={term}
                    variant="link"
                    onClick={() => onNewSearch(term)}
                    className="text-[var(--vintage-dark-brown)] hover:text-[var(--vintage-brown)] h-auto p-1"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((product) => (
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

        {/* Search Suggestions */}
        {searchQuery && filteredResults.length > 0 && (
          <Card className="mt-12 bg-[var(--vintage-beige)] border-[var(--vintage-gold)]">
            <CardContent className="p-6">
              <h3 className="text-lg mb-4 text-[var(--vintage-dark-brown)]">Related Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['vintage', 'antique', 'collectible', 'handcrafted', 'authentic', 'rare'].map(term => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => onNewSearch(`${searchQuery} ${term}`)}
                    className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-cream)]"
                  >
                    {searchQuery} {term}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}