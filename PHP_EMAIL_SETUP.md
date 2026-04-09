# PHP Email Setup Guide - BlueHost Compatible

## 📋 Overview

This guide explains how to set up email notifications using **PHP** instead of Node.js. This approach is compatible with **BlueHost** and other shared PHP hosting providers.

---

## ✅ Why PHP?

✅ **Works on BlueHost** - BlueHost supports PHP out of the box
✅ **No Node.js required** - Reduces hosting costs
✅ **Simple to set up** - Uses PHP's built-in `mail()` function
✅ **Universal compatibility** - Works on almost all hosting providers
✅ **Frontend-independent** - React app works exactly the same

---

## 🚀 How It Works

```
User fills form
    ↓
User clicks "Get It Now"
    ↓
React validates form
    ↓
React sends data to /php/send-email.php
    ↓
PHP processes the request
    ↓
PHP sends email using mail()
    ↓
PHP returns success/error response
    ↓
React redirects to Salesforce AppExchange
```

---

## 📁 File Structure

```
project-root/
├── php/
│   └── send-email.php          ← PHP email handler (handles email sending)
├── src/
│   ├── components/
│   │   └── GetNowModal.tsx      ← Updated form component
│   └── utils/
│       └── php-email-service.ts ← Service that calls PHP endpoint
└── .env (local development)
```

---

## 🔧 Setup Instructions

### Step 1: Check Local PHP Setup (Development)

```bash
# Check if PHP is installed locally
php -v

# Test if mail() function works
php -r "echo phpinfo();" | grep -i mail

# Or simply test with a simple PHP file
echo "<?php phpinfo(); ?>" > test.php
php test.php
```

### Step 2: Environment Variables (Optional)

Create `.env` file in project root:

```env
# PHP Endpoint (default is /php/send-email.php)
VITE_PHP_ENDPOINT=/php/send-email.php

# Or if using a subdomain/different path:
VITE_PHP_ENDPOINT=https://yourdomain.com/php/send-email.php
```

Then add to `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_PHP_ENDPOINT': JSON.stringify(process.env.VITE_PHP_ENDPOINT)
  }
})
```

### Step 3: Test Locally

1. **Start a local PHP server:**
   ```bash
   cd project-root
   php -S localhost:8000
   ```

2. **In another terminal, start Vite:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

3. **Test the form:**
   - Navigate to http://localhost:5173
   - Click "Get It Now"
   - Fill the form
   - Submit
   - Check console for success message

### Step 4: Deploy to BlueHost

1. **Upload files via FTP/SFTP:**
   - Upload entire `public` folder to `public_html/`
   - Upload `php` folder to same location
   - Ensure `php/send-email.php` is accessible at `yourdomain.com/php/send-email.php`

2. **Build the React app:**
   ```bash
   npm run build
   # or
   bun run build
   ```

3. **Upload built files:**
   - Upload `dist/` contents to `public_html/`
   - Ensure `php` folder is also in `public_html/`

4. **Update `.env` in production** (if needed):
   ```
   VITE_PHP_ENDPOINT=https://yourdomain.com/php/send-email.php
   ```

5. **Test:**
   - Visit https://yourdomain.com
   - Submit the form
   - Check email at gajeramilan518@gmail.com

---

## 📧 What Gets Sent

When someone submits the form, email is sent to `gajeramilan518@gmail.com` with:

```
Full Name:         John Doe
Email Address:     john@example.com
Contact Number:    +1 (555) 123-4567
Company:           Acme Corp
Submission Time:   April 9, 2026 at 2:45 PM
```

Email is beautifully formatted with HTML and includes reply-to header.

---

## 🔍 Troubleshooting

### Email Not Sending?

1. **Check PHP mail configuration:**
   ```bash
   php -r "echo ini_get('sendmail_path');"
   ```

2. **Check if sendmail is installed:**
   ```bash
   which sendmail
   ```

3. **Check PHP error logs:**
   - On BlueHost: cPanel → Files → Error Log
   - Or check `php_errorlog` file

4. **Test with simple PHP script:**
   ```php
   <?php
   $to = "gajeramilan518@gmail.com";
   $subject = "Test Email";
   $body = "This is a test email";
   $headers = "Content-Type: text/html\r\n";
   
   if (mail($to, $subject, $body, $headers)) {
       echo "Email sent successfully!";
   } else {
       echo "Email failed to send!";
   }
   ?>
   ```

### CORS Issues?

The PHP file includes CORS headers:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
```

If still having issues, check:
1. PHP headers are being sent correctly
2. Your domain is added to CORS whitelist
3. Browser console for specific error messages

### Wrong Recipient Email?

Change the recipient in `php/send-email.php`:

```php
// Line 41 - Change this
$recipientEmail = getenv('RECIPIENT_EMAIL') ?: 'gajeramilan518@gmail.com';

// To this
$recipientEmail = 'your-email@gmail.com';
```

---

## 🔐 Security Considerations

✅ **Input Sanitization:**
- All inputs are sanitized with `sanitize_input()`
- Email is validated with `filter_var()`

✅ **CORS Protection:**
- Headers are properly set
- Only POST requests allowed

✅ **Error Handling:**
- No sensitive information exposed
- Errors logged server-side

✅ **Best Practices:**
- Verify email format before sending
- Trim and escape all inputs
- Use htmlspecialchars() for HTML

---

## 📝 Configuration Options

### Change Sender Email

In `php/send-email.php`, line 90:
```php
'From: noreply@compliancevista.com',
```

### Change Recipient Email

In `php/send-email.php`, line 41:
```php
$recipientEmail = 'your-email@gmail.com';
```

### Customize Email Template

In `php/send-email.php`, function `generateEmailHTML()` - modify the HTML structure and styling.

---

## 📱 Testing Checklist

- [ ] Form validates correctly
- [ ] PHP endpoint is accessible
- [ ] Email is received at recipient address
- [ ] Email contains all form data
- [ ] Email is properly formatted
- [ ] User is redirected to Salesforce
- [ ] Works on mobile devices
- [ ] No console errors

---

## 🎯 BlueHost Specific Setup

1. **Access cPanel:**
   - Log in to BlueHost
   - Open cPanel

2. **Check PHP Version:**
   - Go to "PHP Configuration"
   - Ensure PHP 7.4+ is selected
   - Enable PHP mail extension

3. **File Manager:**
   - Navigate to `public_html`
   - Create `php` folder
   - Upload `send-email.php` there
   - Ensure permissions are 644 (readable)

4. **Test Email:**
   - Create test.php:
   ```php
   <?php mail("test@example.com", "Test", "Test email"); ?>
   ```
   - Execute via browser or SSH
   - Check if email arrives

---

## 📚 Files Modified

| File | Changes |
|------|---------|
| `src/components/GetNowModal.tsx` | Added PHP email service import and send logic |
| `src/utils/php-email-service.ts` | New PHP email service utility |
| `php/send-email.php` | New PHP backend for email handling |

---

## ✨ That's It!

Your email functionality is now ready for BlueHost deployment. When you host the website:

1. Build the React app: `npm run build`
2. Upload `dist/` to `public_html/`
3. Upload `php/` folder to `public_html/`
4. Test the form
5. Emails will be sent automatically!

---

**No Node.js. No Database. Just Pure PHP Email.**

