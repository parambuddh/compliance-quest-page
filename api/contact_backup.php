<?php
// api/contact.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require Composer autoloader deployed by vercel-php
require __DIR__ . '/../vendor/autoload.php';

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
    exit();
}

// Sanitize Inputs
$name = isset($data['name']) ? htmlspecialchars(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : '';
$message = isset($data['message']) ? htmlspecialchars(strip_tags($data['message'])) : '';
$source_url = isset($data['source_url']) ? htmlspecialchars(strip_tags($data['source_url'])) : (isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'Direct');

if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name, email, and phone are required."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    exit();
}

// --- SMTP Temp Credentials ---
// Using the provided temp credentials directly to make sure Vercel deployed version works immediately without you manually setting env vars yet.
$smtpUser = getenv('SMTP_USER') ?: 'zeon6080@gmail.com';
$smtpPass = getenv('SMTP_PASS') ?: 'jtwb crev jxzb vvoe';

$logoUrl = "https://compliance-quest-page.vercel.app/ComplianceVista-logo.svg"; // ComplianceVista official logo

// Send the "Sales Team" email to your temp testing recipients
$testRecipients = ['parambuddh26@gmail.com', 'gajeramilan518@gmail.com'];
$subjectSales = "New Inquiry from ComplianceVista website (Demo Mode)";
$subjectProspect = "Thank You for contacting ComplianceVista (Demo Mode)";

// HTML Templates exactly reproducing the original requirement formatting
function getSalesEmailHTML($name, $email, $phone, $message, $source_url, $logoUrl) {
    return "<!DOCTYPE html><html><head><title>Inquiry</title></head><body>
    <table width='650' align='center' cellpadding='0' cellspacing='0' style='border: 1px solid #e2e2e2;font-family: Arial, sans-serif;font-size:12px;color:#333;'>
        <tr><td align='center' bgcolor='#f4f9fb' style='padding:10px 0;border-bottom:1px solid #e2e2e2;'>
            <img src='{$logoUrl}' width='200' style='display:block;' />
        </td></tr>
        <tr><td align='center' style='padding:20px 10px;'>
            <table width='100%' cellpadding='0' cellspacing='0'>
                <tr><td align='left' style='padding-bottom:10px;'><strong style='font-size:18px;'>Following message received via contact us form</strong></td></tr>
                <tr><td>
                    <table width='100%' cellpadding='0' cellspacing='0' border='1' style='border-collapse:collapse;border:1px solid #ccc;'>
                        <tr><td style='padding:10px;width:34%;'><strong>Name:</strong></td><td style='padding:10px;'>{$name}</td></tr>
                        <tr><td style='padding:10px;'><strong>Email:</strong></td><td style='padding:10px;'>{$email}</td></tr>
                        <tr><td style='padding:10px;'><strong>Contact Number:</strong></td><td style='padding:10px;'>{$phone}</td></tr>
                        <tr><td style='padding:10px;'><strong>Message:</strong></td><td style='padding:10px;'>" . nl2br($message) . "</td></tr>
                        <tr><td style='padding:10px;'><strong>Form Submitted From:</strong></td><td style='padding:10px;'>{$source_url}</td></tr>
                    </table>
                </td></tr>
            </table>
        </td></tr>
        <tr><td bgcolor='#f4f9fb' style='padding:10px;border-top:1px solid #e2e2e2;'>
            <strong>Thanks & Regards</strong><br /> ComplianceVista Team<br />
            <strong>Address: </strong>2040 Martin Ave Santa Clara, CA 95050 United States<br />
            <strong>Phone: </strong> 1.669.777.6838
        </td></tr>
    </table></body></html>";
}

function getProspectEmailHTML($name, $email, $phone, $message, $logoUrl) {
    return "<!DOCTYPE html><html><head><title>Thank You</title></head><body>
    <table width='650' align='center' cellpadding='0' cellspacing='0' style='border: 1px solid #e2e2e2;font-family: Arial, sans-serif;font-size:12px;color:#333;'>
        <tr><td align='center' bgcolor='#f4f9fb' style='padding:10px 0;border-bottom:1px solid #e2e2e2;'>
            <img src='{$logoUrl}' width='200' style='display:block;' />
        </td></tr>
        <tr><td align='center' style='padding:20px 10px;'>
            <table width='100%' cellpadding='0' cellspacing='0'>
                <tr><td align='left' style='padding-bottom:10px;'><strong style='font-size:18px;'>We have received your details, one of our representatives will get in touch with you shortly.</strong></td></tr>
                <tr><td>
                    <table width='100%' cellpadding='0' cellspacing='0' border='1' style='border-collapse:collapse;border:1px solid #ccc;'>
                        <tr><td style='padding:10px;width:34%;'><strong>Name:</strong></td><td style='padding:10px;'>{$name}</td></tr>
                        <tr><td style='padding:10px;'><strong>Email:</strong></td><td style='padding:10px;'>{$email}</td></tr>
                        <tr><td style='padding:10px;'><strong>Contact Number:</strong></td><td style='padding:10px;'>{$phone}</td></tr>
                        <tr><td style='padding:10px;'><strong>Message:</strong></td><td style='padding:10px;'>" . nl2br($message) . "</td></tr>
                    </table>
                </td></tr>
            </table>
        </td></tr>
        <tr><td bgcolor='#f4f9fb' style='padding:10px;border-top:1px solid #e2e2e2;'>
            <strong>Thanks & Regards</strong><br /> ComplianceVista Team<br />
            <strong>Address: </strong>2040 Martin Ave Santa Clara, CA 95050 United States<br />
            <strong>Phone: </strong> 1.669.777.6838
        </td></tr>
    </table></body></html>";
}

$salesBody = getSalesEmailHTML($name, $email, $phone, $message, $source_url, $logoUrl);
$prospectBody = getProspectEmailHTML($name, $email, $phone, $message, $logoUrl);

function sendMail($to, $cc, $subject, $body, $smtpUser, $smtpPass, $replyToEmail = null) {
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        return "PHPMailer library is not loaded.";
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        // Make sure to strip spaces from app password!
        $mail->Password   = str_replace(' ', '', $smtpPass); 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom($smtpUser, 'ComplianceVista Verification');
        $mail->addAddress($to);
        if ($cc) {
            $mail->addCC($cc);
        }
        if ($replyToEmail) {
            $mail->addReplyTo($replyToEmail, $replyToEmail);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        return "Error: {$mail->ErrorInfo}";
    }
}

$errors = [];

// 1. Send internal copy to Sales Team (Your temp emails)
$salesResult = sendMail($testRecipients[0], $testRecipients[1], $subjectSales, $salesBody, $smtpUser, $smtpPass, $email);
if ($salesResult !== true) {
    $errors[] = "Sales email failed: " . $salesResult;
}

// 2. Send Auto-Responder to the Prospect (Submitter)
$prospectResult = sendMail($email, null, $subjectProspect, $prospectBody, $smtpUser, $smtpPass);
if ($prospectResult !== true) {
    $errors[] = "Prospect email failed: " . $prospectResult;
}

if (!empty($errors)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Partial or total mail failure.", "errors" => $errors]);
} else {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Your message has been sent successfully!"]);
}
