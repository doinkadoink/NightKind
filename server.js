// NightKind Collective - Stripe Payment Server
// Handles secure payment processing for POS and checkout systems

// Load environment variables
require('dotenv').config();

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Serve static files
app.use(express.static(path.join(__dirname)));

// Enable request body parsing for Stripe webhooks
app.use('/webhook', express.raw({ type: 'application/json' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'NightKind Payment Server',
    stripe: 'connected',
    timestamp: new Date().toISOString()
  });
});

// Create Payment Intent - for cart.html checkout
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', customerEmail, metadata = {} } = req.body;
    
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: customerEmail,
      metadata: {
        service: 'NightKind Collective',
        timestamp: new Date().toISOString(),
        ...metadata
      }
    });
    
    console.log(`Payment Intent created: ${paymentIntent.id}`);
    
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
    
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Confirm Payment - verify payment completion
app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Payment Intent ID required' });
    }
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      console.log(`Payment succeeded: ${paymentIntentId}`);
      res.json({ 
        success: true, 
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        }
      });
    } else {
      console.log(`Payment not completed: ${paymentIntentId}, status: ${paymentIntent.status}`);
      res.status(400).json({ error: 'Payment not completed', status: paymentIntent.status });
    }
    
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe Webhook - handle asynchronous events
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.warn('Warning: STRIPE_WEBHOOK_SECRET not configured. Webhook verification disabled.');
    return res.status(400).json({ error: 'Webhook secret not configured' });
  }
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log(`Webhook received: ${event.type}`);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }
  
  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded via webhook:', paymentIntent.id);
      // Handle successful payment (update inventory, send confirmation, etc.)
      await handleSuccessfulPayment(paymentIntent);
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed via webhook:', failedPayment.id);
      // Handle failed payment (notify customer, log error, etc.)
      await handleFailedPayment(failedPayment);
      break;
      
    case 'payment_intent.requires_action':
      console.log('Payment requires additional action');
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  res.json({ received: true });
});

// Helper function to handle successful payments
async function handleSuccessfulPayment(paymentIntent) {
  try {
    console.log('Processing successful payment:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      customer: paymentIntent.receipt_email
    });
    
    // Add your business logic here:
    // - Update inventory
    // - Send order confirmation
    // - Log transaction
    // - Notify fulfillment team
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

// Helper function to handle failed payments
async function handleFailedPayment(paymentIntent) {
  try {
    console.log('Processing failed payment:', {
      id: paymentIntent.id,
      last_payment_error: paymentIntent.last_payment_error
    });
    
    // Add your business logic here:
    // - Notify customer of failure
    // - Log error details
    // - Attempt retry if appropriate
    
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log('\n🦇 NightKind Collective Payment Server 🦇');
  console.log(`Server running on port ${PORT}`);
  console.log(`Stripe Mode: ${process.env.STRIPE_SECRET_KEY ? 'LIVE' : 'TEST'}`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
  console.log('\nReady to process payments!\n');
});

// Handle server errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

module.exports = app;

