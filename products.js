// NightKind Collective Product Catalog
// This file contains all product data organized by category

const NightKindProducts = {
  stickers: [
    {
      id: 'sticker-1',
      name: 'Gothic Bat Silhouette',
      description: 'Elegant black bat with gothic details, perfect for laptops and water bottles',
      price: 5.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Gothic Bat Silhouette">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['gothic', 'bat', 'silhouette'],
      stockLevel: 50,
      conservationImpact: 'Supports 1 bat rescue operation'
    },
    {
      id: 'sticker-2',
      name: 'Moonlit Bat',
      description: 'Bat flying across a crescent moon with ethereal glow effect',
      price: 6.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Moonlit Bat">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['moon', 'bat', 'ethereal'],
      stockLevel: 45,
      conservationImpact: 'Supports 1.2 bat rescue operations'
    },
    {
      id: 'sticker-3',
      name: 'Vampire Bat',
      description: 'Detailed vampire bat with red accents and gothic styling',
      price: 7.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Vampire Bat">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['vampire', 'bat', 'gothic'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.4 bat rescue operations'
    },
    {
      id: 'sticker-4',
      name: 'Bat Skull',
      description: 'Stylized bat skull with occult symbols and dark aesthetic',
      price: 8.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Bat Skull">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['skull', 'bat', 'occult'],
      stockLevel: 35,
      conservationImpact: 'Supports 1.6 bat rescue operations'
    },
    {
      id: 'sticker-5',
      name: 'Flying Bat Pack',
      description: 'Set of 3 flying bat designs in different poses',
      price: 12.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Flying Bat Pack">',
      sizes: ['Pack'],
      category: 'stickers',
      inStock: true,
      tags: ['pack', 'flying', 'bat'],
      stockLevel: 30,
      conservationImpact: 'Supports 2.4 bat rescue operations'
    },
    {
      id: 'sticker-6',
      name: 'Conservation Bat',
      description: 'Bat with "Save the Bats" message and conservation theme',
      price: 5.50,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Conservation Bat">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['conservation', 'bat', 'message'],
      stockLevel: 55,
      conservationImpact: 'Supports 1.1 bat rescue operations'
    },
    {
      id: 'sticker-7',
      name: 'Gothic Cross Bat',
      description: 'Bat with gothic cross design and religious symbolism',
      price: 6.50,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Gothic Cross Bat">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['gothic', 'cross', 'religious'],
      stockLevel: 42,
      conservationImpact: 'Supports 1.3 bat rescue operations'
    },
    {
      id: 'sticker-8',
      name: 'Night Hunter',
      description: 'Bat in hunting pose with stars and night sky elements',
      price: 7.50,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Night Hunter">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['hunter', 'night', 'stars'],
      stockLevel: 38,
      conservationImpact: 'Supports 1.5 bat rescue operations'
    },
    {
      id: 'sticker-9',
      name: 'Bat Wings',
      description: 'Detailed bat wing anatomy with realistic texture',
      price: 6.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Bat Wings">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['wings', 'anatomy', 'realistic'],
      stockLevel: 48,
      conservationImpact: 'Supports 1.2 bat rescue operations'
    },
    {
      id: 'sticker-10',
      name: 'Echo Location',
      description: 'Bat with sound wave patterns and scientific elements',
      price: 5.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Echo Location">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['science', 'echo', 'waves'],
      stockLevel: 52,
      conservationImpact: 'Supports 1 bat rescue operation'
    },
    {
      id: 'sticker-11',
      name: 'Cave Dweller',
      description: 'Bat in cave setting with stalactites and dark atmosphere',
      price: 6.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Cave Dweller">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['cave', 'dweller', 'dark'],
      stockLevel: 46,
      conservationImpact: 'Supports 1.2 bat rescue operations'
    },
    {
      id: 'sticker-12',
      name: 'Bat Family',
      description: 'Mother and baby bat design with heartwarming theme',
      price: 8.00,
      image: '<img src="images/BLANK_BAT_STICKER.png" alt="Bat Family">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['family', 'mother', 'baby'],
      stockLevel: 33,
      conservationImpact: 'Supports 1.6 bat rescue operations'
    },
    {
      id: 'sticker-pride-1',
      name: 'Pride Bat Sticker',
      description: 'Bat design with rainbow pride flag colors, celebrating LGBTQ+ pride',
      price: 6.00,
      image: '<img src="images/PRIDE_BAT_STICKER.png" alt="Pride Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'rainbow', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'pride'
    },
    {
      id: 'sticker-pride-2',
      name: 'Bisexual Bat Sticker',
      description: 'Bat design with bisexual pride flag colors (pink, purple, blue)',
      price: 6.00,
      image: '<img src="images/BISEXUAL_BAT_STICKER.png" alt="Bisexual Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'bisexual', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'bisexual'
    },
    {
      id: 'sticker-pride-3',
      name: 'Polysexual Bat Sticker',
      description: 'Bat design with polysexual pride flag colors (pink, green, blue)',
      price: 6.00,
      image: '<img src="images/POLYSEXUAL_BAT_STICKER.png" alt="Polysexual Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'polysexual', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'polysexual'
    },
    {
      id: 'sticker-pride-4',
      name: 'Pansexual Bat Sticker',
      description: 'Bat design with pansexual pride flag colors (pink, yellow, blue)',
      price: 6.00,
      image: '<img src="images/PANSEXUAL_BAT_PRIDE.png" alt="Pansexual Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'pansexual', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'pansexual'
    },
    {
      id: 'sticker-pride-5',
      name: 'Demisexual Bat Sticker',
      description: 'Bat design with demisexual pride flag colors (black, gray, white, purple)',
      price: 6.00,
      image: '<img src="images/DEMISEXUAL_BAT_STICKER.png" alt="Demisexual Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'demisexual', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'demisexual'
    },
    {
      id: 'sticker-pride-6',
      name: 'Asexual Bat Sticker',
      description: 'Bat design with asexual pride flag colors (black, gray, white, purple)',
      price: 6.00,
      image: '<img src="images/ASEXUAL_BAT_STICKER.png" alt="Asexual Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'asexual', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'asexual'
    },
    {
      id: 'sticker-pride-7',
      name: 'Lesbian Pride Bat Sticker',
      description: 'Bat design with lesbian pride flag colors (dark orange, orange, light orange, white, pink, dark pink, purple)',
      price: 6.00,
      image: '<img src="images/LESBIANPRIDE_BAT_STICKER.png" alt="Lesbian Pride Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'lesbian', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'lesbian'
    },
    {
      id: 'sticker-pride-8',
      name: 'Gay Men Pride Bat Sticker',
      description: 'Bat design with gay men pride flag colors (green, blue, purple, pink, red, orange, yellow)',
      price: 6.00,
      image: '<img src="images/GAYMENPRIDE_BAT_STICKER.png" alt="Gay Men Pride Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'gay', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'gay'
    },
    {
      id: 'sticker-pride-9',
      name: 'Transgender Bat Sticker',
      description: 'Bat design with transgender pride flag colors (light blue, pink, white)',
      price: 6.00,
      image: '<img src="images/TRANSGENDER_BAT_STICKER.png" alt="Transgender Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'transgender', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'transgender'
    },
    {
      id: 'sticker-pride-10',
      name: 'Aromantic Bat Sticker',
      description: 'Bat design with aromantic pride flag colors (dark green, light green, white, gray, black)',
      price: 6.00,
      image: '<img src="images/AROMANTIC_BAT_STICKER.png" alt="Aromantic Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'aromantic', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'aromantic'
    },
    {
      id: 'sticker-pride-11',
      name: 'Non-Binary Bat Sticker',
      description: 'Bat design with non-binary pride flag colors (yellow, white, purple, black)',
      price: 6.00,
      image: '<img src="images/NONBINARY_BAT_STICKER.png" alt="Non-Binary Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'non-binary', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'non-binary'
    },
    {
      id: 'sticker-pride-12',
      name: 'Intersex Bat Sticker',
      description: 'Bat design with intersex pride flag colors (yellow background with purple circle)',
      price: 6.00,
      image: '<img src="images/INTERSEX_BAT_STICKER.png" alt="Intersex Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'intersex', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'intersex'
    },
    {
      id: 'sticker-pride-13',
      name: 'Aroace Bat Sticker',
      description: 'Bat design with aroace pride flag colors (orange, yellow, white, light blue, dark blue)',
      price: 6.00,
      image: '<img src="images/AROACE_BAT_STICKER.png" alt="Aroace Bat Sticker">',
      sizes: ['Small', 'Medium', 'Large'],
      category: 'stickers',
      inStock: true,
      tags: ['pride', 'bat', 'aroace', 'lgbtq+'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.2 bat rescue operations',
      prideVariant: 'aroace'
    }
  ],

  keychains: [
    {
      id: 'keychain-1',
      name: 'Gothic Bat Keychain',
      description: 'Solid metal bat keychain with gothic engravings',
      price: 15.00,
      image: '🔑',
      sizes: ['Standard'],
      category: 'keychains',
      inStock: true,
      tags: ['gothic', 'bat', 'metal'],
      stockLevel: 25,
      conservationImpact: 'Supports 3 bat rescue operations'
    },
    {
      id: 'keychain-2',
      name: 'Glow-in-the-Dark Bat',
      description: 'Plastic bat keychain that glows in the dark',
      price: 12.00,
      image: '✨',
      sizes: ['Standard'],
      category: 'keychains',
      inStock: true,
      tags: ['glow', 'bat', 'plastic'],
      stockLevel: 30,
      conservationImpact: 'Supports 2.4 bat rescue operations'
    },
    {
      id: 'keychain-3',
      name: 'Leather Bat Keychain',
      description: 'Genuine leather bat design with embossed details',
      price: 18.00,
      image: '👜',
      sizes: ['Standard'],
      category: 'keychains',
      inStock: true,
      tags: ['leather', 'bat', 'embossed'],
      stockLevel: 20,
      conservationImpact: 'Supports 3.6 bat rescue operations'
    },
    {
      id: 'keychain-4',
      name: 'Crystal Bat Keychain',
      description: 'Resin bat keychain with crystal-like finish',
      price: 14.00,
      image: '💎',
      sizes: ['Standard'],
      category: 'keychains',
      inStock: true,
      tags: ['crystal', 'bat', 'resin'],
      stockLevel: 28,
      conservationImpact: 'Supports 2.8 bat rescue operations'
    },
    {
      id: 'keychain-5',
      name: 'Vintage Bat Keychain',
      description: 'Antique-style bat keychain with aged finish',
      price: 16.00,
      image: '🕰️',
      sizes: ['Standard'],
      category: 'keychains',
      inStock: true,
      tags: ['vintage', 'bat', 'antique'],
      stockLevel: 22,
      conservationImpact: 'Supports 3.2 bat rescue operations'
    }
  ],

  pins: [
    {
      id: 'pin-1',
      name: 'Gothic Bat Pin',
      description: 'Enamel pin featuring a gothic bat design',
      price: 8.00,
      image: '📌',
      sizes: ['Standard'],
      category: 'pins',
      inStock: true,
      tags: ['gothic', 'bat', 'enamel'],
      stockLevel: 40,
      conservationImpact: 'Supports 1.6 bat rescue operations'
    },
    {
      id: 'pin-2',
      name: 'Moon Bat Pin',
      description: 'Silver pin with bat and crescent moon design',
      price: 10.00,
      image: '🌙',
      sizes: ['Standard'],
      category: 'pins',
      inStock: true,
      tags: ['moon', 'bat', 'silver'],
      stockLevel: 35,
      conservationImpact: 'Supports 2 bat rescue operations'
    },
    {
      id: 'pin-3',
      name: 'Conservation Pin Set',
      description: 'Set of 3 pins promoting bat conservation',
      price: 20.00,
      image: '🦇',
      sizes: ['Set'],
      category: 'pins',
      inStock: true,
      tags: ['conservation', 'bat', 'set'],
      stockLevel: 25,
      conservationImpact: 'Supports 4 bat rescue operations'
    },
    {
      id: 'pin-4',
      name: 'Vampire Bat Pin',
      description: 'Red enamel pin with vampire bat design',
      price: 9.00,
      image: '🦇',
      sizes: ['Standard'],
      category: 'pins',
      inStock: true,
      tags: ['vampire', 'bat', 'red'],
      stockLevel: 38,
      conservationImpact: 'Supports 1.8 bat rescue operations'
    },
    {
      id: 'pin-5',
      name: 'Bat Skull Pin',
      description: 'Dark enamel pin with bat skull motif',
      price: 11.00,
      image: '💀',
      sizes: ['Standard'],
      category: 'pins',
      inStock: true,
      tags: ['skull', 'bat', 'dark'],
      stockLevel: 32,
      conservationImpact: 'Supports 2.2 bat rescue operations'
    }
  ],

  tshirts: [
    {
      id: 'tshirt-1',
      name: 'Gothic Bat T-Shirt',
      description: 'Black t-shirt with gothic bat design in white',
      price: 25.00,
      image: '👕',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: 'tshirts',
      inStock: true,
      tags: ['gothic', 'bat', 'black'],
      stockLevel: 20,
      conservationImpact: 'Supports 5 bat rescue operations'
    },
    {
      id: 'tshirt-2',
      name: 'Conservation Bat T-Shirt',
      description: 'Dark green t-shirt with "Save the Bats" message',
      price: 28.00,
      image: '🌿',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: 'tshirts',
      inStock: true,
      tags: ['conservation', 'bat', 'green'],
      stockLevel: 18,
      conservationImpact: 'Supports 5.6 bat rescue operations'
    },
    {
      id: 'tshirt-3',
      name: 'Vintage Bat T-Shirt',
      description: 'Distressed t-shirt with vintage bat artwork',
      price: 30.00,
      image: '🕰️',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: 'tshirts',
      inStock: true,
      tags: ['vintage', 'bat', 'distressed'],
      stockLevel: 15,
      conservationImpact: 'Supports 6 bat rescue operations'
    },
    {
      id: 'tshirt-4',
      name: 'Night Hunter T-Shirt',
      description: 'Dark blue t-shirt with bat hunting design',
      price: 27.00,
      image: '⭐',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: 'tshirts',
      inStock: true,
      tags: ['hunter', 'night', 'blue'],
      stockLevel: 22,
      conservationImpact: 'Supports 5.4 bat rescue operations'
    },
    {
      id: 'tshirt-5',
      name: 'Bat Family T-Shirt',
      description: 'Gray t-shirt with mother and baby bat design',
      price: 26.00,
      image: '👨‍👩‍👧‍👦',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: 'tshirts',
      inStock: true,
      tags: ['family', 'bat', 'gray'],
      stockLevel: 19,
      conservationImpact: 'Supports 5.2 bat rescue operations'
    }
  ]
};

// Product utility functions
const ProductUtils = {
  // Get all products
  getAllProducts() {
    return Object.values(NightKindProducts).flat();
  },

  // Get products by category
  getProductsByCategory(category) {
    return NightKindProducts[category] || [];
  },

  // Get product by ID
  getProductById(id) {
    return this.getAllProducts().find(product => product.id === id);
  },

  // Search products
  searchProducts(query, category = null) {
    const searchTerm = query.toLowerCase();
    let products = category ? this.getProductsByCategory(category) : this.getAllProducts();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },

  // Get related products
  getRelatedProducts(productId, limit = 4) {
    const product = this.getProductById(productId);
    if (!product) return [];
    
    const products = this.getAllProducts().filter(p => 
      p.id !== productId && 
      (p.category === product.category || 
       p.tags.some(tag => product.tags.includes(tag)))
    );
    
    return products.slice(0, limit);
  },

  // Get products by tag
  getProductsByTag(tag) {
    return this.getAllProducts().filter(product => 
      product.tags.includes(tag)
    );
  },

  // Get products in price range
  getProductsByPriceRange(minPrice, maxPrice) {
    return this.getAllProducts().filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  },

  // Get featured products (random selection)
  getFeaturedProducts(limit = 6) {
    const allProducts = this.getAllProducts();
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  },

  // Get best sellers (by stock level - lower means more popular)
  getBestSellers(limit = 6) {
    const allProducts = this.getAllProducts();
    return allProducts
      .sort((a, b) => a.stockLevel - b.stockLevel)
      .slice(0, limit);
  },

  // Get new arrivals (recently added products)
  getNewArrivals(limit = 6) {
    const allProducts = this.getAllProducts();
    return allProducts.slice(0, limit);
  },

  // Get conservation impact summary
  getConservationImpact() {
    const allProducts = this.getAllProducts();
    const totalValue = allProducts.reduce((sum, product) => sum + product.price, 0);
    const totalBatsSupported = allProducts.reduce((sum, product) => {
      const impact = parseFloat(product.conservationImpact.match(/\d+(\.\d+)?/)[0]);
      return sum + impact;
    }, 0);
    
    return {
      totalProducts: allProducts.length,
      totalValue: totalValue,
      totalBatsSupported: totalBatsSupported,
      averagePrice: totalValue / allProducts.length
    };
  },

  // Get pride sticker variants
  getPrideStickerVariants() {
    return this.getAllProducts().filter(product => 
      product.category === 'stickers' && product.prideVariant
    );
  },

  // Get pride sticker by variant
  getPrideStickerByVariant(variant) {
    return this.getAllProducts().find(product => 
      product.category === 'stickers' && product.prideVariant === variant
    );
  },

  // Get all pride products
  getPrideProducts() {
    return this.getAllProducts().filter(product => 
      product.tags.includes('pride') || product.tags.includes('lgbtq+')
    );
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NightKindProducts, ProductUtils };
} else {
  // Make available globally
  window.NightKindProducts = NightKindProducts;
  window.ProductUtils = ProductUtils;
}
