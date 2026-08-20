# Environment Variables Setup

## Quick Start

1. Create a `.env` file in the project root
2. Add the following variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Server Configuration
PORT=3000
```

3. **DO NOT** commit `.env` to git (already in .gitignore)

## Getting Your Stripe Keys

### Secret Key:
1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Secret key** (starts with `sk_live_`)
3. Replace `YOUR_SECRET_KEY_HERE` with it

### Webhook Secret:
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Set endpoint URL to: `https://yourdomain.com/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Replace `YOUR_WEBHOOK_SECRET_HERE` with it

## Security Notes

⚠️ **NEVER** commit your `.env` file
⚠️ **NEVER** share your secret keys publicly
✅ Use environment variables in production
✅ Keep keys secure and rotate periodically

