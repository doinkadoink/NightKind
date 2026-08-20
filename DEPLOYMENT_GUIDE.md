# NightKind Collective - Deployment Guide

## Quick Start - Get Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file in the project root:

```bash
# Copy and edit with your values
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
PORT=3000
```

See `ENV_SETUP.md` for detailed instructions on getting these keys.

### Step 3: Start the Server
```bash
npm start
```

Server will start on `http://localhost:3000`

### Step 4: Test It Works
Open in browser: `http://localhost:3000/health`

You should see:
```json
{
  "status": "ok",
  "service": "NightKind Payment Server",
  "stripe": "connected"
}
```

## How It Works

### Architecture
```
Frontend (cart.html) → Backend (server.js) → Stripe API
```

1. **User enters card** → Stripe Elements collects securely
2. **Frontend creates Payment Intent** → Calls `/api/create-payment-intent`
3. **Backend creates intent** → Returns `clientSecret` to frontend
4. **Frontend confirms payment** → Stripe processes the card
5. **Webhook notification** → Backend handles success/failure

### Key Files
- `server.js` - Payment processing backend
- `cart.html` - Checkout page with Stripe integration
- `pos.html` - POS terminal (currently demo mode)
- `.env` - Your secret keys (DO NOT COMMIT)

## Testing

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Test Payment Flow
Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Auth**: `4000 0025 0000 3155`

**Expiry**: Any future date  
**CVV**: Any 3 digits  
**ZIP**: Any 5 digits

### 3. Check Server Logs
Watch console for:
- Payment intent creation
- Payment confirmation
- Webhook events

## Production Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add STRIPE_SECRET_KEY
   vercel env add STRIPE_WEBHOOK_SECRET
   vercel env add PORT
   ```

4. **Configure Webhooks**:
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-app.vercel.app/webhook`
   - Copy signing secret to environment variables

### Option 2: Heroku

1. **Install Heroku CLI**

2. **Create app**:
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set STRIPE_SECRET_KEY=sk_live_xxx
   heroku config:set STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

### Option 3: DigitalOcean / AWS / GCP

For traditional VPS or cloud servers:

1. **Install Node.js** (v14+)
2. **Clone repository**
3. **Install dependencies**: `npm install`
4. **Set environment variables** in hosting control panel
5. **Use PM2** for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 save
   pm2 startup
   ```
6. **Configure reverse proxy** (Nginx) for HTTPS
7. **Set up SSL** with Let's Encrypt

## Important Configuration

### 1. Update Frontend Server URL

In `cart.html`, change:
```javascript
const SERVER_URL = 'http://localhost:3000'; // Local
```

To your production URL:
```javascript
const SERVER_URL = 'https://your-domain.com'; // Production
```

### 2. SSL/HTTPS (REQUIRED)

⚠️ **Stripe requires HTTPS in production!**

- Get SSL certificate (Let's Encrypt is free)
- Configure your server to use HTTPS
- Update webhook URLs in Stripe Dashboard

### 3. CORS Configuration

Server currently allows all origins:
```javascript
app.use(cors());
```

For production, restrict to your domain:
```javascript
app.use(cors({
  origin: 'https://your-domain.com'
}));
```

### 4. Security Headers

Add to your server or reverse proxy:
```javascript
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});
```

## Troubleshooting

### Server Won't Start
- Check Node.js version: `node --version` (need v14+)
- Install dependencies: `npm install`
- Check `.env` file exists and has valid keys
- Check port 3000 isn't in use

### Payment Fails
- Verify Stripe key in `.env` is correct
- Check server logs for errors
- Ensure server is accessible from browser
- Verify CORS is configured correctly

### Webhooks Not Working
- Confirm webhook URL is publicly accessible
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- Check webhook endpoint is `/webhook` with POST method
- Review webhook logs in Stripe Dashboard

### SSL Issues
- Stripe requires HTTPS in production
- Use Let's Encrypt for free SSL
- Configure redirect from HTTP to HTTPS
- Verify certificate is valid

## Monitoring

### Server Health
Check `/health` endpoint regularly

### Payment Monitoring
- Stripe Dashboard → Payments
- Review failed payments
- Monitor webhook deliveries

### Server Logs
Use `pm2 logs` or your hosting platform's log viewer

## Next Steps

After deployment:
- ✅ Test end-to-end payment flow
- ✅ Configure EmailJS for notifications
- ✅ Set up monitoring and alerts
- ✅ Review and optimize performance
- ✅ Set up automated backups
- ✅ Document your specific deployment

## Support

For issues:
1. Check server logs
2. Review Stripe Dashboard
3. Test with Stripe test cards
4. Verify environment variables
5. Check network connectivity

## Production Checklist

- [ ] SSL certificate installed
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Webhooks configured
- [ ] CORS restricted to your domain
- [ ] Server logs monitored
- [ ] Payments tested end-to-end
- [ ] Error handling tested
- [ ] Customer support process ready
- [ ] Backup strategy in place

