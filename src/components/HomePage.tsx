import React from 'react';
import { ChevronRight, Clock, Shield, Truck, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ProductCard } from './ProductCard';
import { categories, products, offers, testimonials } from '../data/mockData';
import { Product } from '../types';

interface HomePageProps {
  onCategorySelect: (categoryId: string) => void;
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
}

export function HomePage({ 
  onCategorySelect, 
  onProductClick, 
  onAddToCart, 
  onToggleWishlist,
  wishlist 
}: HomePageProps) {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)]">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center vintage-paper"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.7), rgba(139, 69, 19, 0.7)), url('https://images.unsplash.com/photo-1759400618978-dd8338138bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMHNob3AlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk4NDM3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center text-white space-y-6 max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl mb-4 drop-shadow-lg">
            Timeless Treasures at Your Fingertips
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--vintage-beige)] drop-shadow">
            Discover authentic vintage pieces that tell stories of elegance and craftsmanship from bygone eras
          </p>
          <div className="space-x-4">
            <Button 
              size="lg"
              className="bg-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-dark-brown)] px-8 py-3 text-lg vintage-shadow"
              onClick={() => onCategorySelect('all')}
            >
              Shop Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[var(--vintage-dark-brown)] px-8 py-3 text-lg"
              onClick={() => onCategorySelect('all')}
            >
              Explore Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 bg-[var(--vintage-parchment)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12 text-[var(--vintage-dark-brown)]">
            Special Offers & Deals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="vintage-hover bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vintage-gold)] rounded-full mb-4">
                      <Clock className="h-8 w-8 text-[var(--vintage-dark-brown)]" />
                    </div>
                  </div>
                  <h3 className="text-xl mb-2 text-[var(--vintage-dark-brown)]">{offer.title}</h3>
                  <p className="text-[var(--vintage-brown)] mb-4">{offer.description}</p>
                  {offer.code && (
                    <Badge className="bg-[var(--vintage-maroon)] text-white text-sm px-3 py-1">
                      Code: {offer.code}
                    </Badge>
                  )}
                  <p className="text-sm text-[var(--vintage-brown)] mt-2">
                    Valid until {offer.validUntil.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-[var(--vintage-off-white)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12 text-[var(--vintage-dark-brown)]">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="vintage-hover cursor-pointer bg-[var(--vintage-cream)] border-[var(--vintage-gold)]"
                onClick={() => onCategorySelect(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg mb-1 text-[var(--vintage-dark-brown)]">{category.name}</h3>
                  <p className="text-sm text-[var(--vintage-brown)]">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[var(--vintage-parchment)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12 text-[var(--vintage-dark-brown)]">
            Featured Treasures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)] px-8"
              onClick={() => onCategorySelect('all')}
            >
              View All Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[var(--vintage-off-white)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12 text-[var(--vintage-dark-brown)]">
            Why Choose Vintage Vault
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vintage-gold)] rounded-full mb-4">
                <Shield className="h-8 w-8 text-[var(--vintage-dark-brown)]" />
              </div>
              <h3 className="text-xl mb-2 text-[var(--vintage-dark-brown)]">Authenticity Guaranteed</h3>
              <p className="text-[var(--vintage-brown)]">Every piece is verified for authenticity with certificates</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vintage-gold)] rounded-full mb-4">
                <Award className="h-8 w-8 text-[var(--vintage-dark-brown)]" />
              </div>
              <h3 className="text-xl mb-2 text-[var(--vintage-dark-brown)]">Curated Collection</h3>
              <p className="text-[var(--vintage-brown)]">Hand-picked by experts for quality and historical value</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vintage-gold)] rounded-full mb-4">
                <Truck className="h-8 w-8 text-[var(--vintage-dark-brown)]" />
              </div>
              <h3 className="text-xl mb-2 text-[var(--vintage-dark-brown)]">Secure Shipping</h3>
              <p className="text-[var(--vintage-brown)]">Professional packaging and insured delivery</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--vintage-gold)] rounded-full mb-4">
                <Clock className="h-8 w-8 text-[var(--vintage-dark-brown)]" />
              </div>
              <h3 className="text-xl mb-2 text-[var(--vintage-dark-brown)]">Expert Support</h3>
              <p className="text-[var(--vintage-brown)]">Get guidance from vintage specialists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-[var(--vintage-parchment)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12 text-[var(--vintage-dark-brown)]">
            What Our Collectors Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <h4 className="text-lg text-[var(--vintage-dark-brown)]">{testimonial.name}</h4>
                      <p className="text-sm text-[var(--vintage-brown)]">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-[var(--vintage-dark-brown)] mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[var(--vintage-gold)]">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[var(--vintage-dark-brown)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Join the Vintage Circle</h2>
          <p className="text-xl mb-8 text-[var(--vintage-beige)]">
            Get 10% off your first order and stay updated on new arrivals
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-[var(--vintage-dark-brown)] bg-[var(--vintage-off-white)]"
            />
            <Button className="bg-[var(--vintage-gold)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-dark-brown)] px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}