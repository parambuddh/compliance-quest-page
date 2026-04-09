#!/bin/bash
# 🔍 Verify Mail Configuration (No Testing Required)
# This script checks if your mail server is properly configured

echo "=========================================="
echo "📧 Mail Server Configuration Checker"
echo "=========================================="
echo ""

# Check 1: Verify PHP mail function is enabled
echo "1. Checking if PHP mail() function is enabled..."
PHP_MAIL=$(php -i | grep "mail function")
if php -i | grep -q "mail_function.*On"; then
    echo "   ✅ PHP mail function is enabled"
else
    echo "   ⚠️  PHP mail function status:"
    php -i | grep -i "mail function" | head -3
fi

# Check 2: Check php.ini location
echo ""
echo "2. PHP Configuration File:"
PHP_INI=$(php -i | grep "Loaded Configuration File")
echo "   $PHP_INI"

# Check 3: Check sendmail_path
echo ""
echo "3. Sendmail Path Configuration:"
SENDMAIL=$(php -i | grep "sendmail_path" | head -1)
if [ -z "$SENDMAIL" ]; then
    echo "   ⚠️  No custom sendmail path configured (using system default)"
else
    echo "   $SENDMAIL"
fi

# Check 4: Check SMTP settings
echo ""
echo "4. SMTP Configuration:"
SMTP=$(php -i | grep -E "^SMTP|^smtp_port" | head -2)
if [ -z "$SMTP" ]; then
    echo "   ⚠️  SMTP not configured"
else
    echo "   $SMTP"
fi

# Check 5: Look for mail server processes
echo ""
echo "5. Running Mail Services:"
if pgrep -q mailhog; then
    echo "   ✅ Mailhog is running"
else
    echo "   ❌ Mailhog is NOT running"
fi

if pgrep -q postfix; then
    echo "   ✅ Postfix is running"
else
    echo "   ℹ️  Postfix is NOT running"
fi

# Check 6: Verify PHP files exist
echo ""
echo "6. Required Files:"
if [ -f "php/send-email.php" ]; then
    echo "   ✅ php/send-email.php exists"
else
    echo "   ❌ php/send-email.php NOT found"
fi

if [ -f "src/utils/php-email-service.ts" ]; then
    echo "   ✅ src/utils/php-email-service.ts exists"
else
    echo "   ❌ src/utils/php-email-service.ts NOT found"
fi

if [ -f "src/components/GetNowModal.tsx" ]; then
    echo "   ✅ src/components/GetNowModal.tsx exists"
else
    echo "   ❌ src/components/GetNowModal.tsx NOT found"
fi

# Check 7: View current PHP mail settings
echo ""
echo "7. Full PHP Mail Configuration:"
echo "   =========================================="
php -i | grep -A 20 "\[mail function\]" | head -15
echo "   =========================================="

echo ""
echo "=========================================="
echo "📋 Recommended Next Steps"
echo "=========================================="
echo ""
echo "To configure mail server for LOCAL TESTING:"
echo "  1. Install Mailhog: brew install mailhog"
echo "  2. Start Mailhog: mailhog"
echo "  3. View dashboard: http://localhost:8025"
echo ""
echo "To configure mail server for PRODUCTION:"
echo "  1. On BlueHost - no setup needed! (auto-configured)"
echo "  2. Just upload your files and it works"
echo ""
echo "To verify mail configuration details:"
echo "  See: MAIL_SERVER_SETUP.md"
echo ""
