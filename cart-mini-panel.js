// NightKind Collective - Standardized Cart Mini Panel Component
// This file provides consistent cart mini panel functionality across all product pages

class CartMiniPanel {
  constructor() {
    this.timeout = null;
    this.delay = 1500; // 1.5 second delay for better usability
    this.isVisible = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.render();
    this.setupGlobalListeners();
  }

  setupEventListeners() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartMiniPanel = document.getElementById('cartMiniPanel');

    if (cartIcon && cartMiniPanel) {
      // Show panel on hover
      cartIcon.addEventListener('mouseenter', () => this.show());
      cartIcon.addEventListener('mouseleave', () => this.hideDelayed());

      // Keep panel open when hovering over it
      cartMiniPanel.addEventListener('mouseenter', () => this.clearTimeout());
      cartMiniPanel.addEventListener('mouseleave', () => this.hideDelayed());

      // Click to toggle on mobile
      cartIcon.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.toggle();
        }
      });
    }
  }

  setupGlobalListeners() {
    // Listen for cart updates from other pages
    window.addEventListener('storage', (e) => {
      if (e.key === 'nightkindCart' || e.key === 'nightkindCartCount') {
        this.render();
      }
    });

    // Listen for custom cart events
    window.addEventListener('nightkindCartUpdated', () => {
      this.render();
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      const cartIcon = document.querySelector('.cart-icon');
      const cartMiniPanel = document.getElementById('cartMiniPanel');
      
      if (cartMiniPanel && cartIcon && 
          !cartIcon.contains(e.target) && 
          !cartMiniPanel.contains(e.target)) {
        this.hide();
      }
    });

    // Close panel on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
  }

  show() {
    this.clearTimeout();
    const panel = document.getElementById('cartMiniPanel');
    if (panel) {
      panel.classList.add('show');
      this.isVisible = true;
      this.render();
    }
  }

  hide() {
    const panel = document.getElementById('cartMiniPanel');
    if (panel) {
      panel.classList.remove('show');
      this.isVisible = false;
    }
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  hideDelayed() {
    this.timeout = setTimeout(() => this.hide(), this.delay);
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    const content = document.getElementById('cartMiniContent');
    const footer = document.getElementById('cartMiniFooter');

    if (!content || !footer) return;

    if (nightkindCart.isEmpty()) {
      content.innerHTML = `
        <div class="cart-mini-empty">
          <div class="cart-mini-empty-icon">🛒</div>
          <h3 class="cart-mini-empty-text">Your cart is empty</h3>
          <p class="cart-mini-empty-text">Add some NightKind products to get started!</p>
        </div>
      `;
      footer.innerHTML = `
        <div class="cart-mini-actions">
          <button class="cart-mini-btn secondary" onclick="window.location.href='shop-categories.html'">
            Browse Products
          </button>
        </div>
      `;
      return;
    }

    // Render cart items (show first 3)
    const cartItems = nightkindCart.getItems().slice(0, 3).map(item => `
      <div class="cart-mini-item" data-item-id="${item.id}" data-size="${item.size || ''}">
        <div class="cart-mini-item-image">${item.image}</div>
        <div class="cart-mini-item-details">
          <div class="cart-mini-item-name">${item.name}</div>
          ${item.size ? `<div class="cart-mini-item-size">Size: ${item.size}</div>` : ''}
          <div class="cart-mini-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-mini-item-quantity">
          <button class="cart-mini-quantity-btn" onclick="CartMiniPanel.updateQuantity('${item.id}', '${item.size || ''}', -1)" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
          <div class="cart-mini-quantity-display">${item.quantity}</div>
          <button class="cart-mini-quantity-btn" onclick="CartMiniPanel.updateQuantity('${item.id}', '${item.size || ''}', 1)" ${item.quantity >= 99 ? 'disabled' : ''}>+</button>
        </div>
        <button class="cart-mini-remove-btn" onclick="CartMiniPanel.removeItem('${item.id}', '${item.size || ''}')" title="Remove item">×</button>
      </div>
    `).join('');

    // Add "more items" indicator if there are more than 3 items
    if (nightkindCart.getItems().length > 3) {
      cartItems += `
        <div class="cart-mini-item" style="justify-content: center; color: #888; font-style: italic;">
          +${nightkindCart.getItems().length - 3} more items
        </div>
      `;
    }

    content.innerHTML = cartItems;

    // Calculate totals
    const totals = nightkindCart.getCartTotal();

    // Render footer
    footer.innerHTML = `
      <div class="cart-mini-total">
        <span>Total:</span>
        <span>$${totals.total.toFixed(2)}</span>
      </div>
      <div class="cart-mini-actions">
        <button class="cart-mini-btn secondary" onclick="window.location.href='cart.html'">
          View Cart
        </button>
        <button class="cart-mini-btn primary" onclick="window.location.href='cart.html'">
          Checkout
        </button>
      </div>
    `;
  }

  static updateQuantity(itemId, size, change) {
    const result = nightkindCart.updateQuantity(itemId, size, change);
    
    switch (result) {
      case 'updated':
        CartMiniPanel.getInstance().render();
        CartNotification.success('Quantity updated');
        break;
      case 'removed':
        CartMiniPanel.getInstance().render();
        CartNotification.warning('Item removed from cart');
        break;
      case 'max_exceeded':
        CartNotification.error('Maximum quantity is 99');
        return;
      case 'not_found':
        CartNotification.error('Item not found in cart');
        return;
    }
  }

  static removeItem(itemId, size) {
    if (nightkindCart.removeFromCart(itemId, size)) {
      CartMiniPanel.getInstance().render();
      CartNotification.warning('Item removed from cart');
    }
  }

  static getInstance() {
    if (!CartMiniPanel.instance) {
      CartMiniPanel.instance = new CartMiniPanel();
    }
    return CartMiniPanel.instance;
  }

  // Public method to refresh the panel
  refresh() {
    this.render();
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  CartMiniPanel.getInstance();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CartMiniPanel;
} else {
  window.CartMiniPanel = CartMiniPanel;
}
