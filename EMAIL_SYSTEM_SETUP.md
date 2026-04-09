# Email System Setup & Configuration

## Current Setup

### Frontend (React/Vite)
- **Port:** 8080
- **URL:** http://localhost:8080
- **Status:** ✅ Running
- **Command:** `npm run dev` or `bun run dev`

### Backend (PHP)
- **Port:** 3000
- **URL:** http://localhost:3000
- **Status:** ✅ Running
- **Command:** `php -S localhost:3000` (from project root)

## Key Files

### React Components & Services
- **Form Component:** `src/components/GetNowModal.tsx`
  - Collects user input: Name, Email, Contact Number, Company
  - Validates form fields
  - Calls `sendLeadEmail()` from the email service
  
- **Email Service:** `src/utils/php-email-service.ts`
  - Handles frontend-backend communication
  - Development: Points to `http://localhost:3000/php/send-email.php`
  - Production: Uses relative path `/php/send-email.php`
  - Includes error handling and logging

### PHP Backend
- **Email Handler:** `php/send-email.php`
  - Accepts POST requests with JSON data
  - Validates and sanitizes all input
  - Sends emails using PHP's `mail()` function
  - Recipient: `gajeramilan518@gmail.com` (configurable via environment variable)
  - Includes CORS headers for cross-origin requests

## How It Works

1. **User fills the form** in the "Get Now Modal" on the website
2. **React validates the input** (name, email, contact number, company)
3. **React sends data** to PHP backend via POST request with JSON payload
4. **PHP validates and sanitizes** the data
5. **PHP sends email** to the recipient using `mail()` function
6. **PHP returns JSON response** indicating success or failure
7. **React redirects user** to Salesforce AppExchange (or shows error)

## Testing Locally

### Option 1: Manual cURL Test
```bash
curl -X POST http://localhost:3000/php/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "contactNumber": "1234567890",
    "company": "Test Company"
  }'
```

**Expected Response:**
```json
{"success": true, "message": "Email sent successfully"}
```

### Option 2: Use React Form
1. Go to http://localhost:8080
2. Click on any "Get Now" or "Get It Now" button
3. Fill in the form with test data
4. Submit the form
5. Check browser console (F12) for request logs
6. **Note:** Email won't be sent locally without mail server configuration, but the PHP logic will execute successfully

## Environment Variables

### Local Development
- No environment variables needed
- PHP uses hardcoded endpoint
- React automatically detects localhost and uses `http://localhost:3000/php/send-email.php`

### Production (BlueHost/Deployment)
- Set environment variable on server: `RECIPIENT_EMAIL=your-email@domain.com`
- React will automatically use `/php/send-email.php` relative path
- PHP will use environment variable for recipient email

## CORS Configuration

The PHP backend includes CORS headers:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
```

This allows the React frontend on port 8080 to communicate with the PHP backend on port 3000 during local development.

## Troubleshooting

### PHP Server Won't Start
```bash
# Check if port 3000 is already in use
lsof -i :3000

# If port is in use, kill the process
kill <PID>

# Then restart PHP
php -S localhost:3000
```

### React App Can't Reach PHP
- Verify PHP is running: `curl http://localhost:3000/php/send-email.php`
- Check browser console for CORS errors
- Verify port 3000 is open and accessible

### Email Not Sending
- On macOS, PHP's `mail()` function may not work without sendmail configured
- This is expected for local testing
- On BlueHost/production servers, mail will work automatically
- Check `/var/log/mail.log` on production servers for mail errors

### Form Submission Shows Error
- Open browser console (F12)
- Check the network tab to see the request/response
- Look for error messages in the console
- Verify all form fields are filled correctly

## Deployment to BlueHost

1. Upload entire project directory to your domain
2. Ensure PHP is enabled on your hosting account
3. Update environment variable or edit recipient email in `php/send-email.php`
4. No port forwarding needed on production - just use relative paths
5. React app will automatically use `/php/send-email.php` when deployed

## Important Notes

- ✅ Frontend and backend are properly separated
- ✅ CORS is configured for development
- ✅ Input validation and sanitization are in place
- ✅ Email uses HTML template for better formatting
- ✅ Compatible with BlueHost and standard PHP hosting
- ✅ Works locally without mail server for testing
- ⚠️ Actual email delivery requires mail server configuration (automatic on BlueHost)

## Next Steps

1. Test the form submission from React
2. Verify console logs show successful POST request
3. Deploy to BlueHost and test live email delivery
4. Monitor email delivery and adjust recipient as needed
