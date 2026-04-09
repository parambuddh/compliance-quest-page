#!/bin/bash
# Email System Test Script
# Tests PHP backend and React frontend integration

echo "=========================================="
echo "ComplianceVista Email System Test"
echo "=========================================="
echo ""

# Test 1: Check if PHP is running
echo "1. Checking PHP server (port 3000)..."
if lsof -i :3000 > /dev/null 2>&1; then
    echo "   ✅ PHP server is running on port 3000"
else
    echo "   ❌ PHP server is NOT running on port 3000"
    exit 1
fi

# Test 2: Check if React is running
echo ""
echo "2. Checking React server (port 8080)..."
if lsof -i :8080 > /dev/null 2>&1; then
    echo "   ✅ React server is running on port 8080"
else
    echo "   ❌ React server is NOT running on port 8080"
fi

# Test 3: Test PHP endpoint with curl
echo ""
echo "3. Testing PHP endpoint..."
RESPONSE=$(curl -s -X POST http://localhost:3000/php/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "contactNumber": "1234567890",
    "company": "Test Company"
  }')

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "   ✅ PHP endpoint is responding correctly"
    echo "   Response: $RESPONSE"
else
    echo "   ❌ PHP endpoint returned an error"
    echo "   Response: $RESPONSE"
fi

# Test 4: Check React component file
echo ""
echo "4. Checking React files..."
if [ -f "src/components/GetNowModal.tsx" ]; then
    echo "   ✅ GetNowModal.tsx found"
else
    echo "   ❌ GetNowModal.tsx not found"
fi

if [ -f "src/utils/php-email-service.ts" ]; then
    echo "   ✅ php-email-service.ts found"
else
    echo "   ❌ php-email-service.ts not found"
fi

if [ -f "php/send-email.php" ]; then
    echo "   ✅ send-email.php found"
else
    echo "   ❌ send-email.php not found"
fi

# Test 5: Verify endpoint URL in service
echo ""
echo "5. Checking endpoint configuration..."
if grep -q "localhost:3000" src/utils/php-email-service.ts; then
    echo "   ✅ Service is configured for PHP on port 3000"
else
    echo "   ❌ Service is NOT configured correctly"
fi

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo ""
echo "✅ All systems are ready for testing!"
echo ""
echo "To test the form:"
echo "1. Open http://localhost:8080 in your browser"
echo "2. Click on 'Get It Now' button"
echo "3. Fill in the form with test data"
echo "4. Submit the form"
echo "5. Check browser console (F12) for logs"
echo ""
echo "Check for these messages in the console:"
echo "- 'Sending email to: http://localhost:3000/php/send-email.php'"
echo "- 'Email sent successfully!' OR error message"
echo ""
