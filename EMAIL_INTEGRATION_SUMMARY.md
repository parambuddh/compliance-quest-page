# 📧 Email Integration Summary - ComplianceVista Website

## Overview
Your website has a complete email system with both **frontend form** and **backend email delivery** integrated. Here's what's configured and where:

---

## 🎯 Email Flow

```
User Submits Form (ContactSection)
         ↓
React Validation + reCAPTCHA v3
         ↓
POST Request to `/api/contact.php`
         ↓
PHP Backend (PHPMailer)
         ↓
Sends 2 Emails:
  1. To Sales Team (Your inbox)
  2. To Prospect (Auto-responder)
```

---

## 📋 Frontend Configuration

### File: `src/components/ContactSection.tsx`

**Form Fields Collected:**
- `name` - User's full name
- `email` - User's email address (validated)
- `phone` - User's phone number
- `message` - User's message/inquiry
- `source_url` - Page URL where form was submitted from
- `recaptcha_token` - Google reCAPTCHA v3 token

**Validation:**
- ✅ Name: Required, no empty
- ✅ Email: Required, validated with regex pattern
- ✅ Phone: Required, must be numeric/phone format
- ✅ Message: Required, no empty
- ✅ reCAPTCHA: Automatic bot protection (v3)

**Submission Method:**
```javascript
POST /api/contact.php
Content-Type: application/json
```

**Form API URL:** 
- Default: `/api/contact.php`
- Can override: `VITE_CONTACT_API_URL` environment variable

**Contact Information Displayed:**
- **Address:** 2040 Martin Ave, Santa Clara, CA 95050
- **Phone:** 1.669.777.6838
- **General Email:** `info@surveyvista.com` (Display only)
- **Support Email:** `support@ardira.com` (For urgent support)

---

## 🔧 Backend Configuration

### File: `api/contact.php`

**SMTP Configuration:**
- **Provider:** Gmail SMTP
- **Host:** `smtp.gmail.com`
- **Port:** 587
- **Security:** STARTTLS
- **Authentication:** Username + App Password

**Current Credentials (in code):**
```
SMTP User: zeon6080@gmail.com
SMTP Pass: jtwb crev jxzb vvoe (Google App Password)
```

**Production Setup (via Environment Variables):**
```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📧 Email Templates

### Email 1: Sales Team Notification
**Sent To:** 
- Primary: `parambuddh26@gmail.com`
- CC: `gajeramilan518@gmail.com`

**Subject:** `New Inquiry from ComplianceVista website (Demo Mode)`

**Content Includes:**
- Inquiry header
- Sender's name, email, phone
- Full message text
- Source URL (where form was submitted)
- Company footer with address & phone

**Template Function:** `getSalesEmailHTML()`

---

### Email 2: Auto-Responder to Prospect
**Sent To:** Prospect's email (from form submission)

**Subject:** `Thank You for contacting ComplianceVista (Demo Mode)`

**Content Includes:**
- Thank you message
- Confirmation of received details
- Echo back of submitted name, email, phone, message
- Company footer

**Template Function:** `getProspectEmailHTML()`

---

## 🔐 Security Features

✅ **Input Sanitization:**
- `htmlspecialchars()` - Prevents HTML/script injection
- `strip_tags()` - Removes HTML tags
- `filter_var()` - Email validation

✅ **CORS Headers:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
```

✅ **reCAPTCHA v3 Integration:**
- Runs in frontend (useRecaptcha hook)
- Prevents automated form submissions
- Score-based (not challenge-based)

✅ **Error Handling:**
- Returns JSON with error messages
- HTTP status codes (400, 405, 500)
- Partial failure handling (if one email fails, reports which one)

---

## 🚀 Email Delivery Status

### Current Setup (Demo Mode)
- **Status:** Both test recipients configured
- **Recipients:**
  - Sales: `parambuddh26@gmail.com`
  - Support: `gajeramilan518@gmail.com`
- **Prospect Auto-responder:** ✅ Enabled

### Production Considerations
**TODO - Set these environment variables before going live:**

```bash
# On Vercel Dashboard or your hosting:
SMTP_USER=your-business-email@gmail.com
SMTP_PASS=your-google-app-password
```

**Get Google App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Generate app-specific password for Gmail
4. Use that 16-character password as `SMTP_PASS`

---

## 📬 Email Recipients

| Role | Email | Purpose |
|------|-------|---------|
| **Sales Team** | parambuddh26@gmail.com | Receive all form submissions |
| **CC** | gajeramilan518@gmail.com | CC'd on sales emails |
| **Support** | support@ardira.com | Display only (for customer support) |
| **General** | info@surveyvista.com | Display only (general inquiries) |
| **Prospect** | User's submitted email | Auto-responder |

---

## 🔍 How to Test

### 1. Test via Website
```
1. Navigate to "Contact" section
2. Fill in form with test data
3. Click "Send"
4. Check parambuddh26@gmail.com inbox
5. Verify both sales email and auto-responder received
```

### 2. Test via Terminal
```bash
curl -X POST http://localhost:5173/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-1234",
    "message": "This is a test",
    "recaptcha_token": "dummy-token"
  }'
```

### 3. Local Debug with test-email-system.sh
```bash
chmod +x test-email-system.sh
./test-email-system.sh
```

---

## 📝 Email Content Reference

### Email Logo/Branding
- **Logo URL:** `https://surveyvista.com/wp-content/uploads/2024/09/logo.png`
- **Company Name:** ComplianceVista
- **Address:** 2040 Martin Ave Santa Clara, CA 95050 United States
- **Phone:** 1.669.777.6838

### Email Styling
- **Width:** 650px (standard email width)
- **Font:** Arial
- **Colors:** Light blue header (#f4f9fb), borders (#e2e2e2)
- **Format:** HTML table-based (for max compatibility)

---

## 🐛 Troubleshooting

### Issue: Emails not sending
**Check:**
1. SMTP credentials correct in `api/contact.php` or env vars
2. Gmail 2FA enabled + app password used (not regular password)
3. "Less secure app access" disabled (use app password instead)
4. PHPMailer library loaded (`vendor/autoload.php`)

### Issue: Emails sent but not received
**Check:**
1. Check spam/junk folder
2. Verify "From" email matches SMTP_USER
3. Check email header "Reply-To" is set correctly
4. Verify DNS records (SPF, DKIM) if on production

### Issue: reCAPTCHA failing
**Check:**
1. Site key configured in `.env`
2. Secret key configured in `.env`
3. Domain registered in Google reCAPTCHA console
4. reCAPTCHA hook properly loaded (`useRecaptcha`)

---

## 📊 Files Involved

| File | Purpose |
|------|---------|
| `src/components/ContactSection.tsx` | Frontend form UI & logic |
| `src/hooks/useRecaptcha.ts` | reCAPTCHA integration |
| `api/contact.php` | Backend email handler |
| `vendor/autoload.php` | PHPMailer library |
| `.env` | Environment variables |

---

## 🎯 Next Steps

### If you want to change email recipients:
1. Update `api/contact.php` line with `$testRecipients`
2. Or set environment variables:
   ```
   SALES_EMAIL=new-email@company.com
   SUPPORT_EMAIL=support@company.com
   ```

### If you want to change email branding:
1. Update `$logoUrl` in `api/contact.php`
2. Update company address/phone in both email templates
3. Modify HTML templates: `getSalesEmailHTML()` and `getProspectEmailHTML()`

### For production launch:
1. Update `SMTP_USER` and `SMTP_PASS` environment variables
2. Change "(Demo Mode)" to actual subject lines (remove demo text)
3. Update test recipients to business email addresses
4. Test end-to-end before going live

---

## ✅ Email Integration Checklist

- [x] Frontend form collects all required data
- [x] Input validation implemented
- [x] reCAPTCHA v3 protection enabled
- [x] Backend API created (contact.php)
- [x] PHPMailer library configured
- [x] SMTP Gmail connection set up
- [x] Sales team email template designed
- [x] Auto-responder template designed
- [x] CORS headers configured
- [x] Error handling implemented
- [ ] Production SMTP credentials set (TODO)
- [ ] Live email testing completed (TODO)
- [ ] Monitor deliverability (TODO)

---

**Last Updated:** April 10, 2026
**Status:** ✅ Development/Testing Mode (Ready for Production after config)
