# NightKind Collective - Email Notification Setup Guide

## 📧 Overview

This guide explains how to set up email notifications for order confirmations in your NightKind Collective payment system. The implementation uses EmailJS, a service that allows you to send emails directly from client-side JavaScript without needing a backend server.

## 🚀 Dual Email System

**Two emails are sent after every successful order:**

1. **Customer Confirmation** → Sent to customer with receipt
2. **Owner Notification** → Sent to NightKind email for processing

This ensures both parties receive order details immediately!

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_nightkind`)

### 3. Create Email Templates (TWO REQUIRED)

#### Template 1: Customer Confirmation
1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Name it: "Order Confirmation - Customer"
4. Use the template in `email-template.html` as a reference
5. Set up with all variables (see below)
6. Note down Template ID: `template_order_confirmation`

#### Template 2: Owner Notification
1. In **Email Templates**, click **Create New Template** again
2. Name it: "Order Notification - Owner"
3. Use the template in `email-template-owner.html` as a reference
4. Set up with all variables (see below)
5. Note down Template ID: `template_order_notification`

#### Required Variables for Both Templates:
- `{{to_email}}` - Recipient email (customer or owner)
- `{{to_name}}` - Recipient name
- `{{transaction_number}}` - Order number
- `{{order_date}}` - Order date
- `{{order_time}}` - Order time
- `{{customer_name}}` - Customer name
- `{{customer_email}}` - Customer email
- `{{customer_phone}}` - Customer phone
- `{{customer_address}}` - Customer address
- `{{items_list}}` - List of ordered items
- `{{subtotal}}` - Order subtotal
- `{{tax}}` - Tax amount
- `{{total}}` - Total amount
- `{{payment_method}}` - Payment method
- `{{order_notes}}` - Order notes
- `{{company_name}}` - Company name
- `{{company_email}}` - Company email
- `{{website_url}}` - Website URL

#### Additional Owner Template Variables:
- `{{email_subject}}` - Custom subject line
- `{{order_alert}}` - Alert message for owner

### 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (starts with `user_`)
3. Copy this key

### 5. Update Configuration

In your `cart.html` file, update these constants with your actual EmailJS credentials:

```javascript
// EmailJS configuration (replace with your actual credentials)
const EMAILJS_SERVICE_ID = 'service_nightkind'; // Your service ID
const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_order_confirmation'; // Customer email template
const EMAILJS_OWNER_TEMPLATE_ID = 'template_order_notification'; // Owner email template
const EMAILJS_PUBLIC_KEY = 'your_emailjs_public_key'; // Your public key
const NIGHTKIND_EMAIL = 'nightkindcollective@gmail.com'; // Your business email
```

**Important:** You need both template IDs for the dual email system!

## 📋 Email Template Variables

The email template uses these variables that are automatically populated:

### Customer Information
- `{{to_name}}` - Customer's name
- `{{to_email}}` - Customer's email address
- `{{customer_name}}` - Customer's name
- `{{customer_email}}` - Customer's email address
- `{{customer_phone}}` - Customer's phone number
- `{{customer_address}}` - Customer's address

### Order Information
- `{{transaction_number}}` - Unique order number
- `{{order_date}}` - Order date (formatted)
- `{{order_time}}` - Order time (formatted)
- `{{items_list}}` - Formatted list of ordered items
- `{{subtotal}}` - Order subtotal
- `{{tax}}` - Tax amount
- `{{total}}` - Total order amount
- `{{payment_method}}` - Payment method used
- `{{order_notes}}` - Special order notes

### Company Information
- `{{company_name}}` - Your company name
- `{{company_email}}` - Your company email
- `{{website_url}}` - Your website URL
- `{{conservation_message}}` - Conservation impact message

## 🎨 Customizing the Email Template

### Visual Styling
The email template uses a gothic/alternative theme that matches your NightKind Collective brand:

- **Colors**: Dark background (#0a0a0a) with gold accents (#d4af37)
- **Font**: Courier Prime monospace font
- **Style**: Gothic/alternative aesthetic
- **Layout**: Clean, professional design

### Content Customization
You can customize the email content by modifying:

1. **Company Information**: Update company name, email, and website URL
2. **Conservation Message**: Modify the conservation impact message
3. **Shipping Information**: Update processing and shipping times
4. **Footer**: Customize contact information and branding

### Template Structure
The email template includes these sections:

1. **Header**: Company logo and tagline
2. **Greeting**: Personalized customer greeting
3. **Order Information**: Order details and customer info
4. **Items Ordered**: List of purchased items
5. **Order Summary**: Totals and payment method
6. **Order Notes**: Special instructions (if any)
7. **Conservation Message**: Impact statement
8. **Next Steps**: Processing and shipping information
9. **Footer**: Contact information and branding

## 🔧 Technical Implementation

### Email Sending Function
The `sendOrderConfirmationEmail()` function:

1. **Validates** email service availability
2. **Prepares** template parameters
3. **Sends** email using EmailJS
4. **Handles** errors gracefully
5. **Returns** success/failure status

### Integration Points
Email sending is integrated into the payment flow:

1. **After** payment processing
2. **Before** showing success message
3. **Alongside** receipt generation
4. **With** error handling

### Error Handling
The system handles email failures gracefully:

- **Logs** errors to console
- **Shows** warning notification to user
- **Continues** with order completion
- **Doesn't** block the payment process

## 🧪 Testing the Email System

### Test Order Process
1. Add items to cart
2. Proceed to checkout
3. Fill in customer information
4. Complete payment
5. Check for TWO email confirmations:
   - Customer email in their inbox
   - Owner email in NightKind inbox

### Debugging
If emails aren't sending:

1. **Check Console**: Look for EmailJS errors
2. **Verify Credentials**: Ensure all IDs and keys are correct
3. **Test Template**: Verify template variables are correct
4. **Check Service**: Ensure email service is properly configured
5. **Review Logs**: Check EmailJS dashboard for delivery status

### Common Issues
- **Invalid Credentials**: Double-check service ID, template ID, and public key
- **Template Errors**: Ensure all required variables are present
- **Service Issues**: Verify email service is active and configured
- **Rate Limits**: Free EmailJS accounts have sending limits

## 📊 EmailJS Account Limits

### Free Account
- **200 emails/month**
- **2 email services**
- **2 email templates**
- **Basic support**

### Paid Plans
- **Higher email limits**
- **More services and templates**
- **Advanced features**
- **Priority support**

## 🔒 Security Considerations

### EmailJS Security
- **Public Key**: Safe to expose in client-side code
- **Service ID**: Safe to expose in client-side code
- **Template ID**: Safe to expose in client-side code
- **No Sensitive Data**: Never send sensitive payment data via email

### Best Practices
- **Validate** email addresses before sending
- **Sanitize** user input in templates
- **Monitor** email delivery rates
- **Handle** failures gracefully

## 📈 Monitoring and Analytics

### EmailJS Dashboard
Monitor email performance through:

- **Delivery Statistics**: Success/failure rates
- **Template Usage**: Which templates are used most
- **Service Performance**: Email service status
- **Error Logs**: Failed email attempts

### Custom Analytics
Track email effectiveness:

- **Open Rates**: How many customers open emails
- **Click Rates**: How many customers click links
- **Response Rates**: Customer inquiries after emails
- **Order Completion**: Orders completed after email receipt

## 🚀 Going Live

### Pre-Launch Checklist
- [ ] EmailJS account set up and verified
- [ ] Email service configured and tested
- [ ] Email template created and tested
- [ ] Credentials updated in code
- [ ] Test orders sent successfully
- [ ] Error handling tested
- [ ] Monitoring set up

### Launch Steps
1. **Deploy** updated code to production
2. **Test** with real orders
3. **Monitor** email delivery
4. **Verify** customer receipt
5. **Adjust** as needed

## 📞 Support and Resources

### EmailJS Resources
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)
- [Template Examples](https://www.emailjs.com/docs/examples/)

### NightKind Collective
- **Email**: nightkindcollective@gmail.com
- **Website**: Your website URL
- **Support**: Contact form or support email

## 🔄 Future Enhancements

### Planned Features
- **Order Status Updates**: Shipping and delivery notifications
- **Abandoned Cart Emails**: Remind customers of incomplete orders
- **Newsletter Integration**: Subscribe customers to updates
- **Multi-language Support**: Emails in different languages
- **Advanced Templates**: Dynamic content based on order type

### Integration Opportunities
- **CRM Integration**: Sync customer data
- **Analytics Integration**: Track email performance
- **Social Media**: Share conservation impact
- **Loyalty Program**: Reward repeat customers

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Ready for Implementation
