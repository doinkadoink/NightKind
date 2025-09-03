// NightKind Collective Cart Utilities
// This file provides consistent cart functionality across all pages

class NightKindCart {
  constructor() {
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.listeners = [];
    this.init();
  }

  // Initialize cart
  init() {
    this.updateCartCount();
    this.setupStorageListener();
    this.setupGlobalCartCount();
    this.setupWishlistCount();
  }

  // Load cart from localStorage
  loadCart() {
    try {
      return JSON.parse(localStorage.getItem('nightkindCart')) || [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  // Load wishlist from localStorage
  loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem('nightkindWishlist')) || [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      return [];
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem('nightkindCart', JSON.stringify(this.cart));
      this.updateGlobalCartCount();
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // Save wishlist to localStorage
  saveWishlist() {
    try {
      localStorage.setItem('nightkindWishlist', JSON.stringify(this.wishlist));
      this.updateWishlistCount();
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }

  // Add item to cart
  addToCart(product, size = null, quantity = 1) {
    // Validate product
    if (!product || !product.id) {
      throw new Error('Invalid product');
    }

    // Check if item already exists
    const existingItem = this.findCartItem(product.id, size);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      // Ensure quantity doesn't exceed 99
      if (existingItem.quantity > 99) {
        existingItem.quantity = 99;
      }
    } else {
      const cartItem = {
        ...product,
        quantity: quantity,
        size: size || (product.sizes ? product.sizes[0] : null),
        addedAt: new Date().toISOString(),
        cartId: this.generateCartId()
      };
      this.cart.push(cartItem);
    }

    this.saveCart();
    return this.cart;
  }

  // Add item to wishlist
  addToWishlist(product) {
    if (!product || !product.id) {
      throw new Error('Invalid product');
    }

    // Check if already in wishlist
    if (!this.wishlist.find(item => item.id === product.id)) {
      const wishlistItem = {
        ...product,
        addedAt: new Date().toISOString()
      };
      this.wishlist.push(wishlistItem);
      this.saveWishlist();
    }

    return this.wishlist;
  }

  // Remove item from wishlist
  removeFromWishlist(productId) {
    const initialLength = this.wishlist.length;
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    
    if (this.wishlist.length < initialLength) {
      this.saveWishlist();
      return true;
    }
    return false;
  }

  // Move item from wishlist to cart
  moveToCart(productId, size = null, quantity = 1) {
    const wishlistItem = this.wishlist.find(item => item.id === productId);
    if (wishlistItem) {
      this.addToCart(wishlistItem, size, quantity);
      this.removeFromWishlist(productId);
      return true;
    }
    return false;
  }

  // Generate unique cart ID
  generateCartId() {
    return 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Remove item from cart
  removeFromCart(productId, size = null) {
    const initialLength = this.cart.length;
    this.cart = this.cart.filter(item => 
      !(item.id === productId && item.size === size)
    );
    
    if (this.cart.length < initialLength) {
      this.saveCart();
      return true;
    }
    return false;
  }

  // Update item quantity
  updateQuantity(productId, size, change) {
    const item = this.findCartItem(productId, size);
    if (item) {
      const newQuantity = item.quantity + change;
      
      if (newQuantity <= 0) {
        this.removeFromCart(productId, size);
        return 'removed';
      } else if (newQuantity > 99) {
        return 'max_exceeded';
      } else {
        item.quantity = newQuantity;
        this.saveCart();
        return 'updated';
      }
    }
    return 'not_found';
  }

  // Find cart item
  findCartItem(productId, size = null) {
    return this.cart.find(item => 
      item.id === productId && item.size === size
    );
  }

  // Clear entire cart
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // Clear wishlist
  clearWishlist() {
    this.wishlist = [];
    this.saveWishlist();
  }

  // Get cart total
  getCartTotal() {
    const subtotal = this.cart.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
    const shipping = subtotal > 0 ? 5.99 : 0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  }

  // Get cart count
  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Get wishlist count
  getWishlistCount() {
    return this.wishlist.length;
  }

  // Update cart count display
  updateCartCount() {
    const count = this.getCartCount();
    const cartCountElements = document.querySelectorAll('#cartCount, .cart-count');
    
    cartCountElements.forEach(element => {
      element.textContent = count;
    });
  }

  // Update wishlist count display
  updateWishlistCount() {
    const count = this.getWishlistCount();
    const wishlistCountElements = document.querySelectorAll('#wishlistCount, .wishlist-count');
    
    wishlistCountElements.forEach(element => {
      element.textContent = count;
    });
  }

  // Update global cart count for cross-page communication
  updateGlobalCartCount() {
    const count = this.getCartCount();
    localStorage.setItem('nightkindCartCount', count.toString());
  }

  // Setup cross-page communication
  setupStorageListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'nightkindCart') {
        this.loadCart();
        this.updateCartCount();
        this.updateWishlistCount();
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('nightkindCartUpdated', {
          detail: { cart: this.cart, wishlist: this.wishlist }
        }));
      }
      
      if (event.key === 'nightkindWishlist') {
        this.loadWishlist();
        this.updateWishlistCount();
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('nightkindWishlistUpdated', {
          detail: { wishlist: this.wishlist }
        }));
      }
    });
  }

  // Setup global cart count listener
  setupGlobalCartCount() {
    // Listen for cart count changes from other pages
    window.addEventListener('storage', (e) => {
      if (e.key === 'nightkindCartCount') {
        this.updateCartCount();
      }
    });
  }

  // Setup wishlist count listener
  setupWishlistCount() {
    // Listen for wishlist count changes from other pages
    window.addEventListener('storage', (e) => {
      if (e.key === 'nightkindWishlistCount') {
        this.updateWishlistCount();
      }
    });
  }

  // Add event listener for cart changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove event listener
  removeListener(callback) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.cart);
      } catch (error) {
        console.error('Error in cart listener:', error);
      }
    });
  }

  // Trigger storage event for other pages
  triggerStorageEvent() {
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'nightkindCart',
      newValue: JSON.stringify(this.cart)
    }));
  }

  // Save cart for later
  saveForLater() {
    try {
      const savedCart = localStorage.getItem('nightkindSavedCart') || '[]';
      const savedItems = JSON.parse(savedCart);
      
      // Add current cart items to saved items
      const newSavedItems = [...savedItems, ...this.cart];
      localStorage.setItem('nightkindSavedCart', JSON.stringify(newSavedItems));
      
      // Clear current cart
      this.clearCart();
      
      return true;
    } catch (error) {
      console.error('Error saving cart for later:', error);
      return false;
    }
  }

  // Load saved cart
  loadSavedCart() {
    try {
      const savedCart = localStorage.getItem('nightkindSavedCart') || '[]';
      const savedItems = JSON.parse(savedCart);
      
      if (savedItems.length > 0) {
        this.cart = savedItems;
        this.saveCart();
        localStorage.removeItem('nightkindSavedCart');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading saved cart:', error);
      return false;
    }
  }

  // Get saved cart items
  getSavedCart() {
    try {
      const savedCart = localStorage.getItem('nightkindSavedCart') || '[]';
      return JSON.parse(savedCart);
    } catch (error) {
      console.error('Error getting saved cart:', error);
      return [];
    }
  }

  // Check if cart is empty
  isEmpty() {
    return this.cart.length === 0;
  }

  // Check if wishlist is empty
  isWishlistEmpty() {
    return this.wishlist.length === 0;
  }

  // Get cart items
  getItems() {
    return [...this.cart];
  }

  // Get wishlist items
  getWishlistItems() {
    return [...this.wishlist];
  }

  // Get cart summary
  getSummary() {
    const count = this.getCartCount();
    const totals = this.getCartTotal();
    
    return {
      itemCount: count,
      uniqueItems: this.cart.length,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total
    };
  }

  // Search products in cart
  searchCart(query) {
    const searchTerm = query.toLowerCase();
    return this.cart.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Filter cart by category
  filterCartByCategory(category) {
    return this.cart.filter(item => item.category === category);
  }

  // Filter cart by price range
  filterCartByPrice(minPrice, maxPrice) {
    return this.cart.filter(item => 
      item.price >= minPrice && item.price <= maxPrice
    );
  }

  // Sort cart by various criteria
  sortCart(criteria = 'name', direction = 'asc') {
    const sortedCart = [...this.cart];
    
    switch (criteria) {
      case 'name':
        sortedCart.sort((a, b) => {
          const result = a.name.localeCompare(b.name);
          return direction === 'asc' ? result : -result;
        });
        break;
      case 'price':
        sortedCart.sort((a, b) => {
          const result = a.price - b.price;
          return direction === 'asc' ? result : -result;
        });
        break;
      case 'date':
        sortedCart.sort((a, b) => {
          const result = new Date(a.addedAt) - new Date(b.addedAt);
          return direction === 'asc' ? result : -result;
        });
        break;
      case 'quantity':
        sortedCart.sort((a, b) => {
          const result = a.quantity - b.quantity;
          return direction === 'asc' ? result : -result;
        });
        break;
    }
    
    return sortedCart;
  }

  // Get cart statistics
  getCartStats() {
    const items = this.getItems();
    const categories = {};
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    items.forEach(item => {
      if (categories[item.category]) {
        categories[item.category] += item.quantity;
      } else {
        categories[item.category] = item.quantity;
      }
    });
    
    return {
      totalItems: this.getCartCount(),
      uniqueItems: items.length,
      totalValue: totalValue,
      categories: categories,
      averageItemPrice: items.length > 0 ? totalValue / this.getCartCount() : 0
    };
  }

  // Export cart data
  exportCart() {
    const cartData = {
      items: this.cart,
      summary: this.getSummary(),
      stats: this.getCartStats(),
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(cartData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `nightkind-cart-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }

  // Import cart data
  importCart(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (data.items && Array.isArray(data.items)) {
        this.cart = data.items;
        this.saveCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing cart:', error);
      return false;
    }
  }
}

// Notification system
class CartNotification {
  static show(message, type = 'success', duration = 4000) { // Increased default duration to 4 seconds
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notification => {
      notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.textContent = message;
    
    // Set styles
    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196F3'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${colors[type] || colors.success};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: 'Courier Prime', monospace;
      font-weight: bold;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 300px;
      word-wrap: break-word;
      cursor: pointer;
    `;
    
    // Add click to dismiss functionality
    notification.addEventListener('click', () => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    });
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after duration
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, duration);
  }

  static success(message, duration = 4000) {
    this.show(message, 'success', duration);
  }

  static error(message, duration = 5000) { // Longer duration for errors
    this.show(message, 'error', duration);
  }

  static warning(message, duration = 4000) {
    this.show(message, 'warning', duration);
  }

  static info(message, duration = 4000) {
    this.show(message, 'info', duration);
  }
}

// Product management utilities
class ProductManager {
  static getAllProducts() {
    // This would typically come from a database or API
    // For now, we'll return a sample product catalog
    return [
      // Stickers
      {
        id: 'sticker-1',
        name: 'Gothic Bat Silhouette',
        description: 'Elegant black bat with gothic details, perfect for laptops and water bottles',
        price: 5.00,
        image: '🦇',
        sizes: ['Small', 'Medium', 'Large'],
        category: 'stickers',
        inStock: true,
        tags: ['gothic', 'bat', 'silhouette'],
        stockLevel: 50
      },
      {
        id: 'sticker-2',
        name: 'Moonlit Bat',
        description: 'Bat flying across a crescent moon with ethereal glow effect',
        price: 6.00,
        image: '🌙',
        sizes: ['Small', 'Medium', 'Large'],
        category: 'stickers',
        inStock: true,
        tags: ['moon', 'bat', 'ethereal'],
        stockLevel: 45
      },
      // Add more products as needed
    ];
  }

  static searchProducts(query, category = null) {
    const products = this.getAllProducts();
    const searchTerm = query.toLowerCase();
    
    return products.filter(product => {
      const matchesQuery = 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      const matchesCategory = category ? product.category === category : true;
      
      return matchesQuery && matchesCategory;
    });
  }

  static getProductsByCategory(category) {
    return this.getAllProducts().filter(product => product.category === category);
  }

  static getProductById(id) {
    return this.getAllProducts().find(product => product.id === id);
  }

  static getRelatedProducts(productId, limit = 4) {
    const product = this.getProductById(productId);
    if (!product) return [];
    
    const products = this.getAllProducts().filter(p => 
      p.id !== productId && 
      (p.category === product.category || 
       p.tags.some(tag => product.tags.includes(tag)))
    );
    
    return products.slice(0, limit);
  }
}

// POS System for NightKind Collective
class NightKindPOS {
  constructor() {
    this.transactions = this.loadTransactions();
    this.currentTransaction = null;
    this.paymentMethods = ['cash', 'card', 'digital_wallet', 'paypal'];
    this.transactionCounter = this.getNextTransactionNumber();
    this.init();
  }

  // Initialize POS system
  init() {
    this.setupTransactionListeners();
    this.updateTransactionCounter();
  }

  // Load transactions from localStorage
  loadTransactions() {
    try {
      return JSON.parse(localStorage.getItem('nightkindTransactions')) || [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  }

  // Save transactions to localStorage
  saveTransactions() {
    try {
      localStorage.setItem('nightkindTransactions', JSON.stringify(this.transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  }

  // Get next transaction number
  getNextTransactionNumber() {
    const lastTransaction = this.transactions[this.transactions.length - 1];
    if (!lastTransaction) return 1001;
    return lastTransaction.transactionNumber + 1;
  }

  // Update transaction counter
  updateTransactionCounter() {
    this.transactionCounter = this.getNextTransactionNumber();
  }

  // Start a new transaction
  startTransaction(cartItems = null) {
    if (this.currentTransaction) {
      throw new Error('Transaction already in progress');
    }

    const items = cartItems || nightkindCart.getItems();
    if (items.length === 0) {
      throw new Error('Cannot start transaction with empty cart');
    }

    this.currentTransaction = {
      id: this.generateTransactionId(),
      transactionNumber: this.transactionCounter,
      items: [...items],
      subtotal: this.calculateSubtotal(items),
      tax: this.calculateTax(items),
      total: 0,
      status: 'pending',
      timestamp: new Date().toISOString(),
      paymentMethod: null,
      paymentDetails: null,
      customerInfo: null,
      notes: '',
      employeeId: null
    };

    this.currentTransaction.total = this.currentTransaction.subtotal + this.currentTransaction.tax;
    
    return this.currentTransaction;
  }

  // Generate unique transaction ID
  generateTransactionId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `NK-${timestamp}-${random}`.toUpperCase();
  }

  // Calculate subtotal
  calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Calculate tax (configurable rate)
  calculateTax(items, taxRate = 0.08) {
    const subtotal = this.calculateSubtotal(items);
    return Math.round(subtotal * taxRate * 100) / 100;
  }

  // Add customer information to transaction
  addCustomerInfo(customerInfo) {
    if (!this.currentTransaction) {
      throw new Error('No transaction in progress');
    }

    this.currentTransaction.customerInfo = {
      name: customerInfo.name || '',
      email: customerInfo.email || '',
      phone: customerInfo.phone || '',
      address: customerInfo.address || ''
    };
  }

  // Add notes to transaction
  addNotes(notes) {
    if (!this.currentTransaction) {
      throw new Error('No transaction in progress');
    }
    this.currentTransaction.notes = notes;
  }

  // Process payment
  processPayment(paymentMethod, paymentDetails = {}) {
    if (!this.currentTransaction) {
      throw new Error('No transaction in progress');
    }

    if (!this.paymentMethods.includes(paymentMethod)) {
      throw new Error('Invalid payment method');
    }

    // Validate payment details based on method
    if (!this.validatePaymentDetails(paymentMethod, paymentDetails)) {
      throw new Error('Invalid payment details');
    }

    this.currentTransaction.paymentMethod = paymentMethod;
    this.currentTransaction.paymentDetails = paymentDetails;
    this.currentTransaction.status = 'paid';
    this.currentTransaction.paidAt = new Date().toISOString();

    return this.currentTransaction;
  }

  // Validate payment details
  validatePaymentDetails(method, details) {
    switch (method) {
      case 'cash':
        return details.amount >= this.currentTransaction.total;
      case 'card':
        return details.cardNumber && details.expiry && details.cvv;
      case 'digital_wallet':
        return details.walletId && details.confirmation;
      case 'paypal':
        return details.paypalId && details.confirmation;
      default:
        return false;
    }
  }

  // Calculate change for cash payments
  calculateChange(amountPaid) {
    if (!this.currentTransaction) {
      throw new Error('No transaction in progress');
    }
    return Math.max(0, amountPaid - this.currentTransaction.total);
  }

  // Complete transaction
  completeTransaction() {
    if (!this.currentTransaction || this.currentTransaction.status !== 'paid') {
      throw new Error('Transaction not ready for completion');
    }

    // Update inventory
    this.updateInventory();

    // Add to transaction history
    this.transactions.push(this.currentTransaction);

    // Clear cart
    nightkindCart.clearCart();

    // Save transactions
    this.saveTransactions();

    // Generate receipt
    const receipt = this.generateReceipt();

    // Reset for next transaction
    const completedTransaction = this.currentTransaction;
    this.currentTransaction = null;
    this.updateTransactionCounter();

    return {
      transaction: completedTransaction,
      receipt: receipt
    };
  }

  // Update inventory after sale
  updateInventory() {
    if (!this.currentTransaction) return;

    this.currentTransaction.items.forEach(item => {
      // This would typically update a database
      // For now, we'll just log the update
      console.log(`Updating inventory: ${item.name} -${item.quantity}`);
      
      // In a real implementation, you'd call an API or update localStorage
      // this.updateProductStock(item.id, item.quantity);
    });
  }

  // Generate receipt
  generateReceipt() {
    if (!this.currentTransaction) {
      throw new Error('No transaction to generate receipt for');
    }

    const transaction = this.currentTransaction;
    const receipt = {
      transactionId: transaction.id,
      transactionNumber: transaction.transactionNumber,
      timestamp: transaction.timestamp,
      items: transaction.items.map(item => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      subtotal: transaction.subtotal,
      tax: transaction.tax,
      total: transaction.total,
      paymentMethod: transaction.paymentMethod,
      customerInfo: transaction.customerInfo,
      notes: transaction.notes
    };

    return receipt;
  }

  // Cancel current transaction
  cancelTransaction() {
    if (!this.currentTransaction) {
      throw new Error('No transaction to cancel');
    }

    this.currentTransaction = null;
    return true;
  }

  // Get transaction history
  getTransactionHistory(limit = 50) {
    return this.transactions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  // Get transaction by ID
  getTransactionById(transactionId) {
    return this.transactions.find(t => t.id === transactionId);
  }

  // Get transactions by date range
  getTransactionsByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.transactions.filter(t => {
      const transactionDate = new Date(t.timestamp);
      return transactionDate >= start && transactionDate <= end;
    });
  }

  // Get sales summary
  getSalesSummary(startDate = null, endDate = null) {
    let transactions = this.transactions;
    
    if (startDate && endDate) {
      transactions = this.getTransactionsByDateRange(startDate, endDate);
    }

    const summary = {
      totalTransactions: transactions.length,
      totalSales: 0,
      totalItems: 0,
      averageTransaction: 0,
      paymentMethodBreakdown: {},
      topProducts: {},
      topCategories: {}
    };

    transactions.forEach(transaction => {
      if (transaction.status === 'paid') {
        summary.totalSales += transaction.total;
        summary.totalItems += transaction.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Payment method breakdown
        const method = transaction.paymentMethod;
        summary.paymentMethodBreakdown[method] = (summary.paymentMethodBreakdown[method] || 0) + 1;
        
        // Top products
        transaction.items.forEach(item => {
          summary.topProducts[item.name] = (summary.topProducts[item.name] || 0) + item.quantity;
          summary.topCategories[item.category] = (summary.topCategories[item.category] || 0) + item.quantity;
        });
      }
    });

    summary.averageTransaction = summary.totalTransactions > 0 ? 
      summary.totalSales / summary.totalTransactions : 0;

    return summary;
  }

  // Export transaction data
  exportTransactions(format = 'json') {
    const data = {
      transactions: this.transactions,
      summary: this.getSalesSummary(),
      exportDate: new Date().toISOString()
    };

    if (format === 'csv') {
      return this.convertToCSV(data);
    }

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `nightkind-transactions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }

  // Convert data to CSV format
  convertToCSV(data) {
    // Implementation for CSV conversion
    // This would convert the transaction data to CSV format
    return 'CSV conversion not yet implemented';
  }

  // Setup transaction event listeners
  setupTransactionListeners() {
    // Listen for cart changes to update current transaction
    if (window.nightkindCart) {
      window.nightkindCart.addListener(() => {
        if (this.currentTransaction) {
          this.currentTransaction.items = nightkindCart.getItems();
          this.currentTransaction.subtotal = this.calculateSubtotal(this.currentTransaction.items);
          this.currentTransaction.tax = this.calculateTax(this.currentTransaction.items);
          this.currentTransaction.total = this.currentTransaction.subtotal + this.currentTransaction.tax;
        }
      });
    }
  }

  // Get current transaction status
  getCurrentTransactionStatus() {
    if (!this.currentTransaction) {
      return 'no_transaction';
    }
    return this.currentTransaction.status;
  }

  // Check if transaction is ready for payment
  isTransactionReadyForPayment() {
    return this.currentTransaction && 
           this.currentTransaction.status === 'pending' && 
           this.currentTransaction.items.length > 0;
  }

  // Check if transaction is ready for completion
  isTransactionReadyForCompletion() {
    return this.currentTransaction && 
           this.currentTransaction.status === 'paid';
  }
}

// Initialize global cart instance
const nightkindCart = new NightKindCart();

// Initialize global POS instance
const nightkindPOS = new NightKindPOS();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    NightKindCart, 
    CartNotification, 
    ProductManager,
    NightKindPOS,
    nightkindCart,
    nightkindPOS
  };
} else {
  // Make available globally
  window.NightKindCart = NightKindCart;
  window.CartNotification = CartNotification;
  window.ProductManager = ProductManager;
  window.NightKindPOS = NightKindPOS;
  window.nightkindCart = nightkindCart;
  window.nightkindPOS = nightkindPOS;
}
