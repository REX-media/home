<?php

// Tu clave secreta de Google reCAPTCHA
$secretKey = "6LeVdHgqAAAAADQFDGuPq04SU13TPJFIJUB2XQ0N";
$responseKey = $_POST['g-recaptcha-response'];
$userIP = $_SERVER['REMOTE_ADDR'];

// Verificar el reCAPTCHA
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$userIP");
$response = json_decode($response);

if ($response->success) {
    // Datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $mensaje = $_POST['mensaje'];

    // Configuración del correo
    $destinatario = "contacto.rexmedia@gmail.com";
    $asunto = "Nuevo mensaje de contacto";
    $contenido = "Nombre: $nombre\nCorreo: $email\n\nMensaje:\n$mensaje";

    // Enviar el correo
    if (mail($destinatario, $asunto, $contenido)) {
        echo "¡Mensaje enviado exitosamente!";
    } else {
        echo "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.";
    }
} else {
    echo "Error: No se ha verificado el reCAPTCHA. Intenta nuevamente.";
}
?>
