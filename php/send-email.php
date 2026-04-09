<?php
/**
 * Email Handler for ComplianceVista Lead Form
 * Handles sending emails via PHP mail() function
 * Compatible with BlueHost and other PHP hosting providers
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON data from request
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit();
}

// Extract and sanitize form data
$name = isset($data['name']) ? sanitize_input($data['name']) : '';
$email = isset($data['email']) ? sanitize_email($data['email']) : '';
$contactNumber = isset($data['contactNumber']) ? sanitize_input($data['contactNumber']) : '';
$company = isset($data['company']) ? sanitize_input($data['company']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($contactNumber) || empty($company)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// Recipient email
$recipientEmail = getenv('RECIPIENT_EMAIL') ?: 'gajeramilan518@gmail.com';

// Email subject and body
$subject = "New Lead Submission - $name";
$htmlBody = generateEmailHTML($name, $email, $contactNumber, $company);

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: noreply@compliancevista.com',
    'Reply-To: ' . $email,
];

// Send email
$mailHeaders = implode("\r\n", $headers);
$success = mail($recipientEmail, $subject, $htmlBody, $mailHeaders);

// Log the submission for debugging
$logEntry = date('Y-m-d H:i:s') . " | Name: $name | Email: $email | Company: $company | Success: " . ($success ? 'YES' : 'NO') . "\n";
@file_put_contents(__DIR__ . '/email-submissions.log', $logEntry, FILE_APPEND);

if ($success) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email'
    ]);
}

exit();

/**
 * Sanitize text input
 */
function sanitize_input($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

/**
 * Sanitize and validate email
 */
function sanitize_email($email) {
    $email = trim($email);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    return $email;
}

/**
 * Generate beautiful HTML email
 */
function generateEmailHTML($name, $email, $contactNumber, $company) {
    $currentDate = date('F j, Y \a\t g:i A');
    
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px 20px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #667eea; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .value { padding: 10px 0; color: #555; font-size: 14px; }
        .value a { color: #667eea; text-decoration: none; }
        .divider { border-bottom: 2px solid #f0f0f0; margin: 20px 0; }
        .cta-section { background: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .cta-text { color: #666; font-size: 14px; }
        .footer { background: #f5f5f5; padding: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 New Lead Submission</h1>
            <p>ComplianceVista Registration</p>
        </div>
        
        <div class="content">
            <p style="font-size: 16px; color: #333;">A new lead has submitted the <strong>"Get ComplianceVista Now"</strong> form and is interested in your product.</p>
            
            <div class="divider"></div>
            
            <div class="field">
                <div class="label">👤 Full Name</div>
                <div class="value">$name</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email Address</div>
                <div class="value"><a href="mailto:$email">$email</a></div>
            </div>
            
            <div class="field">
                <div class="label">📱 Contact Number</div>
                <div class="value"><a href="tel:$contactNumber">$contactNumber</a></div>
            </div>
            
            <div class="field">
                <div class="label">🏢 Company/Organization</div>
                <div class="value">$company</div>
            </div>
            
            <div class="field">
                <div class="label">⏰ Submission Time</div>
                <div class="value">$currentDate</div>
            </div>
            
            <div class="divider"></div>
            
            <div class="cta-section">
                <p class="cta-text">✅ Lead has been redirected to Salesforce AppExchange for installation.</p>
                <p class="cta-text">💡 Consider following up with this lead for additional details.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was automatically sent by ComplianceVista Lead Management System.</p>
            <p>© 2026 ComplianceVista. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
HTML;
}
?>
