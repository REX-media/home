<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

$nombre   = trim($_POST['nombre']   ?? '');
$email    = trim($_POST['email']    ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$asunto   = trim($_POST['asunto']   ?? '');
$mensaje  = trim($_POST['mensaje']  ?? '');
$rc       = trim($_POST['recaptcha_response'] ?? '');

if ($nombre === '' || $email === '' || $asunto === '' || $mensaje === '') {
    echo json_encode(['success' => false, 'message' => 'Completa todos los campos obligatorios.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email inválido.']);
    exit;
}

// ---- reCAPTCHA v2 verification ----
$recaptcha_secret = 'TU_SECRET_KEY_AQUI'; // <- Reemplazar con tu secret key de reCAPTCHA

$verify = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query([
            'secret'   => $recaptcha_secret,
            'response' => $rc,
            'remoteip' => $_SERVER['REMOTE_ADDR']
        ])
    ]
]));

$resp = json_decode($verify, true);

if (!$resp || empty($resp['success']) || ($resp['score'] ?? 0) < 0.5) {
    echo json_encode(['success' => false, 'message' => 'Verificación reCAPTCHA fallida. Intenta de nuevo.']);
    exit;
}

// ---- Send email ----
$to      = 'contacto.rexmedia@gmail.com';
$subject = 'REX Media — Contacto: ' . $asunto;

$body  = "Nombre: $nombre\n";
$body .= "Email: $email\n";
$body .= "Teléfono: " . ($telefono ?: 'No informado') . "\n";
$body .= "Asunto: $asunto\n\n";
$body .= "Mensaje:\n$mensaje\n";

$headers  = "From: noreply@rex-media.cl\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje. Intenta de nuevo.']);
}
