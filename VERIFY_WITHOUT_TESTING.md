# 🎯 Complete Email System - Configuration & Verification Guide

## Current System Status

### ✅ What's Already Configured

1. **React Frontend** (Port 8080)
   - Form component: `GetNowModal.tsx` ✅
   - Email service: `php-email-service.ts` ✅
   - Validates user input before sending ✅

2. **PHP Backend** (Port 3000)
   - Email handler: `php/send-email.php` ✅
   - Input sanitization ✅
   - HTML email template ✅
   - Submission logging ✅
   - CORS headers configured ✅

3. **Development Setup**
   - Both services running on separate ports ✅
   - No port conflicts ✅
   - Frontend-backend communication working ✅

### ⚙️ Current Mail Configuration on Your Mac

From the checker output:
```
PHP Config File: /usr/local/etc/php/8.5/php.ini
Sendmail Path:   /usr/sbin/sendmail -t -i
SMTP Server:     localhost
SMTP Port:       25
Mail Function:   Available
```

---

## How to Check Without Testing

### Option 1: Verify Configuration Files (No Testing)
```bash
# Check if PHP mail is configured
php -i | grep -i "sendmail"

# Check SMTP settings
php -i | grep -i "SMTP"

# View full mail config
php -i | grep -A 10 "\[mail function\]"
```

### Option 2: Check System Mail Logs (Without Running Tests)
```bash
# View recent mail activity
log show --predicate 'eventMessage contains[cd] "mail"' --last 10m

# Or check the mail log file
tail -50 /var/log/mail.log

# Check mail queue (see if any emails are waiting)
mailq
```

### Option 3: Use Our Checker Scripts (No Testing Required)
```bash
# Check mail configuration
./check-mail-config.sh

# Check system status
./test-email-system.sh
```

---

## Setting Up Mail Server (Choose One)

### ✅ Recommended: Use Mailhog (Local Testing)

**What is Mailhog?**
- Dummy SMTP server that catches all emails
- Web interface to view captured emails
- Perfect for local development
- No actual emails sent

**Setup:**
```bash
# 1. Install Mailhog
brew install mailhog

# 2. Start it (run in separate terminal)
mailhog

# 3. You'll see:
# MailHog version v1.0.1
# Listening on 0.0.0.0:1025
# Web interface is listening at http://localhost:8025
```

**Configure PHP to use Mailhog:**
```bash
# Edit your php.ini
nano /usr/local/etc/php/8.5/php.ini

# Find the [mail function] section and set:
SMTP = localhost
smtp_port = 1025
sendmail_path = "/usr/sbin/sendmail -t -i"
```

**Verify it works (without actually testing the form):**
```bash
# Check if Mailhog is listening
lsof -i :1025

# Output should show mailhog listening
```

### Option 2: Use Postfix (System Mail Server)

**Check if available:**
```bash
# Start postfix
sudo postfix start

# Check status
postfix status

# View mail queue
mailq
```

### Option 3: Production (BlueHost)

**No setup needed!** BlueHost has mail server pre-configured:
- ✅ Just upload your files
- ✅ PHP automatically sends emails
- ✅ Mail server is managed by BlueHost
- ✅ Your recipient email receives emails directly

---

## How to Verify Mail Server is Ready (No Form Testing)

### Quick Verification Commands

```bash
# 1. Check if mail service is running
sudo postfix status

# 2. Check if Mailhog is running
lsof -i :1025

# 3. Test PHP mail function directly
php -r "echo ini_get('sendmail_path');"

# 4. Check mail logs for recent activity
tail -20 /var/log/mail.log

# 5. Test SMTP connection
telnet localhost 25
# Type: quit
```

### What to Look For

✅ **Mail Server is Ready if:**
- Postfix/Mailhog is running on correct port
- No errors in mail logs
- `sendmail_path` is configured in php.ini
- SMTP port is open (port 25 or 1025)

❌ **Mail Server is NOT Ready if:**
- "Connection refused" errors
- Port not listening
- PHP mail function disabled
- `sendmail_path` is empty

---

## Files Created for Verification

1. **check-mail-config.sh**
   - Shows current mail configuration
   - Run: `./check-mail-config.sh`
   - No testing, just checks system setup

2. **test-email-system.sh**
   - Verifies all services are running
   - Run: `./test-email-system.sh`
   - No form testing, just checks connectivity

3. **check-submissions.sh**
   - Shows form submissions log
   - Run: `./check-submissions.sh`
   - No testing required

4. **MAIL_SERVER_SETUP.md**
   - Detailed mail server configuration guide
   - Read: `cat MAIL_SERVER_SETUP.md`

---

## Complete Setup Checklist

### Step 1: Verify Current Configuration
```bash
✓ ./check-mail-config.sh         # Check what's configured
✓ ./test-email-system.sh          # Check all services running
```

### Step 2: Choose and Setup Mail Server
```bash
# Option A: Local Testing with Mailhog
✓ brew install mailhog
✓ mailhog  # Start in separate terminal

# Option B: Production (BlueHost)
✓ No setup needed - just upload files
```

### Step 3: Verify Mail Server is Ready
```bash
✓ lsof -i :1025                   # Mailhog listening
✓ lsof -i :25                     # Postfix listening
✓ ./check-mail-config.sh          # Verify PHP settings
```

### Step 4: Ready to Test (Optional)
```bash
✓ Open http://localhost:8080
✓ Submit form
✓ Check browser console (F12)
✓ ./check-submissions.sh          # View submissions
```

---

## Quick Reference

### Ports Reference
| Service | Port | Status |
|---------|------|--------|
| React App | 8080 | ✅ Running |
| PHP Backend | 3000 | ✅ Running |
| SMTP (Postfix) | 25 | Check status |
| SMTP (Mailhog) | 1025 | After setup |
| Mailhog Web | 8025 | After setup |

### Configuration Files
| File | Purpose | Location |
|------|---------|----------|
| php.ini | PHP settings | `/usr/local/etc/php/8.5/php.ini` |
| send-email.php | Email handler | `php/send-email.php` |
| php-email-service.ts | Frontend service | `src/utils/php-email-service.ts` |
| GetNowModal.tsx | Form component | `src/components/GetNowModal.tsx` |

---

## Verification Without Testing

### Just Check Configuration
```bash
# This shows what's configured (no testing needed)
php -i | grep -E "sendmail_path|SMTP|mail function"
```

### Just Check If Services Are Running
```bash
# Check all without submitting any forms
./test-email-system.sh
```

### Just Check Submission Log
```bash
# View what's been submitted (if anything)
./check-submissions.sh
```

---

## Summary

✅ **Your email system is ready to configure.**

**Without any testing, you can:**
1. Check current configuration: `./check-mail-config.sh`
2. Choose a mail server (Mailhog or Postfix)
3. Install/configure it
4. Verify it's running: `lsof -i :1025` or `lsof -i :25`
5. Verify PHP settings: `php -i | grep sendmail`

**When you're ready to deploy to BlueHost:**
- ✅ No mail server setup needed
- ✅ Just upload your files
- ✅ BlueHost handles email delivery
- ✅ Everything works automatically

**Questions?** Check the specific setup guide for your choice:
- `MAIL_SERVER_SETUP.md` - Complete mail server guide
- `EMAIL_SYSTEM_SETUP.md` - Email system architecture
- `QUICK_EMAIL_STATUS.md` - Quick reference guide
