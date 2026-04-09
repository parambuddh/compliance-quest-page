# 🔑 Get Your Gmail App Password

## Step-by-Step Guide

### Step 1: Enable 2-Factor Authentication (if not already done)
1. Go to: https://myaccount.google.com/security
2. Find "2-Step Verification"
3. If it says "Not set up", click it and follow the steps
4. If it's already enabled, go to Step 2

### Step 2: Create App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select:
   - **App:** Mail
   - **Device:** Windows Computer (or your device type)
3. Click **Generate**
4. **Copy the 16-character password** (it will look like: `xxxx xxxx xxxx xxxx`)

### Step 3: Update PHP File
1. Open file: `php/send-email.php`
2. Find this line (around line 17-18):
   ```php
   $gmailAppPassword = 'frdw btry qnyv ntsn';
   ```
3. Replace with your actual password:
   ```php
   $gmailAppPassword = 'your-16-char-password';
   ```
4. Save the file

### Example:
If your app password is: `abcd efgh ijkl mnop`

Then update the line to:
```php
$gmailAppPassword = 'abcd efgh ijkl mnop';
```

---

## ✅ Verification

After updating the password:

1. Test with curl:
   ```bash
   curl -X POST http://localhost:3000/php/send-email.php \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test",
       "email": "test@example.com",
       "contactNumber": "1234567890",
       "company": "Test"
     }'
   ```

2. Should return:
   ```json
   {"success":true,"message":"✅ Email sent successfully to gajeramilan518@gmail.com"}
   ```

3. Check your Gmail inbox - you should see the email!

---

## 🆘 If It Still Doesn't Work

1. Check password is exactly 16 characters (with spaces)
2. Make sure 2FA is enabled on your Gmail
3. Try creating a new app password
4. Check that you're copying the entire password

---

## ⏸️ Waiting for You

I've configured everything. Now I need your Gmail app password to complete the setup.

**Once you provide it, email delivery will work perfectly!** 🎉
