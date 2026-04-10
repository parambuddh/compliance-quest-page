#!/bin/bash

# 📧 Email System Diagnostic Script

echo "================================"
echo "🔧 ComplianceVista Email Diagnostics"
echo "================================"
echo ""

# Check 1: PHP files exist
echo "✓ Checking PHP files..."
if [ -f "api/contact.php" ]; then
    echo "  ✓ api/contact.php found"
else
    echo "  ✗ api/contact.php NOT found"
fi

# Check 2: PHPMailer installed
if [ -d "vendor" ]; then
    echo "  ✓ vendor/ directory found (PHPMailer likely installed)"
else
    echo "  ✗ vendor/ directory NOT found - PHPMailer may not be installed"
fi

# Check 3: Email logs
echo ""
echo "✓ Checking email logs..."
if [ -f "php/email-submissions.log" ]; then
    echo "  ✓ email-submissions.log found"
    echo "  Last entries:"
    tail -3 php/email-submissions.log | sed 's/^/    /'
else
    echo "  ✗ No email log found"
fi

# Check 4: Current contact.php config
echo ""
echo "✓ Checking api/contact.php configuration..."
echo "  Checking SMTP settings..."

if grep -q "zeon6080@gmail.com" api/contact.php; then
    echo "    SMTP User: zeon6080@gmail.com"
fi

if grep -q "jtwb crev jxzb vvoe" api/contact.php; then
    echo "    SMTP Pass: ******* (configured)"
fi

if grep -q "parambuddh26@gmail.com" api/contact.php; then
    echo "    Recipient 1: parambuddh26@gmail.com"
fi

if grep -q "gajeramilan518@gmail.com" api/contact.php; then
    echo "    Recipient 2: gajeramilan518@gmail.com"
fi

# Check 5: React contact form
echo ""
echo "✓ Checking React Contact Form..."
if grep -q "ContactSection" src/components/ContactSection.tsx 2>/dev/null; then
    echo "  ✓ ContactSection component found"
fi

if grep -q "api/contact.php" src/components/ContactSection.tsx 2>/dev/null; then
    echo "  ✓ Form sends to /api/contact.php"
fi

# Summary
echo ""
echo "================================"
echo "📋 Next Steps:"
echo "================================"
echo "1. Check browser Developer Tools (F12) → Console tab"
echo "2. Fill the contact form and click Send"
echo "3. Look for error messages in Console or Network tab"
echo "4. Check Gmail inbox and SPAM folder"
echo ""
echo "Common issues:"
echo "  - Gmail app password expired (regenerate new one)"
echo "  - Gmail 2FA not enabled"
echo "  - Recipient email addresses incorrect"
echo "  - Email going to SPAM folder"
echo ""
echo "📖 Read: EMAIL_DELIVERY_TROUBLESHOOTING.md for detailed help"
echo ""
