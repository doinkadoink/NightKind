# NightKind Collective Cart System

## Overview
The NightKind Collective cart system is a comprehensive e-commerce solution designed specifically for the alternative fashion brand supporting bat conservation. The system provides a seamless shopping experience with advanced features including wishlists, saved items, search, filtering, and data management.

## Features

### 🛒 Core Cart Functionality
- **Add/Remove Items**: Add products to cart with size selection and quantity management
- **Quantity Management**: Adjust quantities with validation (max 99 items)
- **Size Selection**: Support for products with multiple size options
- **Real-time Updates**: Cart updates across all pages using localStorage
- **Cross-page Communication**: Cart state synchronized between different pages

### ❤️ Wishlist System
- **Add to Wishlist**: Save products for later consideration
- **Wishlist Management**: View, remove, and move items from wishlist to cart
- **Wishlist Count**: Display current wishlist items count
- **Persistent Storage**: Wishlist saved in localStorage

### 💾 Save for Later
- **Save Cart**: Temporarily save entire cart contents
- **Load Saved Cart**: Restore previously saved cart items
- **Individual Management**: Move specific saved items back to cart

### 🔍 Search & Filter
- **Text Search**: Search cart items by name, description, or tags
- **Category Filtering**: Filter by product category (stickers, keychains, pins, t-shirts)
- **Advanced Sorting**: Sort by name, price, date added, or quantity
- **Real-time Results**: Instant search results as you type

### 📊 Cart Analytics
- **Item Statistics**: Total items, unique items, total value
- **Category Breakdown**: Items organized by product category
- **Average Pricing**: Calculate average item price
- **Conservation Impact**: Track how purchases support bat rescue operations

### 📤 Data Management
- **Export Cart**: Download cart data as JSON file
- **Import Cart**: Import previously exported cart data
- **Data Portability**: Easy transfer of cart data between devices
- **Backup & Restore**: Safeguard shopping cart information

### 🚚 Shipping Options
- **Standard Shipping**: 5-7 business days ($5.99)
- **Express Shipping**: 2-3 business days ($12.99)
- **Overnight Shipping**: Next business day ($24.99)
- **Dynamic Pricing**: Shipping costs calculated based on selection

### 💰 Pricing & Taxes
- **Subtotal Calculation**: Sum of all items with quantities
- **Tax Calculation**: 10% GST applied to subtotal
- **Total Calculation**: Subtotal + shipping + tax
- **Real-time Updates**: All calculations update automatically

## Technical Architecture

### File Structure
```
NightKind/
├── cart.html              # Main cart page with all functionality
├── cart-utils.js          # Core cart utilities and classes
├── products.js            # Product catalog and utilities
├── stickers.html          # Product page with cart integration
├── keychains.html         # Product page (to be implemented)
├── pins.html              # Product page (to be implemented)
├── tshirts.html           # Product page (to be implemented)
└── CART_SYSTEM_README.md  # This documentation
```

### Core Classes

#### NightKindCart
Main cart management class with methods for:
- Adding/removing items
- Quantity management
- Cart persistence
- Cross-page communication
- Wishlist management
- Data export/import

#### CartNotification
User notification system for:
- Success messages
- Error alerts
- Warning notifications
- Info messages

#### ProductManager
Product catalog management with:
- Product retrieval by category
- Search functionality
- Related products
- Featured products
- Conservation impact tracking

### Data Storage
- **localStorage**: Primary storage for cart, wishlist, and saved items
- **Cross-page Events**: Storage events for real-time synchronization
- **Data Persistence**: Cart data survives browser sessions
- **Export/Import**: JSON format for data portability

## Usage Examples

### Adding Items to Cart
```javascript
// Add product with size selection
nightkindCart.addToCart(product, 'Large', 2);

// Add product without size (uses default)
nightkindCart.addToCart(product, null, 1);
```

### Wishlist Management
```javascript
// Add to wishlist
nightkindCart.addToWishlist(product);

// Remove from wishlist
nightkindCart.removeFromWishlist(productId);

// Move from wishlist to cart
nightkindCart.moveToCart(productId, size, quantity);
```

### Search and Filter
```javascript
// Search cart items
const results = nightkindCart.searchCart('gothic');

// Filter by category
const stickers = nightkindCart.filterCartByCategory('stickers');

// Sort by price (low to high)
const sorted = nightkindCart.sortCart('price', 'asc');
```

### Data Export/Import
```javascript
// Export cart data
nightkindCart.exportCart();

// Import cart data
nightkindCart.importCart(jsonData);
```

## Product Integration

### Product Structure
Each product includes:
```javascript
{
  id: 'unique-product-id',
  name: 'Product Name',
  description: 'Product description',
  price: 25.00,
  image: '🦇',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  category: 'tshirts',
  inStock: true,
  tags: ['gothic', 'bat', 'black'],
  stockLevel: 20,
  conservationImpact: 'Supports 5 bat rescue operations'
}
```

### Adding New Products
1. Add product data to `products.js`
2. Include required fields (id, name, description, price, image, category)
3. Add optional fields (sizes, tags, stockLevel, conservationImpact)
4. Product automatically appears in relevant category pages

## Conservation Impact

### Tracking System
- Each product includes conservation impact information
- Impact measured in "bat rescue operations supported"
- Higher-priced items support more rescue operations
- Real-time calculation of total conservation impact

### Impact Examples
- Stickers: 1-2.4 bat rescue operations
- Keychains: 2.4-3.6 bat rescue operations
- Pins: 1.6-4 bat rescue operations
- T-shirts: 5-6 bat rescue operations

## Browser Compatibility

### Supported Browsers
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Required Features
- localStorage support
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Modern CSS variables

## Performance Considerations

### Optimization Features
- Lazy loading of product images
- Efficient localStorage operations
- Minimal DOM manipulation
- Debounced search input
- Optimized event listeners

### Memory Management
- Automatic cleanup of old cart data
- Efficient product filtering algorithms
- Minimal object creation during operations
- Proper event listener cleanup

## Security Features

### Data Validation
- Product ID validation
- Size and quantity validation
- Price range validation
- Input sanitization

### Storage Security
- Local storage only (no server communication)
- Data validation before storage
- Error handling for corrupted data
- Graceful fallbacks for missing data

## Future Enhancements

### Planned Features
- **User Accounts**: Persistent cart across devices
- **Payment Integration**: Stripe/PayPal checkout
- **Inventory Management**: Real-time stock tracking
- **Order History**: Track previous purchases
- **Social Sharing**: Share wishlists and carts
- **Recommendations**: AI-powered product suggestions

### Technical Improvements
- **Service Workers**: Offline cart functionality
- **IndexedDB**: Larger storage capacity
- **WebSockets**: Real-time inventory updates
- **PWA Support**: Installable web app

## Troubleshooting

### Common Issues

#### Cart Not Updating
- Check localStorage permissions
- Verify cart-utils.js is loaded
- Check browser console for errors
- Ensure proper event listener setup

#### Wishlist Not Working
- Verify wishlist functions are defined
- Check localStorage for wishlist data
- Ensure proper product ID format
- Check for JavaScript errors

#### Search Not Working
- Verify search input element exists
- Check search function implementation
- Ensure product data is loaded
- Verify filter functions are working

### Debug Mode
Enable debug logging:
```javascript
// Add to any page
localStorage.setItem('nightkindDebug', 'true');
```

## Support

### Documentation
- This README file
- Inline code comments
- Console logging for debugging
- Error handling with user-friendly messages

### Development
- Modular code structure
- Comprehensive error handling
- Extensive logging
- Easy to extend and modify

---

**NightKind Collective Cart System** - Supporting bat conservation through alternative fashion since 2025.

*Every purchase directly funds wildlife rescue operations and bat conservation efforts in Queensland.*
