# ⚡ Quick Deploy - Choose Your Platform

## 🎯 Fastest Option: Vercel (5 minutes)

### 1. Install & Login
```bash
npm install -g vercel
vercel login
```

### 2. Deploy
```bash
vercel
```

### 3. Add Environment Variables
```bash
vercel env add STRIPE_SECRET_KEY
# Paste: sk_live_YOUR_KEY_HERE

vercel env add STRIPE_WEBHOOK_SECRET
# Paste: whsec_YOUR_SECRET_HERE (optional)
```

### 4. Deploy to Production
```bash
vercel --prod
```

### 5. Update cart.html
Change line 1755 to your Vercel URL:
```javascript
const SERVER_URL = 'https://your-project.vercel.app';
```

### 6. Test
Visit: `https://your-project.vercel.app/health`

---

## 🎯 Alternative: Render (10 minutes)

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repo
4. Configure:
   - Build: `npm install`
   - Start: `npm start`
5. Add environment variables in dashboard
6. Deploy!
7. Update `SERVER_URL` in cart.html

---

## 🎯 Alternative: Railway (10 minutes)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo
4. Add environment variables in dashboard
5. Deploy!
6. Generate domain in settings
7. Update `SERVER_URL` in cart.html

---

## 📚 Full Instructions

See `BACKEND_DEPLOYMENT_GUIDE.md` for detailed steps for all platforms.

---

## ✅ After Deployment

1. Test: `https://your-url/health`
2. Update `SERVER_URL` in `cart.html`
3. Test payment flow on your live site
4. Check Stripe Dashboard for payments

**That's it! 🦇**
