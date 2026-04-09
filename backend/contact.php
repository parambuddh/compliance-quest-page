<?php
// backend/contact.php

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit();
}

// Get JSON POST body
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

// Basic Validation
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

// --- Email Configurations ---
$senderName = "ComplianceVista Sales";
$senderEmail = "sales@ardira.com";
$supportEmail = "support@ardira.com";
$logoUrl = "https://compliancevista.com/wp-content/uploads/2024/09/logo.png"; // Fallback URL, assuming it exists

// 1. Mail to Sales Team
$toSales = "brijesh@ardira.com";
$ccSales = "rajesh@ardira.com, kiran@ardira.com, jay@ardira.com, svainsh@ardira.com, rjoachim@ardira.com, sboda@ardira.com, quinn@ardira.com";
$subjectSales = "Inquiry from ComplianceVista website";

// 2. Mail to Prospect
$subjectProspect = "Thank You for contacting us regarding ComplianceVista";

// Common Headers for HTML Email
function getHeaders($fromName, $fromEmail, $replyTo, $cc = "") {
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$fromName} <{$fromEmail}>\r\n";
    $headers .= "Reply-To: {$replyTo}\r\n";
    if (!empty($cc)) {
        $headers .= "Cc: {$cc}\r\n";
    }
    return $headers;
}

// HTML Template Generators
function getSalesEmailHTML($name, $email, $phone, $message, $source_url, $logoUrl, $supportEmail) {
    return "<!DOCTYPE html>
<html>
<head><title>Inquiry from ComplianceVista website</title></head>
<body>
    <table cellspacing='0' cellpadding='0' border='0' width='650' align='center' style='border: 1px solid #e2e2e2;color: #13324b;font-family: Arial,Helvetica,sans-serif;font-size: 12px;'>
        <tr>
            <td align='center' valign='top'>
                <table cellspacing='0' cellpadding='0' width='100%' align='center' style='color: #000000;'>
                    <tr>
                        <td valign='top' bgcolor='#f4f9fb' style=' text-align: center; padding: 10px 0; border-bottom: 1px solid #e2e2e2;'> 
                            <a href='https://compliancevista.com/' target='_blank'>
                                <img src='{$logoUrl}' style='display: block; margin: 0 auto;' width='200' border='0' alt='ComplianceVista' />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding:10px 10px 20px;' align='center' valign='top'>
                            <table width='100%' cellspacing='0' cellpadding='0' align='center'>
                                <tr>
                                    <td align='left' style='padding:10px 0;'> <strong style='font-size:18px; color:#333;'>Following message received via contact us form</strong> </td>
                                </tr>
                                <tr><td height='5'></td></tr>
                                <tr>
                                    <td width='100%' border='0'>
                                        <table width='100%' align='center' cellpadding='0' cellspacing='0' style='font-size: 13px; color: #666666; border-collapse: collapse;border:1px solid #ccc;border-bottom:0;'>
                                            <tbody>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Name:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>{$name}</td>
                                                </tr>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Email:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>{$email}</td>
                                                </tr>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Contact Number:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>{$phone}</td>
                                                </tr>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Message:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>" . nl2br($message) . "</td>
                                                </tr>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Form Submitted From:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>{$source_url}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table cellpadding='0' cellspacing='0' border='0' width='100%' style='line-height:18px; padding:10px; border-top: solid 1px #e2e2e2;' bgcolor='#f4f9fb'>
                                <tr>
                                    <td align='left' width='50%' style='text-align:left; font-size: 12px;'>
                                        <strong>Thanks & Regards</strong><br /> ComplianceVista Team<br />
                                        <strong>Address: </strong>2040 Martin Ave Santa Clara, CA 95050 United States<br />
                                        <strong>Phone: </strong> 1.669.777.6838 <br />
                                        <strong>Email: </strong> <a style='color: #000;' href='mailto:{$supportEmail}'>{$supportEmail}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>";
}

function getProspectEmailHTML($name, $email, $phone, $message, $logoUrl, $supportEmail) {
    return "<!DOCTYPE html>
<html>
<head><title>Thank You for contacting us regarding ComplianceVista</title></head>
<body>
    <table cellspacing='0' cellpadding='0' border='0' width='650' align='center' style='border: 1px solid #e2e2e2;color: #13324b;font-family: Arial,Helvetica,sans-serif;font-size: 12px;'>
        <tr>
            <td align='center' valign='top'>
                <table cellspacing='0' cellpadding='0' width='100%' align='center' style='color: #000000;'>
                    <tr>
                        <td valign='top' bgcolor='#f4f9fb' style=' text-align: center; padding: 10px 0; border-bottom: 1px solid #e2e2e2;'> 
                            <a href='https://compliancevista.com/' target='_blank'>
                                <img src='{$logoUrl}' style='display: block;margin: 0 auto;' width='200' border='0' alt='ComplianceVista' />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding:10px 10px 20px;' align='center' valign='top'>
                            <table width='100%' cellspacing='0' cellpadding='0' align='center'>
                                <tr>
                                    <td align='left' style='padding:10px 0;'> <strong style='font-size:18px; color:#333;'>We have received your details, one of our representatives will get in touch with you shortly.</strong> </td>
                                </tr>
                                <tr><td height='5'></td></tr>
                                <tr>
                                    <td width='100%' border='0'>
                                        <table width='100%' align='center' cellpadding='0' cellspacing='0' style='font-size: 13px; color: #666666; border-collapse: collapse;border:1px solid #ccc;border-bottom:0;'>
                                            <tbody>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Name:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>{$name}</td>
                                                </tr>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Email:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>{$email}</td>
                                                </tr>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Contact Number:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>{$phone}</td>
                                                </tr>
                                                <tr>
                                                    <td style='color:#000;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>Message:</strong></td>
                                                    <td style='padding:10px;border-bottom:1px solid #ccc;width:66%'>" . nl2br($message) . "</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table cellpadding='0' cellspacing='0' border='0' width='100%' style='line-height:18px; padding:10px; border-top: solid 1px #e2e2e2;' bgcolor='#f4f9fb'>
                                <tr>
                                    <td align='left' width='50%' style='text-align:left; font-size: 12px;'>
                                        <strong>Thanks & Regards</strong><br /> ComplianceVista Team<br />
                                        <strong>Address: </strong>2040 Martin Ave Santa Clara, CA 95050 United States<br />
                                        <strong>Phone: </strong> 1.669.777.6838 <br />
                                        <strong>Email: </strong> <a style='color: #000;' href='mailto:{$supportEmail}'>{$supportEmail}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>";
}

$salesEmailBody = getSalesEmailHTML($name, $email, $phone, $message, $source_url, $logoUrl, $supportEmail);
$prospectEmailBody = getProspectEmailHTML($name, $email, $phone, $message, $logoUrl, $supportEmail);

$salesHeaders = getHeaders($senderName, $senderEmail, $email, $ccSales);
$prospectHeaders = getHeaders($senderName, $senderEmail, $senderEmail);

$errors = [];

// Send to Sales
if (!mail($toSales, $subjectSales, $salesEmailBody, $salesHeaders)) {
    $errors[] = "Failed to send email to sales team.";
}

// Send to Prospect
if (!mail($email, $subjectProspect, $prospectEmailBody, $prospectHeaders)) {
    $errors[] = "Failed to send confirmation email to prospect.";
}

if (!empty($errors)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "An error occurred while sending emails.", "errors" => $errors]);
} else {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Thank you! Your message has been sent successfully."]);
}
