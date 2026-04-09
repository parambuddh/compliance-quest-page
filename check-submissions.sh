#!/bin/bash
# 🔍 Check Email Submissions
# View all submissions that have been logged to the system

WORKSPACE="/Users/apple/Desktop/Milan/Ardira Internship records/Office/Complience Vista website/website/compliance-quest-page"
LOG_FILE="$WORKSPACE/php/email-submissions.log"

echo "=========================================="
echo "📧 Email Submissions Log Viewer"
echo "=========================================="
echo ""

if [ ! -f "$LOG_FILE" ]; then
    echo "❌ No submissions yet!"
    echo ""
    echo "To test the form:"
    echo "1. Open http://localhost:8080"
    echo "2. Click 'Get It Now' button"
    echo "3. Fill in and submit the form"
    echo "4. Run this script again"
    exit 0
fi

echo "✅ Found $LOG_FILE"
echo ""
echo "Recent Submissions:"
echo "-------------------------------------------"
tail -20 "$LOG_FILE"
echo "-------------------------------------------"
echo ""

# Count total submissions
TOTAL=$(wc -l < "$LOG_FILE")
SUCCESSFUL=$(grep "Success: YES" "$LOG_FILE" | wc -l)
FAILED=$(grep "Success: NO" "$LOG_FILE" | wc -l)

echo "📊 Statistics:"
echo "   Total submissions: $TOTAL"
echo "   ✅ Successful: $SUCCESSFUL"
echo "   ❌ Failed: $FAILED"
echo ""

if [ $TOTAL -gt 0 ]; then
    echo "✨ Everything is working! Users are submitting forms."
else
    echo "No submissions recorded yet. Submit a test form to get started!"
fi
