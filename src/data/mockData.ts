import { Product, Category, Offer, Review, Coupon } from '../types';

export const categories: Category[] = [
  {
    id: 'furniture',
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1525427232291-d509af8c67f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMGZ1cm5pdHVyZSUyMHdvb2RlbnxlbnwxfHx8fDE3NTk4NDM2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Timeless furniture pieces with character',
    count: 6
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1708221269786-7cafa3332970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamV3ZWxyeSUyMGFudGlxdWUlMjByaW5nc3xlbnwxfHx8fDE3NTk4NDM2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Exquisite vintage jewelry and accessories',
    count: 7
  },
  {
    id: 'books',
    name: 'Books',
    image: 'https://images.unsplash.com/photo-1549964336-9bd1c80a3417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYm9va3MlMjB2aW50YWdlJTIwbGlicmFyeXxlbnwxfHx8fDE3NTk4NDM2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rare and collectible books from bygone eras',
    count: 6
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1759163067401-64a3cc5aa9ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaG9tZSUyMGRlY29yJTIwYW50aXF1ZSUyMHZhc2V8ZW58MXx8fHwxNzU5ODQzNjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Unique decorative pieces for your home',
    count: 5
  },
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1725891262456-20581d6cf957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlY3Ryb25pY3MlMjByYWRpbyUyMGdyYW1vcGhvbmV8ZW58MXx8fHwxNzU5ODQzNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Classic electronics and vintage gadgets',
    count: 6
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1758436999508-753921f51975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYWNjZXNzb3JpZXMlMjBsZWF0aGVyJTIwYmFnfGVufDF8fHx8MTc1OTg0MzYyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Vintage bags, hats, and personal accessories',
    count: 4
  }
];

export const products: Product[] = [
  // FURNITURE CATEGORY (6 products)
  {
    id: '1',
    name: 'Victorian Mahogany Writing Desk',
    price: 12999,
    originalPrice: 15999,
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1525427232291-d509af8c67f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMGZ1cm5pdHVyZSUyMHdvb2RlbnxlbnwxfHx8fDE3NTk4NDM2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1525427232291-d509af8c67f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMGZ1cm5pdHVyZSUyMHdvb2RlbnxlbnwxfHx8fDE3NTk4NDM2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1664087191859-6e3ffb638906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMHdvb2RlbiUyMGNoYWlyfGVufDF8fHx8MTc1OTg0NTA1OXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviews: 23,
    description: 'A stunning Victorian writing desk crafted from solid mahogany. Features intricate carvings and multiple compartments for organization.',
    features: ['Solid mahogany construction', 'Hand-carved details', 'Multiple storage compartments', 'Restored to original condition'],
    inStock: true,
    vintage: true,
    year: '1890s',
    material: 'Mahogany Wood',
    dimensions: '48" W x 24" D x 30" H',
    tags: ['vintage', 'desk', 'mahogany', 'victorian', 'furniture']
  },
  {
    id: '7',
    name: 'Antique Wooden Windsor Chair',
    price: 4599,
    originalPrice: 5299,
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1664087191859-6e3ffb638906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMHdvb2RlbiUyMGNoYWlyfGVufDF8fHx8MTc1OTg0NTA1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1664087191859-6e3ffb638906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMHdvb2RlbiUyMGNoYWlyfGVufDF8fHx8MTc1OTg0NTA1OXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 18,
    description: 'Classic Windsor chair with traditional spindle back design. Handcrafted from solid oak with original patina.',
    features: ['Solid oak construction', 'Traditional Windsor design', 'Original finish', 'Comfortable seating'],
    inStock: true,
    vintage: true,
    year: '1880s',
    material: 'Oak Wood',
    dimensions: '18" W x 16" D x 36" H',
    tags: ['chair', 'windsor', 'oak', 'traditional', 'furniture']
  },
  {
    id: '8',
    name: 'Victorian Mahogany Armoire',
    price: 18999,
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1675850522250-084368921455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYXJtb2lyZSUyMHdhcmRyb2JlfGVufDF8fHx8MTc1OTg0NTA2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1675850522250-084368921455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYXJtb2lyZSUyMHdhcmRyb2JlfGVufDF8fHx8MTc1OTg0NTA2Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.9,
    reviews: 12,
    description: 'Magnificent Victorian armoire with ornate carvings and spacious interior. Perfect for storing clothing or linens.',
    features: ['Mahogany construction', 'Ornate Victorian carvings', 'Large storage capacity', 'Original brass hardware'],
    inStock: true,
    vintage: true,
    year: '1870s',
    material: 'Mahogany Wood',
    dimensions: '48" W x 24" D x 80" H',
    tags: ['armoire', 'wardrobe', 'mahogany', 'victorian', 'storage']
  },
  {
    id: '9',
    name: 'Ornate Gilded Mirror Frame',
    price: 7899,
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1758311791899-0048023a448a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwbWlycm9yJTIwZnJhbWV8ZW58MXx8fHwxNzU5ODQ1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1758311791899-0048023a448a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwbWlycm9yJTIwZnJhbWV8ZW58MXx8fHwxNzU5ODQ1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 9,
    description: 'Exquisite baroque-style mirror with elaborate gold leaf frame. A statement piece for any room.',
    features: ['Authentic gold leaf finish', 'Baroque design', 'Beveled mirror glass', 'Handcrafted details'],
    inStock: true,
    vintage: true,
    year: '1860s',
    material: 'Wood & Gold Leaf',
    dimensions: '36" W x 2" D x 48" H',
    tags: ['mirror', 'baroque', 'gold-leaf', 'ornate', 'decorative']
  },
  {
    id: '10',
    name: 'Rustic Wooden Dining Table',
    price: 14999,
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1625744070229-bb3f58a97e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd29vZGVuJTIwdGFibGV8ZW58MXx8fHwxNzU5Nzc2NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1625744070229-bb3f58a97e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd29vZGVuJTIwdGFibGV8ZW58MXx8fHwxNzU5Nzc2NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.5,
    reviews: 21,
    description: 'Sturdy farmhouse-style dining table crafted from reclaimed wood. Perfect for family gatherings.',
    features: ['Reclaimed wood construction', 'Farmhouse style', 'Seats 6-8 people', 'Natural finish'],
    inStock: true,
    vintage: true,
    year: '1920s',
    material: 'Reclaimed Wood',
    dimensions: '72" W x 36" D x 30" H',
    tags: ['table', 'dining', 'farmhouse', 'reclaimed', 'rustic']
  },
  {
    id: '11',
    name: 'Antique Bookshelf Cabinet',
    price: 11999,
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1656712440390-5b8d46f9dbfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYm9va3NoZWxmJTIwY2FiaW5ldHxlbnwxfHx8fDE3NTk4NDUwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1656712440390-5b8d46f9dbfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYm9va3NoZWxmJTIwY2FiaW5ldHxlbnwxfHx8fDE3NTk4NDUwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviews: 14,
    description: 'Elegant bookshelf cabinet with glass doors and adjustable shelves. Perfect for displaying books and collectibles.',
    features: ['Glass door protection', 'Adjustable shelves', 'Solid wood construction', 'Classic design'],
    inStock: true,
    vintage: true,
    year: '1900s',
    material: 'Oak Wood & Glass',
    dimensions: '42" W x 16" D x 84" H',
    tags: ['bookshelf', 'cabinet', 'glass-doors', 'storage', 'library']
  },

  // JEWELRY CATEGORY (7 products)
  {
    id: '2',
    name: 'Art Deco Diamond Ring',
    price: 28999,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1708221269786-7cafa3332970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamV3ZWxyeSUyMGFudGlxdWUlMjByaW5nc3xlbnwxfHx8fDE3NTk4NDM2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1708221269786-7cafa3332970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamV3ZWxyeSUyMGFudGlxdWUlMjByaW5nc3xlbnwxfHx8fDE3NTk4NDM2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.9,
    reviews: 15,
    description: 'Exquisite Art Deco period diamond ring featuring geometric patterns and platinum setting.',
    features: ['1.2ct center diamond', 'Platinum setting', 'Art Deco design', 'Certificate of authenticity'],
    inStock: true,
    vintage: true,
    year: '1925',
    material: 'Platinum & Diamond',
    dimensions: 'Size 7 (resizable)',
    tags: ['jewelry', 'diamond', 'ring', 'art-deco', 'platinum']
  },
  {
    id: '12',
    name: 'Vintage Pearl Necklace',
    price: 8999,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1652816691871-252a93d1e39d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamV3ZWxyeSUyMG5lY2tsYWNlfGVufDF8fHx8MTc1OTg0NTA3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1652816691871-252a93d1e39d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamV3ZWxyeSUyMG5lY2tsYWNlfGVufDF8fHx8MTc1OTg0NTA3Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 28,
    description: 'Elegant vintage pearl necklace with cultured pearls and sterling silver clasp. Timeless elegance.',
    features: ['Cultured pearls', 'Sterling silver clasp', '18-inch length', 'Classic design'],
    inStock: true,
    vintage: true,
    year: '1940s',
    material: 'Pearls & Sterling Silver',
    dimensions: '18" length',
    tags: ['necklace', 'pearls', 'sterling-silver', 'classic', 'elegant']
  },
  {
    id: '13',
    name: 'Antique Victorian Brooch',
    price: 5999,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1617004890839-25d5d8a9730d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYnJvb2NoJTIwcGlufGVufDF8fHx8MTc1OTg0NTA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1617004890839-25d5d8a9730d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYnJvb2NoJTIwcGlufGVufDF8fHx8MTc1OTg0NTA3NHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 19,
    description: 'Beautiful Victorian era brooch with intricate floral design and natural gemstones.',
    features: ['Victorian design', 'Natural gemstones', 'Gold-plated finish', 'Intricate details'],
    inStock: true,
    vintage: true,
    year: '1880s',
    material: 'Gold & Gemstones',
    dimensions: '2" W x 1.5" H',
    tags: ['brooch', 'victorian', 'floral', 'gemstones', 'gold']
  },
  {
    id: '14',
    name: 'Vintage Gold Pocket Watch',
    price: 12999,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1603303895535-83b77d40796e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcG9ja2V0JTIwd2F0Y2h8ZW58MXx8fHwxNzU5ODQ1MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1603303895535-83b77d40796e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcG9ja2V0JTIwd2F0Y2h8ZW58MXx8fHwxNzU5ODQ1MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviews: 11,
    description: 'Sophisticated gold pocket watch with mechanical movement and engraved case. A true collectors piece.',
    features: ['Mechanical movement', 'Gold-plated case', 'Engraved details', 'Chain included'],
    inStock: true,
    vintage: true,
    year: '1910s',
    material: 'Gold & Steel',
    dimensions: '2" diameter',
    tags: ['watch', 'pocket-watch', 'gold', 'mechanical', 'collectors']
  },
  {
    id: '15',
    name: 'Art Nouveau Drop Earrings',
    price: 6799,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1621274999488-c05dbc5a0f64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwZWFycmluZ3MlMjB2aW50YWdlfGVufDF8fHx8MTc1OTg0NTA4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1621274999488-c05dbc5a0f64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwZWFycmluZ3MlMjB2aW50YWdlfGVufDF8fHx8MTc1OTg0NTA4MHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.5,
    reviews: 16,
    description: 'Graceful Art Nouveau earrings with flowing organic designs and semi-precious stones.',
    features: ['Art Nouveau style', 'Semi-precious stones', 'Sterling silver', 'Pierced ear design'],
    inStock: true,
    vintage: true,
    year: '1900s',
    material: 'Sterling Silver & Stones',
    dimensions: '1.5" length',
    tags: ['earrings', 'art-nouveau', 'sterling-silver', 'organic', 'elegant']
  },
  {
    id: '16',
    name: 'Vintage Gold Cufflinks',
    price: 4599,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1647574633357-75c67e723689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY3VmZmxpbmtzfGVufDF8fHx8MTc1OTg0NTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1647574633357-75c67e723689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY3VmZmxpbmtzfGVufDF8fHx8MTc1OTg0NTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 22,
    description: 'Classic gold cufflinks with geometric design. Perfect for formal occasions and vintage style.',
    features: ['14k gold plated', 'Geometric design', 'Toggle closure', 'Gift box included'],
    inStock: true,
    vintage: true,
    year: '1960s',
    material: '14k Gold Plated',
    dimensions: '0.75" x 0.75"',
    tags: ['cufflinks', 'gold', 'formal', 'geometric', 'mens']
  },
  {
    id: '17',
    name: 'Vintage Charm Bracelet',
    price: 7899,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1721103427881-efdc0c7d011f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYnJhY2VsZXQlMjBqZXdlbHJ5fGVufDF8fHx8MTc1OTg0NTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1721103427881-efdc0c7d011f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYnJhY2VsZXQlMjBqZXdlbHJ5fGVufDF8fHx8MTc1OTg0NTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 13,
    description: 'Delightful charm bracelet with various vintage charms representing travel and memories.',
    features: ['Multiple vintage charms', 'Sterling silver chain', 'Secure clasp', 'Expandable design'],
    inStock: true,
    vintage: true,
    year: '1950s',
    material: 'Sterling Silver',
    dimensions: '7" adjustable',
    tags: ['bracelet', 'charms', 'travel', 'memories', 'sterling-silver']
  },

  // BOOKS CATEGORY (6 products)
  {
    id: '3',
    name: 'First Edition Shakespeare Collection',
    price: 45000,
    originalPrice: 52000,
    category: 'books',
    image: 'https://images.unsplash.com/photo-1549964336-9bd1c80a3417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYm9va3MlMjB2aW50YWdlJTIwbGlicmFyeXxlbnwxfHx8fDE3NTk4NDM2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1549964336-9bd1c80a3417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYm9va3MlMjB2aW50YWdlJTIwbGlicmFyeXxlbnwxfHx8fDE3NTk4NDM2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 8,
    description: 'Rare collection of first edition Shakespeare works in pristine condition with original leather binding.',
    features: ['First edition prints', 'Original leather binding', 'Gold leaf details', 'Complete set of 37 plays'],
    inStock: true,
    vintage: true,
    year: '1623',
    material: 'Leather & Paper',
    dimensions: '12" x 8" x 15"',
    tags: ['books', 'shakespeare', 'first-edition', 'leather-bound', 'rare']
  },
  {
    id: '18',
    name: 'Rare Vintage Book Collection',
    price: 15999,
    category: 'books',
    image: 'https://images.unsplash.com/photo-1602669203865-a96d1caab20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwdmludGFnZSUyMGJvb2tzfGVufDF8fHx8MTc1OTg0NTA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1602669203865-a96d1caab20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwdmludGFnZSUyMGJvb2tzfGVufDF8fHx8MTc1OTg0NTA4OXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.5,
    reviews: 24,
    description: 'Curated collection of rare vintage books from the 19th century. Perfect for collectors and book lovers.',
    features: ['19th century editions', 'Various classic authors', 'Well-preserved condition', 'Set of 20 books'],
    inStock: true,
    vintage: true,
    year: '1800s',
    material: 'Leather & Paper',
    dimensions: 'Various sizes',
    tags: ['books', 'collection', 'classic', 'literature', 'rare']
  },
  {
    id: '19',
    name: 'Antique Leather Journal',
    price: 3499,
    category: 'books',
    image: 'https://images.unsplash.com/photo-1677064061401-f77f966ff8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGVhdGhlciUyMGpvdXJuYWx8ZW58MXx8fHwxNzU5ODQ1MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1677064061401-f77f966ff8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGVhdGhlciUyMGpvdXJuYWx8ZW58MXx8fHwxNzU5ODQ1MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviews: 31,
    description: 'Beautiful handcrafted leather journal with aged paper. Perfect for writing and sketching.',
    features: ['Handcrafted leather cover', 'Aged paper pages', 'Ribbon bookmark', 'Elastic closure'],
    inStock: true,
    vintage: true,
    year: '1920s',
    material: 'Leather & Paper',
    dimensions: '8" x 6" x 1"',
    tags: ['journal', 'leather', 'writing', 'notebook', 'handcrafted']
  },
  {
    id: '20',
    name: 'Victorian Poetry Collection',
    price: 8999,
    category: 'books',
    image: 'https://images.unsplash.com/photo-1698439854217-81c0ace2067b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwcG9ldHJ5JTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTk4NDUwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1698439854217-81c0ace2067b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwcG9ldHJ5JTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTk4NDUwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 17,
    description: 'Complete collection of Victorian era poetry including works by Tennyson, Browning, and others.',
    features: ['Complete Victorian collection', 'Famous poets included', 'Original bindings', 'Excellent condition'],
    inStock: true,
    vintage: true,
    year: '1880s',
    material: 'Cloth & Paper',
    dimensions: '9" x 6" x 8"',
    tags: ['poetry', 'victorian', 'literature', 'classic', 'collection']
  },
  {
    id: '21',
    name: 'Vintage Encyclopedia Set',
    price: 12999,
    category: 'books',
    image: 'https://images.unsplash.com/photo-1718694273115-a36bfcecd51f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZW5jeWNsb3BlZGlhJTIwc2V0fGVufDF8fHx8MTc1OTg0NTA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1718694273115-a36bfcecd51f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZW5jeWNsb3BlZGlhJTIwc2V0fGVufDF8fHx8MTc1OTg0NTA5N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.4,
    reviews: 12,
    description: 'Complete vintage encyclopedia set from 1960s. A treasure trove of knowledge and beautiful illustrations.',
    features: ['Complete 24-volume set', 'Rich illustrations', 'Gold embossed spines', '1960s edition'],
    inStock: true,
    vintage: true,
    year: '1960s',
    material: 'Hardcover & Paper',
    dimensions: '24 volumes, 10" x 7"',
    tags: ['encyclopedia', 'reference', 'knowledge', 'illustrations', 'complete-set']
  },
  {
    id: '22',
    name: 'Antique Cookbook Collection',
    price: 5999,
    category: 'books',
    image: 'https://images.unsplash.com/photo-1732850960570-dc1fafea0970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29va2Jvb2slMjByZWNpcGV8ZW58MXx8fHwxNzU5ODQ1MDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1732850960570-dc1fafea0970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29va2Jvb2slMjByZWNpcGV8ZW58MXx8fHwxNzU5ODQ1MDk5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 29,
    description: 'Charming collection of vintage cookbooks with traditional recipes and cooking techniques.',
    features: ['Traditional recipes', 'Beautiful illustrations', 'Historic cooking methods', 'Set of 8 books'],
    inStock: true,
    vintage: true,
    year: '1940s',
    material: 'Paper & Cloth',
    dimensions: '8 books, various sizes',
    tags: ['cookbook', 'recipes', 'cooking', 'traditional', 'culinary']
  },

  // HOME DECOR CATEGORY (5 products)
  {
    id: '4',
    name: 'Ming Dynasty Ceramic Vase',
    price: 32000,
    category: 'home-decor',
    image: 'https://images.unsplash.com/photo-1759163067401-64a3cc5aa9ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaG9tZSUyMGRlY29yJTIwYW50aXF1ZSUyMHZhc2V8ZW58MXx8fHwxNzU5ODQzNjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1759163067401-64a3cc5aa9ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaG9tZSUyMGRlY29yJTIwYW50aXF1ZSUyMHZhc2V8ZW58MXx8fHwxNzU5ODQzNjIwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 12,
    description: 'Authentic Ming Dynasty ceramic vase with traditional blue and white patterns.',
    features: ['Authentic Ming Dynasty', 'Blue and white porcelain', 'Hand-painted details', 'Certificate of authenticity'],
    inStock: true,
    vintage: true,
    year: '16th Century',
    material: 'Porcelain',
    dimensions: '14" H x 6" W',
    tags: ['vase', 'ming-dynasty', 'porcelain', 'chinese', 'antique']
  },
  {
    id: '23',
    name: 'Vintage Brass Candle Holders',
    price: 4999,
    category: 'home-decor',
    image: 'https://images.unsplash.com/photo-1590595536952-b41d04eb7b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaG9tZSUyMGRlY29yJTIwY2FuZGxlc3xlbnwxfHx8fDE3NTk4NDUxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1590595536952-b41d04eb7b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaG9tZSUyMGRlY29yJTIwY2FuZGxlc3xlbnwxfHx8fDE3NTk4NDUxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviews: 34,
    description: 'Elegant set of vintage brass candle holders with intricate detailing. Perfect for creating ambiance.',
    features: ['Solid brass construction', 'Intricate detailing', 'Set of 3 different heights', 'Tarnish-resistant finish'],
    inStock: true,
    vintage: true,
    year: '1950s',
    material: 'Brass',
    dimensions: '6", 8", 10" heights',
    tags: ['candles', 'brass', 'holders', 'ambiance', 'elegant']
  },
  {
    id: '24',
    name: 'Antique Mantle Clock',
    price: 9999,
    category: 'home-decor',
    image: 'https://images.unsplash.com/photo-1724230758634-8f88fa320c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwY2xvY2slMjBtYW50bGV8ZW58MXx8fHwxNzU5ODQ1MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1724230758634-8f88fa320c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwY2xvY2slMjBtYW50bGV8ZW58MXx8fHwxNzU5ODQ1MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 18,
    description: 'Beautiful antique mantle clock with ornate carved details and working mechanism.',
    features: ['Working mechanical movement', 'Ornate carved case', 'Westminster chimes', 'Key-wind mechanism'],
    inStock: true,
    vintage: true,
    year: '1920s',
    material: 'Wood & Brass',
    dimensions: '16" W x 6" D x 12" H',
    tags: ['clock', 'mantle', 'mechanical', 'chimes', 'ornate']
  },
  {
    id: '25',
    name: 'Ornate Picture Frame Set',
    price: 6999,
    category: 'home-decor',
    image: 'https://images.unsplash.com/photo-1674816926075-dff16b68a24f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcGljdHVyZSUyMGZyYW1lJTIwb3JuYXRlfGVufDF8fHx8MTc1OTg0NTEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1674816926075-dff16b68a24f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcGljdHVyZSUyMGZyYW1lJTIwb3JuYXRlfGVufDF8fHx8MTc1OTg0NTEwOHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.5,
    reviews: 26,
    description: 'Exquisite set of ornate picture frames with gold leaf finish. Perfect for displaying cherished photos.',
    features: ['Gold leaf finish', 'Ornate baroque design', 'Set of 4 frames', 'Various sizes included'],
    inStock: true,
    vintage: true,
    year: '1960s',
    material: 'Wood & Gold Leaf',
    dimensions: '8x10", 5x7", 4x6" frames',
    tags: ['frames', 'gold-leaf', 'baroque', 'ornate', 'photos']
  },
  {
    id: '26',
    name: 'Vintage Table Lamp',
    price: 7899,
    category: 'home-decor',
    image: 'https://images.unsplash.com/photo-1666468352545-e284da389d46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwbGFtcCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzU5ODQ1MTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1666468352545-e284da389d46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwbGFtcCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzU5ODQ1MTExfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 22,
    description: 'Elegant vintage table lamp with fabric shade and brass base. Provides warm, ambient lighting.',
    features: ['Brass base', 'Fabric shade', 'Warm lighting', 'Rewired for safety'],
    inStock: true,
    vintage: true,
    year: '1940s',
    material: 'Brass & Fabric',
    dimensions: '8" W x 24" H',
    tags: ['lamp', 'table', 'brass', 'lighting', 'ambient']
  },

  // ELECTRONICS CATEGORY (6 products)
  {
    id: '5',
    name: 'Vintage Gramophone Record Player',
    price: 8999,
    originalPrice: 11000,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1725891262456-20581d6cf957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlY3Ryb25pY3MlMjByYWRpbyUyMGdyYW1vcGhvbmV8ZW58MXx8fHwxNzU5ODQzNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1725891262456-20581d6cf957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlY3Ryb25pY3MlMjByYWRpbyUyMGdyYW1vcGhvbmV8ZW58MXx8fHwxNzU5ODQzNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.5,
    reviews: 31,
    description: 'Fully restored vintage gramophone with horn speaker. Plays 78 RPM records beautifully.',
    features: ['Fully restored', 'Horn speaker', 'Manual wind mechanism', 'Includes starter records'],
    inStock: true,
    vintage: true,
    year: '1920s',
    material: 'Wood & Metal',
    dimensions: '24" H x 18" W x 16" D',
    tags: ['gramophone', 'record-player', 'vintage', 'music', 'restored']
  },
  {
    id: '27',
    name: 'Vintage Radio Console',
    price: 12999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1639148604935-d4eb364ae0ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcmFkaW8lMjBhbnRpcXVlfGVufDF8fHx8MTc1OTg0NTExM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1639148604935-d4eb364ae0ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcmFkaW8lMjBhbnRpcXVlfGVufDF8fHx8MTc1OTg0NTExM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviews: 16,
    description: 'Beautiful vintage radio console with rich wood cabinet and restored electronics for modern use.',
    features: ['Restored electronics', 'Rich wood cabinet', 'AM/FM capability', 'Vintage styling'],
    inStock: true,
    vintage: true,
    year: '1940s',
    material: 'Wood & Electronics',
    dimensions: '36" W x 16" D x 32" H',
    tags: ['radio', 'console', 'wood', 'restored', 'electronics']
  },
  {
    id: '28',
    name: 'Classic Typewriter',
    price: 6999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1750652097584-9ffc464fa937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwZXdyaXRlciUyMGNsYXNzaWN8ZW58MXx8fHwxNzU5ODQ1MTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1750652097584-9ffc464fa937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwZXdyaXRlciUyMGNsYXNzaWN8ZW58MXx8fHwxNzU5ODQ1MTE3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 25,
    description: 'Fully functional vintage typewriter in excellent condition. Perfect for writers and collectors.',
    features: ['Fully functional', 'All keys working', 'Ribbon included', 'Carrying case'],
    inStock: true,
    vintage: true,
    year: '1950s',
    material: 'Metal & Plastic',
    dimensions: '15" W x 12" D x 6" H',
    tags: ['typewriter', 'functional', 'writing', 'office', 'classic']
  },
  {
    id: '29',
    name: 'Vintage Rotary Telephone',
    price: 3999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1678705544977-0d0b86a8b5f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwdGVsZXBob25lJTIwdmludGFnZXxlbnwxfHx8fDE3NTk4NDUxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1678705544977-0d0b86a8b5f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwdGVsZXBob25lJTIwdmludGFnZXxlbnwxfHx8fDE3NTk4NDUxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.4,
    reviews: 33,
    description: 'Classic rotary dial telephone in working condition. A charming piece of communication history.',
    features: ['Working condition', 'Rotary dial mechanism', 'Classic design', 'Restored electronics'],
    inStock: true,
    vintage: true,
    year: '1960s',
    material: 'Bakelite & Metal',
    dimensions: '10" W x 8" D x 8" H',
    tags: ['telephone', 'rotary', 'communication', 'bakelite', 'working']
  },
  {
    id: '30',
    name: 'Vintage Film Camera',
    price: 5499,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1572809596155-39da9e985f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhJTIwY2xhc3NpY3xlbnwxfHx8fDE3NTk4NDUxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1572809596155-39da9e985f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhJTIwY2xhc3NpY3xlbnwxfHx8fDE3NTk4NDUxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 19,
    description: 'Professional vintage film camera in excellent working condition. Perfect for film photography enthusiasts.',
    features: ['Working condition', 'Professional quality', 'Multiple lenses', 'Leather case included'],
    inStock: true,
    vintage: true,
    year: '1970s',
    material: 'Metal & Glass',
    dimensions: '6" W x 4" D x 4" H',
    tags: ['camera', 'film', 'photography', 'professional', 'vintage']
  },

  // ACCESSORIES CATEGORY (4 products)
  {
    id: '6',
    name: 'Vintage Leather Travel Bag',
    price: 3499,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1758436999508-753921f51975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYWNjZXNzb3JpZXMlMjBsZWF0aGVyJTIwYmFnfGVufDF8fHx8MTc1OTg0MzYyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1758436999508-753921f51975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYWNjZXNzb3JpZXMlMjBsZWF0aGVyJTIwYmFnfGVufDF8fHx8MTc1OTg0MzYyNnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.4,
    reviews: 45,
    description: 'Handcrafted leather travel bag with brass hardware and compartments for all your travel needs.',
    features: ['Genuine leather', 'Brass hardware', 'Multiple compartments', 'Adjustable strap'],
    inStock: true,
    vintage: true,
    year: '1950s',
    material: 'Leather & Brass',
    dimensions: '20" W x 12" H x 8" D',
    tags: ['bag', 'leather', 'travel', 'vintage', 'brass']
  },
  {
    id: '31',
    name: 'Vintage Silk Scarf Collection',
    price: 2999,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1743324690702-d33036a5f904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYWNjZXNzb3JpZXMlMjBzY2FyZnxlbnwxfHx8fDE3NTk4NDUxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1743324690702-d33036a5f904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYWNjZXNzb3JpZXMlMjBzY2FyZnxlbnwxfHx8fDE3NTk4NDUxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 38,
    description: 'Luxurious collection of vintage silk scarves with beautiful patterns and colors.',
    features: ['100% silk material', 'Various patterns', 'Hand-rolled edges', 'Set of 5 scarves'],
    inStock: true,
    vintage: true,
    year: '1960s',
    material: '100% Silk',
    dimensions: '36" x 36" each',
    tags: ['scarf', 'silk', 'fashion', 'accessory', 'collection']
  },
  {
    id: '32',
    name: 'Classic Fedora Hat',
    price: 1999,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1584530193960-b4eb6c87081c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaGF0JTIwY2xhc3NpY3xlbnwxfHx8fDE3NTk4NDUxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1584530193960-b4eb6c87081c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaGF0JTIwY2xhc3NpY3xlbnwxfHx8fDE3NTk4NDUxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.5,
    reviews: 42,
    description: 'Timeless fedora hat made from premium felt. A classic accessory for any vintage enthusiast.',
    features: ['Premium felt material', 'Classic fedora style', 'Adjustable size', 'Vintage styling'],
    inStock: true,
    vintage: true,
    year: '1940s',
    material: 'Wool Felt',
    dimensions: 'One size fits most',
    tags: ['hat', 'fedora', 'felt', 'classic', 'style']
  },
  {
    id: '33',
    name: 'Vintage Leather Gloves',
    price: 1599,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1690232776051-8850fc8bd725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZ2xvdmVzJTIwbGVhdGhlcnxlbnwxfHx8fDE3NTk4NDUxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1690232776051-8850fc8bd725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZ2xvdmVzJTIwbGVhdGhlcnxlbnwxfHx8fDE3NTk4NDUxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 29,
    description: 'Elegant vintage leather gloves with soft lining. Perfect for formal occasions or winter wear.',
    features: ['Genuine leather', 'Soft lining', 'Button closure', 'Classic styling'],
    inStock: true,
    vintage: true,
    year: '1950s',
    material: 'Leather',
    dimensions: 'Multiple sizes available',
    tags: ['gloves', 'leather', 'formal', 'winter', 'elegant']
  }
];

export const offers: Offer[] = [
  {
    id: 'winter-sale',
    title: 'Winter Vintage Sale',
    description: 'Up to 40% off on selected vintage items',
    discount: 40,
    code: 'WINTER40',
    validUntil: new Date('2024-12-31'),
    type: 'percentage'
  },
  {
    id: 'books-bogo',
    title: 'Buy 2 Books Get 1 Free',
    description: 'Special offer on vintage book collection',
    discount: 0,
    validUntil: new Date('2024-11-30'),
    type: 'bogo'
  },
  {
    id: 'free-shipping',
    title: 'Free Shipping Above ₹999',
    description: 'No delivery charges on orders above ₹999',
    discount: 0,
    validUntil: new Date('2024-12-15'),
    type: 'fixed'
  }
];

export const coupons: Coupon[] = [
  {
    id: 'vintage10',
    code: 'VINTAGE10',
    title: '10% Off Your Order',
    description: 'Get 10% discount on your entire order',
    discount: 10,
    type: 'percentage',
    validUntil: new Date('2024-12-31'),
    isActive: true
  },
  {
    id: 'welcome500',
    code: 'WELCOME500',
    title: '₹500 Off First Order',
    description: 'Special discount for new customers',
    discount: 500,
    type: 'fixed',
    minAmount: 2000,
    validUntil: new Date('2024-12-31'),
    isActive: true
  },
  {
    id: 'antique25',
    code: 'ANTIQUE25',
    title: '25% Off Premium Items',
    description: 'Exclusive discount on premium antique pieces',
    discount: 25,
    type: 'percentage',
    minAmount: 5000,
    validUntil: new Date('2024-11-30'),
    isActive: true
  },
  {
    id: 'vintage1000',
    code: 'VINTAGE1000',
    title: '₹1000 Off Big Orders',
    description: 'Large discount for orders above ₹10,000',
    discount: 1000,
    type: 'fixed',
    minAmount: 10000,
    validUntil: new Date('2024-12-15'),
    isActive: true
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'u1',
    userName: 'Margaret Thompson',
    rating: 5,
    comment: 'Absolutely stunning piece! The craftsmanship is incredible and it arrived in perfect condition.',
    date: new Date('2024-01-15'),
    verified: true
  },
  {
    id: 'r2',
    productId: '2',
    userId: 'u2',
    userName: 'James Wilson',
    rating: 5,
    comment: 'My wife loves this ring! The Art Deco design is exactly what we were looking for.',
    date: new Date('2024-01-10'),
    verified: true
  },
  {
    id: 'r3',
    productId: '5',
    userId: 'u3',
    userName: 'Classical Music Lover',
    rating: 4,
    comment: 'Great restoration work. Sounds amazing and really adds character to our living room.',
    date: new Date('2024-01-05'),
    verified: true
  },
  {
    id: 'r4',
    productId: '12',
    userId: 'u4',
    userName: 'Elizabeth Grant',
    rating: 5,
    comment: 'Beautiful necklace! The pearls have a lovely luster and the clasp is very secure.',
    date: new Date('2024-01-20'),
    verified: true
  },
  {
    id: 'r5',
    productId: '18',
    userId: 'u5',
    userName: 'Book Collector',
    rating: 4,
    comment: 'Excellent condition for the age. Perfect addition to my vintage library.',
    date: new Date('2024-01-18'),
    verified: true
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Eleanor Whitfield',
    location: 'New York',
    text: 'Vintage Vault has the most exquisite collection of antiques I\'ve ever seen. Every piece tells a story.',
    rating: 5,
    avatar: '👩‍🦳'
  },
  {
    id: 2,
    name: 'Charles Pemberton',
    location: 'London',
    text: 'The quality and authenticity of items here is unmatched. I\'ve built my entire collection through them.',
    rating: 5,
    avatar: '👨‍🦲'
  },
  {
    id: 3,
    name: 'Isabella Rodriguez',
    location: 'Barcelona',
    text: 'From furniture to jewelry, everything arrives in perfect condition. Truly a treasure trove!',
    rating: 5,
    avatar: '👩‍🦱'
  }
];