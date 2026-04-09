# 📧 Configure Mail Server on macOS & Verify Email Delivery

## Option 1: Use Mailhog (Easiest - Recommended for Local Testing)

Mailhog is a dummy SMTP server that catches all emails locally without actually sending them.

### Step 1: Install Mailhog
```bash
# Using Homebrew
brew install mailhog

# Start Mailhog
mailhog
```

**Output you'll see:**
```
MailHog version v1.0.1
...
Listening on 0.0.0.0:1025
...
Web interface is listening at http://localhost:8025
```

### Step 2: Configure PHP to Use Mailhog

Edit your php.ini file to use Mailhog's SMTP:

```bash
# Find your php.ini location
php -i | grep "Loaded Configuration File"

# Or check common locations
cat /etc/php.ini
cat /usr/local/etc/php/8.x/php.ini
```

Add or modify these lines in php.ini:
```ini
[mail function]
SMTP = localhost
smtp_port = 1025
sendmail_path = "/usr/sbin/sendmail -t -i"
```

### Step 3: Verify Mailhog is Capturing Emails

1. Start Mailhog: `mailhog`
2. Open web interface: http://localhost:8025
3. Submit form on http://localhost:8080
4. **Check Mailhog dashboard** - you should see the email captured!

---

## Option 2: Configure Real sendmail (Advanced)

If you want to configure actual mail delivery on macOS:

### Step 1: Check if Postfix is Available
```bash
# Check postfix status
postfix status

# Or start postfix
sudo postfix start

# Check mail logs
tail -f /var/log/mail.log
```

### Step 2: Configure PHP.ini for Postfix
```bash
# Edit php.ini
sudo nano /usr/local/etc/php/8.x/php.ini

# Set:
sendmail_path = "/usr/sbin/sendmail -t -i"
```

### Step 3: Verify Mail Queue
```bash
# Check mail queue
mailq

# Check mail logs
log stream --predicate 'eventMessage contains[cd] "mail"' --level debug
```

---

## Option 3: Use External SMTP Service (Gmail, SendGrid, etc.)

### Using Gmail SMTP:

Create a `.env.local` file in project root:
```env
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your-email@gmail.com
VITE_SMTP_PASS=your-app-password
VITE_FROM_EMAIL=your-email@gmail.com
```

Then create `php/config-mail.php`:
```php
<?php
// Load environment variables
$dotenv = parse_ini_file(__DIR__ . '/../.env.local');

return [
    'smtp_host' => $dotenv['VITE_SMTP_HOST'] ?? 'localhost',
    'smtp_port' => $dotenv['VITE_SMTP_PORT'] ?? 25,
    'smtp_user' => $dotenv['VITE_SMTP_USER'] ?? '',
    'smtp_pass' => $dotenv['VITE_SMTP_PASS'] ?? '',
    'from_email' => $dotenv['VITE_FROM_EMAIL'] ?? 'noreply@compliancevista.com',
];
?>
```

---

## ✅ How to Check If Email Server is Working

### Method 1: Check Mailhog Dashboard (Easiest)
```bash
# 1. Start Mailhog
mailhog

# 2. Open dashboard
open http://localhost:8025

# 3. Submit form on http://localhost:8080
# 4. Email appears instantly in Mailhog!
```

### Method 2: Monitor PHP Mail Logs
```bash
# Watch mail logs in real-time
log stream --predicate 'eventMessage contains[cd] "mail"' --level debug

# Or check older logs
cat /var/log/mail.log | grep "compliance\|lead"
```

### Method 3: Check Submission Log File
```bash
# View all form submissions (works immediately!)
./check-submissions.sh

# Or watch it live
tail -f php/email-submissions.log
```

### Method 4: Test Directly with cURL
```bash
# Test PHP email endpoint
curl -X POST http://localhost:3000/php/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "contactNumber": "1234567890",
    "company": "Test Company"
  }'

# You should get:
# {"success":true,"message":"Email sent successfully"}
```

---

## 🚀 Quick Start - No Testing Required

### If you just want to SET UP mail server without testing:

#### For Local Development (Use Mailhog):
```bash
# 1. Install Mailhog
brew install mailhog

# 2. Create startup script
cat > start-dev.sh << 'EOF'
#!/bin/bash
# Start all services

# Start Mailhog
mailhog &
MAILHOG_PID=$!

# Start PHP
php -S localhost:3000 &
PHP_PID=$!

# Start React
npm run dev &
REACT_PID=$!

echo "All services started!"
echo "React: http://localhost:8080"
echo "PHP: http://localhost:3000"
echo "Mailhog: http://localhost:8025"

# Keep running
wait

# Cleanup on exit
kill $MAILHOG_PID $PHP_PID $REACT_PID 2>/dev/null
EOF

chmod +x start-dev.sh

# 3. Run all services at once
./start-dev.sh
```

#### For Production (BlueHost - Automatic):
- ✅ BlueHost has mail server pre-configured
- ✅ Just upload your files
- ✅ PHP will automatically send emails
- ✅ No configuration needed!

---

## 📋 Verification Checklist

### Before Deployment:
- [ ] Mail server running (`mailhog` or `postfix`)
- [ ] PHP configured to use mail server
- [ ] Form submits successfully
- [ ] Check submission log: `./check-submissions.sh`

### After Deployment to BlueHost:
- [ ] Upload all files to server
- [ ] Test form submission
- [ ] Check email received in inbox
- [ ] Verify sender and content

---

## 🔍 Troubleshooting Mail Server

| Issue | Solution |
|-------|----------|
| "Mail() returned false" | Mail server not configured or not running |
| Emails not appearing | Check PHP sendmail_path setting |
| SMTP timeout | Verify mail server is running on correct port |
| Gmail not working | Enable "Less secure app access" or use App Password |
| Mailhog not capturing | Verify Mailhog listening on localhost:1025 |

---

## One-Liner Setup Commands

```bash
# Quick setup with Mailhog
brew install mailhog && mailhog &

# Verify all services
./test-email-system.sh

# Check emails captured
open http://localhost:8025

# View form submissions
./check-submissions.sh
```

**That's it! Your mail server is configured.** 🎉
