<?php
/**
 * Test Gmail SMTP Connection
 * Debug script to verify Gmail is reachable
 */

echo "=== Testing Gmail SMTP Connection ===\n\n";

// Test parameters
$host = 'smtp.gmail.com';
$port = 587;
$timeout = 10;

echo "1. Attempting to connect to $host:$port...\n";

$sock = @fsockopen($host, $port, $errno, $errstr, $timeout);

if (!$sock) {
    echo "❌ Connection FAILED: $errstr (Error: $errno)\n";
    exit(1);
}

echo "✅ Connection successful!\n\n";

echo "2. Reading server response...\n";
$response = fgets($sock, 1024);
echo "   Response: " . trim($response) . "\n";

echo "\n3. Sending EHLO...\n";
fputs($sock, "EHLO localhost\r\n");
$response = fgets($sock, 1024);
echo "   Response: " . trim($response) . "\n";

echo "\n4. Checking for STARTTLS support...\n";
fputs($sock, "EHLO localhost\r\n");
// Read all responses
while ($line = fgets($sock, 1024)) {
    echo "   " . trim($line) . "\n";
    if (strpos($line, '250 ') === 0) break;
}

echo "\n5. Sending STARTTLS...\n";
fputs($sock, "STARTTLS\r\n");
$response = fgets($sock, 1024);
echo "   Response: " . trim($response) . "\n";

echo "\n✅ Gmail SMTP is reachable and ready!\n";
echo "\nNext steps:\n";
echo "1. Enable 2FA on your Gmail account\n";
echo "2. Create an App Password\n";
echo "3. Add the app password to php/send-email.php\n";

fclose($sock);
?>
