# 🚀 Backend Deployment Guide - NightKind Payment Server

This guide will help you deploy your `server.js` backend to production so your payment system works on `https://www.nightkind.org`.

## 📋 Quick Overview

Your frontend is already live on GitHub Pages at `https://www.nightkind.org`, but the backend server needs to be deployed separately. Choose one of these platforms:

- **Vercel** (Recommended - Easiest, free tier available)
- **Render** (Free tier, simple setup)
- **Railway** (Free tier, good for Node.js)

---

## 🎯 Option 1: Deploy to Vercel (Recommended)

### Why Vercel?
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS
- ✅ Easy GitHub integration
- ✅ Great for Node.js/Express apps
- ✅ Fast deployment

### Step-by-Step:

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy
From your project directory:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → `nightkind-payment-server` (or any name)
- **Directory?** → `./` (current directory)

#### 4. Set Environment Variables

After deployment, set your Stripe keys:

**Option A: Via CLI**
```bash
vercel env add STRIPE_SECRET_KEY
# Paste your key when prompted

vercel env add STRIPE_WEBHOOK_SECRET
# Paste your webhook secret (optional)
```

**Option B: Via Dashboard**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `STRIPE_SECRET_KEY` = `sk_live_YOUR_KEY_HERE`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_YOUR_SECRET_HERE` (optional)
   - `PORT` = `3000` (optional, Vercel handles this)

#### 5. Redeploy with Environment Variables
```bash
vercel --prod
```

#### 6. Get Your Backend URL

After deployment, Vercel will give you a URL like:
```
https://nightkind-payment-server.vercel.app
```

Or you can set a custom domain in Vercel dashboard.

#### 7. Update Frontend

Update `cart.html` line 1755:
```javascript
const SERVER_URL = 'https://nightkind-payment-server.vercel.app'; // Your Vercel URL
```

Or if you set up a custom domain:
```javascript
const SERVER_URL = 'https://api.nightkind.org'; // Custom subdomain
```

#### 8. Test It

Visit: `https://your-vercel-url.vercel.app/health`

Should return:
```json
{
  "status": "ok",
  "service": "NightKind Payment Server",
  "stripe": "connected"
}
```

---

## 🎯 Option 2: Deploy to Render

### Why Render?
- ✅ Free tier available
- ✅ Simple YAML configuration
- ✅ Automatic HTTPS
- ✅ Easy GitHub integration

### Step-by-Step:

#### 1. Create Render Account
Go to https://render.com and sign up (free)

#### 2. Connect GitHub Repository
1. Click "New" → "Web Service"
2. Connect your GitHub account
3. Select your NightKind repository

#### 3. Configure Service
- **Name:** `nightkind-payment-server`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

#### 4. Set Environment Variables
In the Render dashboard, go to "Environment" section and add:
- `STRIPE_SECRET_KEY` = `sk_live_YOUR_KEY_HERE`
- `STRIPE_WEBHOOK_SECRET` = `whsec_YOUR_SECRET_HERE` (optional)
- `NODE_ENV` = `production`
- `PORT` = `10000` (Render uses port 10000)

#### 5. Deploy
Click "Create Web Service" - Render will automatically deploy!

#### 6. Get Your Backend URL

Render will give you a URL like:
```
https://nightkind-payment-server.onrender.com
```

#### 7. Update Frontend

Update `cart.html` line 1755:
```javascript
const SERVER_URL = 'https://nightkind-payment-server.onrender.com';
```

#### 8. Test It

Visit: `https://your-render-url.onrender.com/health`

---

## 🎯 Option 3: Deploy to Railway

### Why Railway?
- ✅ Free tier with $5 credit/month
- ✅ Simple deployment
- ✅ Great for Node.js
- ✅ Easy environment variable management

### Step-by-Step:

#### 1. Create Railway Account
Go to https://railway.app and sign up (free)

#### 2. Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your NightKind repository

#### 3. Configure Service
Railway will auto-detect it's a Node.js project. It will:
- Run `npm install` automatically
- Start with `npm start`

#### 4. Set Environment Variables
1. Click on your service
2. Go to "Variables" tab
3. Add:
   - `STRIPE_SECRET_KEY` = `sk_live_YOUR_KEY_HERE`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_YOUR_SECRET_HERE` (optional)
   - `PORT` = `3000` (Railway auto-assigns, but you can set it)

#### 5. Deploy
Railway will automatically deploy when you push to GitHub, or click "Deploy" button.

#### 6. Get Your Backend URL
1. Click on your service
2. Go to "Settings" → "Generate Domain"
3. Railway will give you a URL like:
```
https://nightkind-payment-server.up.railway.app
```

#### 7. Update Frontend

Update `cart.html` line 1755:
```javascript
const SERVER_URL = 'https://nightkind-payment-server.up.railway.app';
```

#### 8. Test It

Visit: `https://your-railway-url.up.railway.app/health`

---

## 🔧 Setting Up Custom Domain (Optional)

If you want to use `api.nightkind.org` instead of the platform's default URL:

### For Vercel:
1. Go to project Settings → Domains
2. Add `api.nightkind.org`
3. Add DNS CNAME record pointing to Vercel's domain
4. Update `SERVER_URL` in `cart.html` to `https://api.nightkind.org`

### For Render:
1. Go to service Settings → Custom Domains
2. Add `api.nightkind.org`
3. Add DNS CNAME record pointing to Render's domain
4. Update `SERVER_URL` in `cart.html`

### For Railway:
1. Go to service Settings → Networking
2. Add custom domain `api.nightkind.org`
3. Add DNS CNAME record pointing to Railway's domain
4. Update `SERVER_URL` in `cart.html`

---

## 🧪 Testing Your Deployment

### 1. Health Check
```bash
curl https://your-backend-url/health
```

Should return:
```json
{
  "status": "ok",
  "service": "NightKind Payment Server",
  "stripe": "connected"
}
```

### 2. Test Payment Intent Creation
Open browser console on your website and run:
```javascript
fetch('https://your-backend-url/api/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 10.00, currency: 'usd' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

Should return a `clientSecret` if working correctly.

### 3. Full Payment Flow Test
1. Go to `https://www.nightkind.org/cart.html`
2. Add items to cart
3. Fill checkout form
4. Use test card: `4242 4242 4242 4242`
5. Complete purchase
6. Check browser console for errors
7. Check Stripe Dashboard for payment

---

## 🔐 Setting Up Stripe Webhooks (Optional but Recommended)

### 1. Get Your Webhook URL
Your webhook endpoint will be:
```
https://your-backend-url/webhook
```

### 2. Configure in Stripe Dashboard
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the "Signing secret" (starts with `whsec_`)

### 3. Add to Environment Variables
Add `STRIPE_WEBHOOK_SECRET` to your hosting platform's environment variables.

---

## 🐛 Troubleshooting

### "404 Not Found" on /health
- Make sure the server is deployed and running
- Check that the URL is correct
- Verify environment variables are set

### "CORS error" in browser
- Your server already has `cors()` enabled, so this shouldn't happen
- If it does, check that your frontend domain is allowed

### "Payment failed" or "Cannot connect"
- Check server logs on your hosting platform
- Verify `STRIPE_SECRET_KEY` is set correctly
- Test health endpoint first
- Check browser console for specific errors

### Server won't start
- Check Node.js version (needs 14+)
- Verify all dependencies are in `package.json`
- Check environment variables are set
- Review server logs

---

## 📊 Comparison Table

| Feature | Vercel | Render | Railway |
|---------|--------|--------|---------|
| Free Tier | ✅ Yes | ✅ Yes | ✅ $5 credit/month |
| Auto HTTPS | ✅ Yes | ✅ Yes | ✅ Yes |
| GitHub Integration | ✅ Yes | ✅ Yes | ✅ Yes |
| Custom Domain | ✅ Free | ✅ Free | ✅ Free |
| Ease of Use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Best For | Quick setup | Simple config | Node.js focus |

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Health check returns `{"status":"ok"}`
- [ ] Environment variables set (STRIPE_SECRET_KEY)
- [ ] `SERVER_URL` updated in `cart.html`
- [ ] Payment flow tested with test card
- [ ] Stripe Dashboard shows test payments
- [ ] Webhooks configured (optional)
- [ ] Custom domain set up (optional)

---

## 🎉 You're Done!

Once deployed, your payment system will be fully functional on production!

**Next Steps:**
1. Test the full payment flow
2. Configure EmailJS (optional) - See `EMAIL_SETUP_GUIDE.md`
3. Monitor your first real payments

**Need Help?**
- Check server logs on your hosting platform
- Review `CURRENT_INTEGRATION_STATUS.md` for status
- See `DEPLOYMENT_GUIDE.md` for more details

---

**Good luck! 🦇**
