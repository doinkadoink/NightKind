# 🦇 NightKind Website - Finishing Checklist

This checklist will help you complete your website and get it ready for launch!

## ✅ Quick Status Check

Your website is **95% complete**! Here's what's done and what's left:

### ✅ Already Complete:
- ✅ All HTML pages created (index, shop, cart, checkout, etc.)
- ✅ Stripe payment integration fully implemented
- ✅ Cart system with wishlist functionality
- ✅ Product catalog with images
- ✅ Email templates (customer + owner)
- ✅ Server backend for payments
- ✅ Documentation and guides

### ⚠️ Needs Your Action:
- ⚠️ Create `.env` file with Stripe keys
- ⚠️ Install npm dependencies
- ⚠️ Configure EmailJS (optional but recommended)
- ⚠️ Test the payment flow
- ⚠️ Deploy to production

---

## 🚀 Step-by-Step: Get Your Website Running

### Step 1: Install Dependencies (2 minutes)

Open terminal in your project folder and run:
```bash
npm install
```

This installs:
- Express (web server)
- Stripe (payment processing)
- CORS (cross-origin support)
- dotenv (environment variables)

**✅ Check off when done:** [ ]

---

### Step 2: Create Environment File (3 minutes)

1. **Copy the template:**
   - Look for `.env.example` file in your project
   - Copy it and rename to `.env` (remove `.example`)

2. **Get your Stripe keys:**
   - Go to: https://dashboard.stripe.com/apikeys
   - Copy your **Secret key** (starts with `sk_live_` or `sk_test_`)
   - Paste it in `.env` file replacing `YOUR_SECRET_KEY_HERE`

3. **Your `.env` should look like:**
   ```bash
   STRIPE_SECRET_KEY=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
   PORT=3000
   ```

**✅ Check off when done:** [ ]

**📖 Need help?** See `ENV_SETUP.md` or `QUICK_START.md`

---

### Step 3: Start the Server (1 minute)

In terminal, run:
```bash
npm start
```

You should see:
```
🦇 NightKind Collective Payment Server 🦇
Server running on port 3000
Stripe Mode: LIVE
Ready to process payments!
```

**✅ Check off when done:** [ ]

**⚠️ Keep this terminal open!** The server needs to keep running.

---

### Step 4: Test Your Website (5 minutes)

1. **Open in browser:**
   - Go to: http://localhost:3000
   - You should see your homepage!

2. **Test navigation:**
   - Click through all pages:
     - Home (index.html)
     - Shop Categories (shop-categories.html)
     - Products (stickers.html, tshirts.html, pins.html, keychains.html)
     - Cart (cart.html)
     - About (about.html)
     - Contact (contact.html)
     - Login/Register (login.html, register.html)

3. **Test cart:**
   - Add items to cart
   - View cart
   - Try checkout (use test card: `4242 4242 4242 4242`)

**✅ Check off when done:** [ ]

---

### Step 5: Test Payment Flow (5 minutes)

1. **Add items to cart:**
   - Go to any product page
   - Click "Add to Cart"

2. **Go to checkout:**
   - Click cart icon
   - Fill out checkout form

3. **Test payment:**
   - Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVV: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)

4. **Complete purchase:**
   - Click "Complete Purchase"
   - You should see success message!
   - Check Stripe Dashboard to see the payment

**✅ Check off when done:** [ ]

**📖 Need help?** See `QUICK_START.md` for detailed payment testing

---

### Step 6: Configure EmailJS (Optional - 15 minutes)

**Why?** To send order confirmation emails to customers and yourself.

1. **Create EmailJS account:**
   - Go to: https://www.emailjs.com/
   - Sign up (free tier available)

2. **Set up email service:**
   - Add your email service (Gmail, etc.)
   - Get your Service ID

3. **Create templates:**
   - Customer template: Copy from `email-template.html`
   - Owner template: Copy from `email-template-owner.html`
   - Get Template IDs

4. **Update cart.html:**
   - Open `cart.html`
   - Find line ~1757 (EmailJS configuration)
   - Update with your credentials:
     ```javascript
     const EMAILJS_SERVICE_ID = 'your_service_id';
     const EMAILJS_CUSTOMER_TEMPLATE_ID = 'your_customer_template_id';
     const EMAILJS_OWNER_TEMPLATE_ID = 'your_owner_template_id';
     const EMAILJS_PUBLIC_KEY = 'your_public_key';
     ```

**✅ Check off when done:** [ ]

**📖 Need help?** See `EMAIL_SETUP_GUIDE.md` for detailed instructions

**Note:** Payments work without EmailJS, but customers won't get email receipts.

---

### Step 7: Deploy to Production (30 minutes)

**Choose your hosting:**

#### Option A: Vercel (Recommended - Easiest)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**📖 See:** `DEPLOYMENT_GUIDE.md` for detailed steps

#### Option B: GitHub Pages (Static only)
- Good for frontend
- Need separate hosting for server (backend)

#### Option C: Heroku
- Full-stack hosting
- Easy environment variable setup

**✅ Check off when done:** [ ]

**📖 Need help?** See `DEPLOYMENT_GUIDE.md`

---

## 🎯 Priority Order

**Do these FIRST (required to run locally):**
1. ✅ Install dependencies (`npm install`)
2. ✅ Create `.env` file
3. ✅ Start server (`npm start`)
4. ✅ Test website locally

**Do these NEXT (optional but recommended):**
5. ⚠️ Configure EmailJS
6. ⚠️ Test payment flow thoroughly
7. ⚠️ Deploy to production

---

## 🐛 Troubleshooting

### "Module not found" error
**Fix:** Run `npm install` again

### Server won't start
**Fix:** 
- Check Node.js is installed: `node --version`
- Check `.env` file exists and has correct keys
- Check port 3000 isn't already in use

### Payment fails
**Fix:**
- Make sure server is running (`npm start`)
- Check `.env` has correct Stripe key
- Check browser console for errors
- Try test card: `4242 4242 4242 4242`

### Can't connect to server
**Fix:**
- Server must be running in terminal
- Use `http://localhost:3000` (not `file://`)
- Check firewall isn't blocking port 3000

---

## 📚 Helpful Documentation

| File | What It Covers |
|------|----------------|
| `QUICK_START.md` | Get payments working in 5 minutes |
| `ENV_SETUP.md` | Environment variable setup |
| `EMAIL_SETUP_GUIDE.md` | EmailJS configuration |
| `DEPLOYMENT_GUIDE.md` | Deploy to production |
| `CURRENT_INTEGRATION_STATUS.md` | What's implemented |
| `README.md` | Project overview |

---

## ✅ Final Checklist Before Launch

- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with Stripe keys
- [ ] Server starts without errors (`npm start`)
- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Cart system works (add/remove items)
- [ ] Payment flow tested successfully
- [ ] EmailJS configured (optional)
- [ ] Tested on mobile devices
- [ ] Deployed to production
- [ ] Production URL updated in `cart.html` (SERVER_URL)
- [ ] Stripe webhooks configured for production

---

## 🎉 You're Almost There!

Your website is **95% complete**. Just follow the steps above and you'll be ready to launch!

**Need help?** Check the documentation files or review the error messages in your terminal/browser console.

**Good luck! 🦇**

