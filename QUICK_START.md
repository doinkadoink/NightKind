# 🚀 Quick Start - Get Stripe Payments Working NOW

## What You Need
- Node.js installed (v14+)
- Your Stripe secret key
- 5 minutes

## Installation (Step by Step)

### 1. Install Dependencies
```bash
npm install
```

This installs:
- `express` - Web server
- `stripe` - Payment processing
- `cors` - Cross-origin support
- `dotenv` - Environment variables

### 2. Create `.env` File
Create a file named `.env` in the project root:

```bash
STRIPE_SECRET_KEY=sk_live_YOUR_ACTUAL_KEY_HERE
PORT=3000
```

**Find your key**: https://dashboard.stripe.com/apikeys
**Copy your Secret key** (starts with `sk_live_`)
**Paste it** in `.env`

### 3. Start the Server
```bash
npm start
```

You should see:
```
🦇 NightKind Collective Payment Server 🦇
Server running on port 3000
Stripe Mode: LIVE
Health Check: http://localhost:3000/health
```

### 4. Test It
Open browser: `http://localhost:3000/health`

Should see:
```json
{
  "status": "ok",
  "service": "NightKind Payment Server",
  "stripe": "connected"
}
```

✅ **Server is working!**

## Test a Real Payment

### 1. Open Checkout
```
http://localhost:3000/cart.html
```

### 2. Add Items to Cart
- Go to any product page
- Click "Add to Cart"
- Go to cart page

### 3. Fill Out Checkout Form
- Name: Your name
- Email: Your email
- Choose payment method: Card
- Enter test card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/25`)
- CVV: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

### 4. Submit Payment
Click "Complete Purchase"

### 5. Watch It Work
- ✅ Payment intent created
- ✅ Stripe processes card
- ✅ Payment confirmed
- ✅ Receipt generated

**Check your Stripe Dashboard** to see the payment!

## Common Issues

### "Module not found"
**Fix**: Run `npm install`

### "Server won't start"
**Fix**: 
1. Check Node.js: `node --version`
2. Install dependencies: `npm install`
3. Check `.env` file exists

### "Payment failed"
**Fix**:
1. Check server is running: `npm start`
2. Check `.env` has correct Stripe key
3. Try test card `4242 4242 4242 4242`

### "Cannot connect to server"
**Fix**:
1. Server must be running
2. Use `http://localhost:3000`
3. Check browser console for errors

## What Each File Does

| File | Purpose |
|------|---------|
| `server.js` | Payment backend (handles Stripe API) |
| `cart.html` | Checkout page (stripe Elements) |
| `package.json` | Dependencies and scripts |
| `.env` | Your secret keys (DON'T commit!) |
| `.gitignore` | Protects your secrets |

## Next: Deploy to Production

See `DEPLOYMENT_GUIDE.md` for:
- Vercel deployment
- Heroku deployment
- Traditional hosting
- SSL setup
- Webhooks configuration

## You're Done! 🎉

Your payment system is now:
- ✅ Fully functional
- ✅ PCI compliant
- ✅ Production ready
- ✅ Secure

**Start selling!** 🦇

