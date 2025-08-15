# NightKind Collective - Standardized Cart System

This document describes the standardized cart functionality and styling that ensures consistency across all webpages.

## Overview

The cart system consists of three main components:
1. **Cart Utilities** (`cart-utils.js`) - Core cart functionality and data management
2. **Cart Mini Panel** (`cart-mini-panel.js`) - Interactive mini cart display
3. **Cart Styles** (`cart-mini-panel.css`) - Consistent visual styling

## Files

### Core Files
- `cart-utils.js` - Main cart functionality, localStorage management, and utilities
- `cart-mini-panel.js` - Mini cart panel component with hover/click interactions
- `cart-mini-panel.css` - Standardized cart styling across all pages
- `cart.html` - Full cart page with advanced features
- `products.js` - Product catalog and data

### Implementation Files
- `index.html` - Home page with cart integration
- `shop-categories.html` - Shop categories with cart mini-panel
- `stickers.html` - Stickers product page with cart functionality
- `keychains.html` - Keychains product page with cart functionality
- `pins.html` - Pins product page with cart functionality
- `tshirts.html` - T-shirts product page with cart functionality

## Icon Positioning

### Cart Icon
- **Position**: Fixed, top-right corner (20px from top, 20px from right)
- **Style**: Circular gold button with cart emoji
- **Behavior**: Follows user while scrolling, always accessible

### Wishlist Icon  
- **Position**: Fixed, top-right corner (20px from top, 80px from right)
- **Style**: Circular red button with heart emoji
- **Behavior**: Follows user while scrolling, always accessible

### Mini Panel
- **Position**: Fixed, below cart icon (80px from top, 20px from right)
- **Behavior**: Appears on hover/click, positioned relative to cart icon

## Standardized Cart HTML Structure

All product pages should use this consistent HTML structure:

```html
<!-- Cart Icon with Count Badge -->
<div class="cart-icon" onclick="window.location.href='cart.html'">
  <div class="cart-count" id="cartCount">0</div>
</div>

<!-- Cart Mini Panel -->
<div class="cart-mini-panel" id="cartMiniPanel">
  <div class="cart-mini-header">
    <h3 class="cart-mini-title">Shopping Cart</h3>
  </div>
  <div class="cart-mini-content" id="cartMiniContent">
    <!-- Cart items loaded automatically -->
  </div>
  <div class="cart-mini-footer" id="cartMiniFooter">
    <!-- Cart footer loaded automatically -->
  </div>
</div>
```

## Required Dependencies

### CSS
```html
<link rel="stylesheet" href="cart-mini-panel.css">
```

### JavaScript
```html
<script src="cart-utils.js"></script>
<script src="cart-mini-panel.js"></script>
```

## Features

### Floating Action Buttons
- **Fixed Positioning**: Cart and wishlist icons stay visible while scrolling
- **Consistent Design**: Both icons use the same circular button style
- **High Visibility**: Positioned in top-right corner for easy access
- **Responsive Layout**: Adapts positioning for different screen sizes

### Cart Mini Panel
- **Hover Activation**: Shows on cart icon hover (desktop)
- **Click Toggle**: Click to toggle on mobile devices
- **Auto-hide**: Hides after 1.5 seconds of inactivity
- **Item Management**: Quantity controls and remove buttons
- **Responsive**: Adapts to mobile and desktop layouts
- **Accessibility**: Keyboard navigation and focus states

### Cart Functionality
- **Add to Cart**: Products with size selection
- **Quantity Management**: Increase/decrease with validation (max 99)
- **Remove Items**: Individual item removal
- **Wishlist**: Save items for later
- **Search & Filter**: Find items in cart
- **Export/Import**: Cart data persistence
- **Statistics**: Cart analytics and insights

### Styling Features
- **Consistent Theme**: Gothic/alternative aesthetic
- **Hover Effects**: Smooth animations and transitions
- **Color Scheme**: Gold accents with dark backgrounds
- **Typography**: Courier Prime monospace font
- **Responsive Design**: Mobile-first approach
- **Accessibility**: High contrast and reduced motion support

## Implementation Guide

### 1. Add Required Files
Include the CSS and JavaScript files in your HTML:

```html
<head>
  <link rel="stylesheet" href="cart-mini-panel.css">
</head>
<body>
  <!-- Your content -->
  <script src="cart-utils.js"></script>
  <script src="cart-mini-panel.js"></script>
</body>
```

### 2. Add Cart HTML Structure
Place the cart icon and mini-panel in your page header or navigation area.

### 3. Initialize Cart
The cart system initializes automatically when the page loads.

### 4. Add Products
Use the `addToCart()` function to add products:

```javascript
function addToCart(product, size = null) {
  try {
    nightkindCart.addToCart(product, size);
    CartNotification.success('Added to cart!');
  } catch (error) {
    CartNotification.error('Error adding to cart: ' + error.message);
  }
}
```

## Cart Utilities API

### Core Methods
- `nightkindCart.addToCart(product, size, quantity)`
- `nightkindCart.removeFromCart(productId, size)`
- `nightkindCart.updateQuantity(productId, size, change)`
- `nightkindCart.getItems()`
- `nightkindCart.getCartCount()`
- `nightkindCart.getCartTotal()`

### Wishlist Methods
- `nightkindCart.addToWishlist(product)`
- `nightkindCart.removeFromWishlist(productId)`
- `nightkindCart.moveToCart(productId, size, quantity)`

### Utility Methods
- `nightkindCart.searchCart(query)`
- `nightkindCart.filterCartByCategory(category)`
- `nightkindCart.sortCart(criteria, direction)`
- `nightkindCart.exportCart()`
- `nightkindCart.importCart(jsonData)`

## Notification System

Use the `CartNotification` class for user feedback:

```javascript
CartNotification.success('Item added to cart!');
CartNotification.error('Error occurred');
CartNotification.warning('Item removed');
CartNotification.info('Cart updated');
```

## Styling Customization

The cart system uses CSS custom properties for easy theming:

```css
:root {
  --background: 0 0% 8%;
  --foreground: 60 100% 85%;
  --primary: 270 45% 25%;
  --secondary: 60 100% 65%;
  --accent: 270 35% 35%;
  --border: 0 0% 25%;
  --destructive: 0 84% 60%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
}
```

## Responsive Behavior

### Desktop (768px+)
- Cart mini-panel shows on hover
- Positioned below cart icon
- Full functionality with hover states

### Mobile (< 768px)
- Cart mini-panel slides in from right
- Click to toggle instead of hover
- Full-width panel for better usability
- Touch-friendly controls

## Browser Compatibility

- **Modern Browsers**: Full functionality
- **IE11+**: Basic functionality (limited CSS features)
- **Mobile Browsers**: Full responsive support
- **Progressive Enhancement**: Graceful degradation

## Performance Considerations

- **Lazy Loading**: Cart data loads on demand
- **Efficient Updates**: Minimal DOM manipulation
- **Event Delegation**: Optimized event handling
- **Local Storage**: Fast data persistence

## Troubleshooting

### Common Issues
1. **Cart not updating**: Check if cart-utils.js is loaded
2. **Styling issues**: Verify cart-mini-panel.css is included
3. **Mini-panel not showing**: Check HTML structure and IDs
4. **Mobile issues**: Ensure viewport meta tag is present

### Debug Mode
Enable console logging for troubleshooting:

```javascript
// Add to your page for debugging
window.debugCart = true;
```

## Future Enhancements

- **Offline Support**: Service worker integration
- **Real-time Updates**: WebSocket synchronization
- **Advanced Analytics**: User behavior tracking
- **A/B Testing**: Cart optimization experiments
- **Multi-language**: Internationalization support

## Support

For issues or questions about the cart system:
1. Check this documentation
2. Review browser console for errors
3. Verify all required files are loaded
4. Test with different browsers/devices

## Version History

- **v1.0.0**: Initial standardized cart system
- **v1.1.0**: Added mobile responsiveness
- **v1.2.0**: Enhanced accessibility features
- **v1.3.0**: Improved performance and error handling
