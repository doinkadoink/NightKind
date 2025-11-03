# NightKind Collective - E-commerce Platform

E-commerce platform for NightKind Collective featuring secure Stripe payments, POS system, and cart management.

## 🌐 Live Demo

Once deployed to GitHub Pages, the website will be available at:
`https://[your-username].github.io/[repository-name]/`

## Key Features

- ✅ **Stripe Payment Integration** - Secure payment processing
- ✅ **POS System** - Professional point-of-sale terminal
- ✅ **Cart Management** - Full-featured shopping cart
- ✅ **Wishlist System** - Save items for later
- ✅ **Product Catalog** - Complete product management
- ✅ **Email Notifications** - Order confirmations via EmailJS

## Quick Start

### 🚀 Want to Accept Payments NOW?
**See `QUICK_START.md`** - Get Stripe payments working in 5 minutes!

### 📋 System Overview
**See `PAYMENT_SYSTEM_SUMMARY.md`** - Complete implementation summary

### 📚 Other Guides
- **`DEPLOYMENT_GUIDE.md`** - Deploy to Vercel, Heroku, etc.
- **`CART_SYSTEM_README.md`** - Complete cart documentation
- **`CURRENT_INTEGRATION_STATUS.md`** - Implementation status

## Files Included

### Core Application
- `index.html` - Main HTML file
- `cart.html` - Shopping cart with Stripe payments
- `pos.html` - POS terminal interface
- `products.js` - Product catalog

### Payment System
- `server.js` - Stripe payment backend
- `package.json` - Dependencies and scripts
- `.env` - Environment variables (create this)

### Documentation
- `QUICK_START.md` - Get started in 5 minutes
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `CART_SYSTEM_README.md` - Cart system docs
- `CURRENT_INTEGRATION_STATUS.md` - Implementation status
- `ENV_SETUP.md` - Environment configuration

## 🚀 How to Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it something like `nightkind-collective-static`
   - Make it public
   - Don't initialize with README (we already have one)

2. **Push this code to GitHub**
   ```bash
   git remote add origin https://github.com/doinkadoink/NightKind.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "Deploy from a branch"
   - Choose "gh-pages" branch and "/(root)" folder
   - Click "Save"

4. **The website will automatically deploy** when you push to the main branch!

### Option 2: Manual Deployment

1. Push the code to GitHub as above
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → "main" branch → "/(root)" folder
4. Save and wait for deployment

## 🖥️ Local Development

### Payment Server (Required for Stripe)
```bash
# Install dependencies
npm install

# Create .env file with your Stripe key
# See QUICK_START.md for details

# Start server
npm start
```

Server runs on: http://localhost:3000

### Static Files Server (Optional)
```bash
# Using batch file (Windows)
start-server.bat

# Or using Node.js
npm run serve

# Or using Python
python -m http.server 8000
```

Static server runs on: http://localhost:8000

## Installation

1. Clone or download this repository
2. Run `npm install` to install dependencies
3. Create `.env` file with your Stripe keys (see `QUICK_START.md`)
4. Run `npm start` to start the payment server
5. Open http://localhost:3000 to view the site

## Architecture

### Frontend
- **Static HTML/CSS/JS** - No build process required
- **Stripe Elements** - Secure payment forms
- **LocalStorage** - Cart and transaction persistence

### Backend
- **Express.js** - Web server
- **Stripe API** - Payment processing
- **Webhooks** - Async event handling

### Payment Flow
```
Customer → Cart → Payment Form → Stripe Elements
                                    ↓
                              Server (Create Intent)
                                    ↓
                              Stripe API (Process)
                                    ↓
                              Webhooks (Confirm)
                                    ↓
                              Receipt & Confirmation
```

## Support

For detailed guides:
- **Quick Start**: `QUICK_START.md`
- **Deployment**: `DEPLOYMENT_GUIDE.md`
- **Cart System**: `CART_SYSTEM_README.md`
- **Integration Status**: `CURRENT_INTEGRATION_STATUS.md` 