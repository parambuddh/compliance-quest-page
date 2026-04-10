# 🔧 Email Delivery Troubleshooting Guide

## ❌ Why Emails Aren't Arriving

When you submit the "Get in Touch" form but don't receive emails, here are the most common causes:

---

## 🔍 Quick Diagnosis

### **Step 1: Check Browser Console for Errors**
1. Open your website in a browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Fill the form and click Send
5. **Look for error messages** - they will show the issue

### **Step 2: Check Network Tab**
1. Open Developer Tools
2. Go to **Network** tab
3. Submit the form
4. Look for the request to `/api/contact.php`
5. Check the response (should be `200 OK` with `"status": "success"`)

---

## 🚨 Common Issues & Solutions

### **Issue 1: Gmail App Password is Incorrect**

**Symptoms:**
- Form submits but no email received
- Network response shows `500 error` with "Failed to send message"

**Solution:**
The Gmail app password in `api/contact.php` might be expired or incorrect.

**Fix:**
1. Go to https://myaccount.google.com/apppasswords
2. Generate a **new app-specific password** for Gmail
3. Copy the **16-character password** (spaces included)
4. Update `api/contact.php` line 63:
   ```php
   $smtpPass = 'jtwb crev jxzb vvoe'; // Replace with new password
   ```
5. Or set environment variable (recommended for production):
   ```
   SMTP_PASS=your-new-16-char-password
   ```

---

### **Issue 2: Gmail 2-Factor Authentication Not Enabled**

**Symptoms:**
- Email not sending at all
- SMTP connection fails

**Solution:**
App passwords only work if Gmail 2FA is enabled.

**Fix:**
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification**
3. Then go to https://myaccount.google.com/apppasswords
4. Generate new app password
5. Update `api/contact.php`

---

### **Issue 3: Email Going to Spam/Junk Folder**

**Symptoms:**
- Form shows "Success" message
- Email doesn't appear in Inbox
- But appears in Spam folder

**Solution:**
Check spam/junk folder first!

**Fix:**
1. Check `parambuddh26@gmail.com` spam folder
2. Check `gajeramilan518@gmail.com` spam folder
3. Mark email as "Not Spam"
4. Add sender to contacts

---

### **Issue 4: Wrong Email Recipients Configured**

**Current Recipients in `api/contact.php`:**
```php
$testRecipients = ['parambuddh26@gmail.com', 'gajeramilan518@gmail.com'];
```

**Symptoms:**
- You're checking wrong email inbox
- Emails going to someone else's inbox

**Solution:**
Update `api/contact.php` line 63 with YOUR email addresses:
```php
$testRecipients = ['your-email@gmail.com', 'your-other-email@gmail.com'];
```

---

### **Issue 5: PHPMailer Library Not Installed**

**Symptoms:**
- Network response shows "PHPMailer library is not loaded"

**Solution:**
Run on Vercel (which handles PHP dependencies) or check server PHP configuration.

---

## 🧪 Test Email Sending

### **Method 1: Via Website**
```
1. Go to your website contact form
2. Fill with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: 555-1234
   - Message: Test message
3. Click Send
4. Check inbox within 30 seconds
```

### **Method 2: Direct PHP Test**
Create a test file `test-email.php`:
```php
<?php
// Add this at the top of api/contact.php temporarily to test
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testing email system...\n";

// Test 1: Check if PHPMailer loads
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    echo "✓ PHPMailer autoloader found\n";
    require __DIR__ . '/../vendor/autoload.php';
} else {
    echo "✗ PHPMailer autoloader NOT found\n";
    exit;
}

// Test 2: Check credentials
$smtpUser = getenv('SMTP_USER') ?: 'zeon6080@gmail.com';
$smtpPass = getenv('SMTP_PASS') ?: 'jtwb crev jxzb vvoe';

echo "SMTP User: $smtpUser\n";
echo "SMTP Pass: " . (strlen($smtpPass) > 4 ? substr($smtpPass, 0, 4) . "***" : "EMPTY") . "\n";

// Test 3: Try sending test email
$mail = new PHPMailer\PHPMailer\PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = str_replace(' ', '', $smtpPass);
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    $mail->setFrom($smtpUser, 'Test');
    $mail->addAddress('parambuddh26@gmail.com');
    $mail->isHTML(true);
    $mail->Subject = 'Email Test';
    $mail->Body = 'This is a test email';
    
    $mail->send();
    echo "✓ Email sent successfully!\n";
} catch (Exception $e) {
    echo "✗ Email failed: {$mail->ErrorInfo}\n";
}
?>
```

---

## 📋 Email Checklist

- [ ] Gmail 2FA enabled
- [ ] App password generated (16 characters)
- [ ] App password copied correctly (no extra spaces)
- [ ] Recipient email addresses correct
- [ ] api/contact.php file exists
- [ ] vendor/autoload.php (PHPMailer) exists
- [ ] SMTP_USER environment variable set (or hardcoded)
- [ ] SMTP_PASS environment variable set (or hardcoded)
- [ ] Form validation passing (no red errors)
- [ ] Network response is 200 OK
- [ ] Check both inbox AND spam folder
- [ ] reCAPTCHA token not expired

---

## 🔐 Production Setup (Vercel)

If deployed on Vercel, set these environment variables:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   ```
   SMTP_USER = your-email@gmail.com
   SMTP_PASS = your-16-char-app-password
   ```
5. Redeploy your project

---

## 📞 Still Not Working?

1. **Check console errors** (F12 → Console tab)
2. **Verify SMTP credentials** are correct
3. **Check spam folder** in Gmail
4. **Verify recipient emails** in api/contact.php
5. **Test with simple message** (no special characters)
6. **Check Gmail security settings** allow app passwords

---

## 📧 Current Configuration

**File:** `api/contact.php`

**Current Recipients:**
- Primary: `parambuddh26@gmail.com`
- CC: `gajeramilan518@gmail.com`

**Current SMTP:**
- User: `zeon6080@gmail.com`
- Pass: `jtwb crev jxzb vvoe` (may be expired)

**Email Logo:**
- `https://compliance-quest-page.vercel.app/ComplianceVista-logo.svg`

---

**Need to update credentials? Ask for help updating the email configuration!**
