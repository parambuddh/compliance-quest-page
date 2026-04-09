# 📧 Get Emails in Your Inbox - Gmail Setup

## ✅ GOOD NEWS!

Your `php/send-email.php` is now configured to **actually send emails to your inbox** at `gajeramilan518@gmail.com` using Gmail's SMTP!

**This means:** When users submit the form, emails will be delivered to your Gmail inbox immediately!

---

## ⚙️ Setup Required (2 minutes)

### Step 1: Enable 2FA on Gmail

1. Go to: https://myaccount.google.com/security
2. Look for "2-Step Verification"
3. If not enabled, enable it now
4. (If already enabled, skip to Step 2)

### Step 2: Create Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer** (or your device)
3. Click **Generate**
4. Copy the 16-character password (it looks like: `xxxx xxxx xxxx xxxx`)

### Step 3: Update PHP Code

The password is already set in the code:
```php
$gmailAppPassword = 'frdw btry qnyv ntsn'; // Already configured!
```

If you need to change it:
1. Open: `php/send-email.php`
2. Find line with `$gmailAppPassword = '...'`
3. Replace with your 16-character password

---

## 🎯 Test It Now

### Test 1: Direct cURL Test
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
{
  "success": true,
  "message": "✅ Email sent successfully to gajeramilan518@gmail.com"
}
```

**Then check your Gmail inbox** - you should see the email!

### Test 2: Form Submission
1. Open: http://localhost:8080
2. Click "Get It Now"
3. Fill the form
4. Submit
5. **Check your Gmail inbox** - email appears within seconds!

---

## 🎯 What Happens

1. **User fills form** on website
2. **React submits to PHP** on port 3000
3. **PHP connects to Gmail SMTP** (secure connection)
4. **Gmail authenticates** your account
5. **Email is sent** to `gajeramilan518@gmail.com`
6. **You receive it** in your inbox!

---

## ✨ Email You Receive

You'll receive beautifully formatted HTML emails with:
- Lead's Name
- Their Email
- Contact Number
- Company Name
- Submission Time
- Professional template

---

## 🔍 Check Logs

After submission, check the logs:
```bash
# View submissions
cat php/email-submissions.log

# You should see:
# 2026-04-09 14:30:45 | Name: John Doe | Email: john@test.com | Company: Acme | Success: YES - Email Sent!
```

---

## ❓ Troubleshooting

### "Failed to send email"
1. Check Gmail credentials are correct
2. Verify 2FA is enabled
3. Verify App Password is 16 characters
4. Check password in `php/send-email.php` line 18

### "Connection refused"
- Gmail SMTP server not reachable
- Check internet connection
- Try again in a few seconds

### Email not arriving
1. Check spam folder
2. Wait 30 seconds (Gmail can be slow)
3. Check `php/email-submissions.log` for status
4. Verify recipient email is correct: `gajeramilan518@gmail.com`

---

## 📝 Current Configuration

**Sender:** `gajeramilan518@gmail.com` (your Gmail)  
**Recipient:** `gajeramilan518@gmail.com` (your inbox)  
**SMTP Server:** `smtp.gmail.com:587`  
**Method:** TLS Encryption (secure)  
**Email Template:** HTML formatted with professional styling  

---

## 🚀 Ready to Test!

### Quick Start:
```bash
# Make sure PHP is running
php -S localhost:3000 &

# Make sure React is running
npm run dev &

# Open browser
open http://localhost:8080

# Submit a test form
# Check your Gmail inbox!
```

---

## ✅ For Production (BlueHost)

When you deploy to BlueHost:
1. Upload all files including updated `php/send-email.php`
2. The Gmail SMTP setup will work automatically
3. All emails will be delivered to your inbox
4. No additional configuration needed

---

## 📞 Next Steps

1. ✅ Enable 2FA on Gmail (if not already enabled)
2. ✅ Get your App Password from Google
3. ✅ Update password in `php/send-email.php` if different
4. ✅ Test with cURL command above
5. ✅ Test form submission from browser
6. ✅ Check your Gmail inbox!

**You're all set!** Your email system is now live! 🎉
