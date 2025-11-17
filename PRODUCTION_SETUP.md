# 🦇 Production Server Setup - nightkind.org

## ✅ What I Just Updated

**cart.html** - Updated SERVER_URL to point to your production domain:
```javascript
const SERVER_URL = 'https://nightkind.org'; // Production server
```

## 🔍 What You Need to Verify

### 1. Server Endpoints
Make sure your server at `nightkind.org` has these endpoints:

- ✅ `POST /api/create-payment-intent` - Creates payment intent
- ✅ `POST /api/confirm-payment` - Confirms payment completion
- ✅ `GET /health` - Health check (optional but useful)
- ✅ `POST /webhook` - Stripe webhooks (optional)

### 2. CORS Configuration
Your server needs to allow requests from your website. In `server.js`, make sure you have:

```javascript
app.use(cors()); // This should allow all origins, or configure specific ones
```

If you need to restrict CORS to specific domains:
```javascript
app.use(cors({
  origin: ['https://nightkind.org', 'http://localhost:3000'], // Add your frontend domains
  credentials: true
}));
```

### 3. Environment Variables on Server
Make sure your production server has these environment variables set:

```bash
STRIPE_SECRET_KEY=sk_live_YOUR_ACTUAL_KEY
PORT=3000  # or whatever port your server uses
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET  # Optional
```

### 4. SSL/HTTPS
✅ You're using `https://nightkind.org` - make sure your server has valid SSL certificates.

## 🧪 Testing Your Production Setup

### Test 1: Health Check
```bash
curl https://nightkind.org/health
```

Should return:
```json
{
  "status": "ok",
  "service": "NightKind Payment Server",
  "stripe": "connected"
}
```

### Test 2: Payment Intent Creation
Test from your browser console on your website:
```javascript
fetch('https://nightkind.org/api/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 1000, currency: 'usd' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### Test 3: Full Payment Flow
1. Go to your website: `https://nightkind.org/cart.html`
2. Add items to cart
3. Fill checkout form
4. Use test card: `4242 4242 4242 4242`
5. Complete purchase
6. Check browser console for any errors
7. Check Stripe Dashboard for payment

## 🔧 Common Issues

### "CORS error" or "Network error"
**Fix:** Make sure your server has CORS enabled and allows requests from your domain.

### "404 Not Found" on API endpoints
**Fix:** 
- Check your server routes match: `/api/create-payment-intent` and `/api/confirm-payment`
- Verify your server is running and accessible
- Check if your server uses a different base path (e.g., `/api/v1/...`)

### "Payment failed" or "Cannot connect"
**Fix:**
- Check server logs for errors
- Verify Stripe secret key is set correctly on server
- Check that server is accessible from the internet
- Test health endpoint first

### "SSL certificate error"
**Fix:** Make sure your SSL certificate is valid and not expired.

## 📋 Quick Checklist

- [ ] Server running at `https://nightkind.org`
- [ ] API endpoints accessible (`/api/create-payment-intent`, `/api/confirm-payment`)
- [ ] CORS configured to allow your domain
- [ ] Environment variables set on server (STRIPE_SECRET_KEY)
- [ ] SSL certificate valid
- [ ] Health check works: `https://nightkind.org/health`
- [ ] Test payment flow works end-to-end
- [ ] Stripe Dashboard shows test payments

## 🎯 Next Steps

1. **Test the payment flow** on your live site
2. **Check server logs** if anything fails
3. **Configure EmailJS** (optional) - See `EMAIL_SETUP_GUIDE.md`
4. **Set up webhooks** (optional) - For async payment confirmations

## 📞 Need Help?

- Check server logs for error messages
- Test health endpoint first
- Verify Stripe keys are correct
- Check browser console for frontend errors
- Review `server.js` to ensure routes match

---

**Your website is now configured for production! 🦇**

