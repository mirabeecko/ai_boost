<?php
/**
 * AI Boost - Contact Form Handler
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Check that your hosting supports PHP mail() function
 * 2. Update the $recipient_email variable below with your email address
 * 3. If mail() doesn't work, see the PHPMailer alternative at the bottom
 * 4. Test the form after deployment
 */

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Set content type to JSON
header('Content-Type: application/json');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'message' => 'Neplatná metoda požadavku.'
    ]);
    exit;
}

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Check if JSON is valid
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'Neplatná data formuláře.'
    ]);
    exit;
}

// ========================================
// Configuration
// ========================================
$recipient_email = 'miroslavbrozek@gmail.com'; // CHANGE THIS TO YOUR EMAIL
$subject = 'AI Boost – nový kontakt';

// ========================================
// Honeypot Check (spam protection)
// ========================================
if (isset($data['website']) && !empty($data['website'])) {
    // Bot detected, return success but don't send email
    echo json_encode([
        'ok' => true,
        'message' => 'Děkujeme za váš zájem. Brzy se vám ozveme.'
    ]);
    exit;
}

// ========================================
// Validate Required Fields
// ========================================
$errors = [];

// Name validation
if (empty($data['name']) || trim($data['name']) === '') {
    $errors[] = 'Jméno je povinné.';
}

// Email validation
if (empty($data['email']) || trim($data['email']) === '') {
    $errors[] = 'E-mail je povinný.';
} elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'E-mailová adresa není platná.';
}

// Message validation
if (empty($data['message']) || trim($data['message']) === '') {
    $errors[] = 'Zpráva je povinná.';
}

// GDPR consent validation
if (empty($data['gdpr']) || $data['gdpr'] !== 'on') {
    $errors[] = 'Souhlas se zpracováním osobních údajů je vyžadován.';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => implode(' ', $errors)
    ]);
    exit;
}

// ========================================
// Sanitize Input Data
// ========================================
$name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : 'Neuvedeno';
$company = isset($data['company']) ? htmlspecialchars(trim($data['company']), ENT_QUOTES, 'UTF-8') : 'Neuvedeno';
$plan = isset($data['plan']) && !empty($data['plan']) ? htmlspecialchars(trim($data['plan']), ENT_QUOTES, 'UTF-8') : 'Neuvedeno';
$message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');

// Get user IP and user agent for reference
$user_ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
$timestamp = date('Y-m-d H:i:s');

// ========================================
// Compose Email
// ========================================
$email_body = "Nová poptávka z webu AI Boost\n";
$email_body .= "=====================================\n\n";
$email_body .= "Datum a čas: {$timestamp}\n\n";
$email_body .= "KONTAKTNÍ ÚDAJE\n";
$email_body .= "-------------------------------------\n";
$email_body .= "Jméno: {$name}\n";
$email_body .= "E-mail: {$email}\n";
$email_body .= "Telefon: {$phone}\n";
$email_body .= "Firma: {$company}\n";
$email_body .= "Vybraná varianta: {$plan}\n\n";
$email_body .= "ZPRÁVA\n";
$email_body .= "-------------------------------------\n";
$email_body .= $message . "\n\n";
$email_body .= "TECHNICKÉ ÚDAJE\n";
$email_body .= "-------------------------------------\n";
$email_body .= "IP adresa: {$user_ip}\n";
$email_body .= "User Agent: {$user_agent}\n";

// Email headers
$headers = [];
$headers[] = "From: AI Boost Web <noreply@" . $_SERVER['HTTP_HOST'] . ">";
$headers[] = "Reply-To: {$name} <{$email}>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// ========================================
// Send Email
// ========================================
$mail_sent = mail(
    $recipient_email,
    $subject,
    $email_body,
    implode("\r\n", $headers)
);

// ========================================
// Return Response
// ========================================
if ($mail_sent) {
    echo json_encode([
        'ok' => true,
        'message' => 'Děkujeme za váš zájem! Ozveme se vám do 24 hodin (pracovní dny).'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => 'Omlouváme se, e-mail se nepodařilo odeslat. Kontaktujte nás prosím přímo na miroslavbrozek@gmail.com'
    ]);
}

/**
 * ========================================
 * ALTERNATIVE: PHPMailer for SMTP
 * ========================================
 *
 * If your hosting blocks mail() function, use PHPMailer with SMTP.
 *
 * 1. Download PHPMailer: https://github.com/PHPMailer/PHPMailer
 * 2. Upload to your server (e.g., /lib/PHPMailer/)
 * 3. Uncomment and configure the code below:
 *
 * // Require PHPMailer
 * require 'lib/PHPMailer/PHPMailer.php';
 * require 'lib/PHPMailer/SMTP.php';
 * require 'lib/PHPMailer/Exception.php';
 *
 * use PHPMailer\PHPMailer\PHPMailer;
 * use PHPMailer\PHPMailer\Exception;
 *
 * $mail = new PHPMailer(true);
 *
 * try {
 *     // Server settings
 *     $mail->isSMTP();
 *     $mail->Host       = 'smtp.example.com';        // SMTP server
 *     $mail->SMTPAuth   = true;
 *     $mail->Username   = 'your-email@example.com';  // SMTP username
 *     $mail->Password   = 'your-password';           // SMTP password
 *     $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
 *     $mail->Port       = 587;
 *     $mail->CharSet    = 'UTF-8';
 *
 *     // Recipients
 *     $mail->setFrom('noreply@' . $_SERVER['HTTP_HOST'], 'AI Boost Web');
 *     $mail->addAddress($recipient_email);
 *     $mail->addReplyTo($email, $name);
 *
 *     // Content
 *     $mail->isHTML(false);
 *     $mail->Subject = $subject;
 *     $mail->Body    = $email_body;
 *
 *     $mail->send();
 *
 *     echo json_encode([
 *         'ok' => true,
 *         'message' => 'Děkujeme za váš zájem! Ozveme se vám do 24 hodin (pracovní dny).'
 *     ]);
 * } catch (Exception $e) {
 *     http_response_code(500);
 *     echo json_encode([
 *         'ok' => false,
 *         'message' => 'Omlouváme se, e-mail se nepodařilo odeslat.'
 *     ]);
 * }
 */

/**
 * ========================================
 * ALTERNATIVE: Save to Database
 * ========================================
 *
 * If email doesn't work at all, you can save submissions to a database:
 *
 * $db = new PDO('mysql:host=localhost;dbname=your_db', 'username', 'password');
 *
 * $stmt = $db->prepare("
 *     INSERT INTO contact_submissions
 *     (name, email, phone, company, plan, message, ip_address, created_at)
 *     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
 * ");
 *
 * $stmt->execute([
 *     $name, $email, $phone, $company, $plan, $message, $user_ip
 * ]);
 *
 * echo json_encode([
 *     'ok' => true,
 *     'message' => 'Děkujeme za váš zájem! Ozveme se vám do 24 hodin.'
 * ]);
 */
?>
