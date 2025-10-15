import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Award, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { ProductCard } from './ProductCard';
import { products, reviews as defaultReviews } from '../data/mockData';
import { Product, Review, User } from '../types';

interface ProductDetailPageProps {
  productId: string | null;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isInWishlist: boolean;
  onNavigateToCategory: (categoryId: string) => void;
  reviews: Review[];
  onAddReview: (productId: string, rating: number, comment: string) => void;
  currentUser: User | null;
}

export function ProductDetailPage({
  productId,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onNavigateToCategory,
  reviews: userReviews,
  onAddReview,
  currentUser
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const product = products.find(p => p.id === productId);
  const allReviews = [...defaultReviews, ...userReviews];
  const productReviews = allReviews.filter(r => r.productId === productId);
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== productId)
    .slice(0, 4);

  // Calculate average rating
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
    : product?.rating || 0;

  const handleSubmitReview = () => {
    if (!currentUser) {
      alert('Please log in to leave a review');
      return;
    }
    
    if (newReviewComment.trim()) {
      onAddReview(productId!, newReviewRating, newReviewComment.trim());
      setNewReviewComment('');
      setNewReviewRating(5);
      setShowReviewForm(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--vintage-off-white)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl mb-4 text-[var(--vintage-dark-brown)]">Product Not Found</h2>
          <Button onClick={() => onNavigateToCategory('all')}>
            Browse All Products
          </Button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)] py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8 text-[var(--vintage-brown)]">
          <Button
            variant="ghost"
            onClick={() => onNavigateToCategory('all')}
            className="text-[var(--vintage-brown)] hover:text-[var(--vintage-dark-brown)]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg vintage-shadow"
              />
              {product.vintage && (
                <Badge className="absolute top-4 left-4 bg-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]">
                  Vintage Authentic
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 right-4 bg-[var(--vintage-maroon)] text-white">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={`h-20 object-cover rounded cursor-pointer transition-all ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-[var(--vintage-gold)]' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl mb-2 text-[var(--vintage-dark-brown)]">
                {product.name}
              </h1>
              {product.year && (
                <p className="text-lg text-[var(--vintage-brown)] italic mb-4">
                  Circa {product.year}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? 'text-[var(--vintage-gold)] fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[var(--vintage-brown)]">
                {averageRating.toFixed(1)} ({productReviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl text-[var(--vintage-dark-brown)]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-[var(--vintage-brown)] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-[var(--vintage-maroon)] text-white">
                  Save ₹{(product.originalPrice! - product.price).toLocaleString()}
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              {product.material && (
                <div className="flex">
                  <span className="w-24 text-[var(--vintage-brown)]">Material:</span>
                  <span className="text-[var(--vintage-dark-brown)]">{product.material}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex">
                  <span className="w-24 text-[var(--vintage-brown)]">Size:</span>
                  <span className="text-[var(--vintage-dark-brown)]">{product.dimensions}</span>
                </div>
              )}
              <div className="flex">
                <span className="w-24 text-[var(--vintage-brown)]">Stock:</span>
                <span className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-[var(--vintage-dark-brown)]">Quantity:</label>
                <div className="flex items-center border border-[var(--vintage-gold)] rounded">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 text-[var(--vintage-dark-brown)]">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                  disabled={!product.inStock}
                  onClick={() => onAddToCart(product, quantity)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className={`border-[var(--vintage-gold)] ${
                    isInWishlist 
                      ? 'bg-[var(--vintage-maroon)] text-white border-[var(--vintage-maroon)]' 
                      : 'text-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-beige)]'
                  }`}
                  onClick={() => onToggleWishlist(product.id)}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[var(--vintage-gold)]">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-[var(--vintage-gold)]" />
                <span className="text-sm text-[var(--vintage-brown)]">Authenticity Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-[var(--vintage-gold)]" />
                <span className="text-sm text-[var(--vintage-brown)]">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-[var(--vintage-gold)]" />
                <span className="text-sm text-[var(--vintage-brown)]">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-[var(--vintage-gold)]" />
                <span className="text-sm text-[var(--vintage-brown)]">Expert Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16 bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[var(--vintage-beige)]">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({productReviews.length})</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6 space-y-4">
                <p className="text-[var(--vintage-dark-brown)] leading-relaxed">
                  {product.description}
                </p>
                
                {product.features.length > 0 && (
                  <div>
                    <h4 className="text-lg mb-3 text-[var(--vintage-dark-brown)]">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-[var(--vintage-brown)]">
                          <span className="text-[var(--vintage-gold)] mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {/* Add Review Section */}
                  <Card className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-[var(--vintage-dark-brown)]">Customer Reviews</span>
                        {currentUser && !showReviewForm && (
                          <Button
                            onClick={() => setShowReviewForm(true)}
                            className="bg-[var(--vintage-gold)] hover:bg-[var(--vintage-dark-brown)] text-[var(--vintage-dark-brown)] hover:text-[var(--vintage-off-white)]"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Write a Review
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {showReviewForm && (
                        <div className="space-y-4 mb-6 p-4 bg-[var(--vintage-cream)] rounded-lg border border-[var(--vintage-gold)]">
                          <div>
                            <label className="block text-[var(--vintage-dark-brown)] mb-2">
                              Your Rating:
                            </label>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  onClick={() => setNewReviewRating(rating)}
                                  className="p-1"
                                >
                                  <Star
                                    className={`h-6 w-6 ${
                                      rating <= newReviewRating
                                        ? 'text-[var(--vintage-gold)] fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-[var(--vintage-dark-brown)] mb-2">
                              Your Review:
                            </label>
                            <Textarea
                              value={newReviewComment}
                              onChange={(e) => setNewReviewComment(e.target.value)}
                              placeholder="Share your thoughts about this product..."
                              className="bg-[var(--vintage-off-white)] border-[var(--vintage-gold)] focus:border-[var(--vintage-dark-brown)]"
                              rows={4}
                            />
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              onClick={handleSubmitReview}
                              className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                              disabled={!newReviewComment.trim()}
                            >
                              Submit Review
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowReviewForm(false);
                                setNewReviewComment('');
                                setNewReviewRating(5);
                              }}
                              className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {!currentUser && (
                        <div className="text-center py-4 text-[var(--vintage-brown)]">
                          Please log in to write a review
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Reviews List */}
                  {productReviews.length > 0 ? (
                    <div className="space-y-6">
                      {productReviews.map((review) => (
                        <div key={review.id} className="border-b border-[var(--vintage-gold)] pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-[var(--vintage-dark-brown)]">{review.userName}</span>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-800 text-xs">Verified Purchase</Badge>
                              )}
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-[var(--vintage-gold)] fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-[var(--vintage-brown)] mb-2">{review.comment}</p>
                          <p className="text-sm text-[var(--vintage-warm-gray)]">
                            {review.date.toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[var(--vintage-brown)] text-center py-8">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg mb-2 text-[var(--vintage-dark-brown)]">Shipping Information</h4>
                    <p className="text-[var(--vintage-brown)]">
                      Free shipping on orders above ₹999. Standard delivery takes 3-7 business days.
                      Express delivery available for an additional charge.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg mb-2 text-[var(--vintage-dark-brown)]">Returns & Exchanges</h4>
                    <p className="text-[var(--vintage-brown)]">
                      30-day return policy. Items must be in original condition with authenticity certificates.
                      Return shipping costs may apply for non-defective items.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl mb-8 text-[var(--vintage-dark-brown)]">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => onAddToCart(relatedProduct, 1)}
                  onToggleWishlist={onToggleWishlist}
                  onProductClick={(productId) => {
                    // Navigate to the new product detail page
                    window.scrollTo(0, 0);
                  }}
                  isInWishlist={false} // This would need to be passed in from parent
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}