<?php
header("Access-Control-Allow-Origin: *");
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["con_name"]));
        $phone = strip_tags(trim($_POST["con_phone"]));
        $subject = strip_tags(trim($_POST["con_subject"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["con_email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["con_message"]);
 
        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR empty($phone) OR empty($subject) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Favor de completar los campos e intentar de nuevo.";
            exit;
        }
 
        // Set the recipient email address.
        $recipient = "contacto.rexmedia@gmail.com";
 
        // Set the email subject.
        $subject = $subject;
 
        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Phone:\n$phone\n";
        $email_content .= "Email:\n$email\n";
        $email_content .= "Message:\n$message\n";
 
        // Build the email headers.
        $email_headers = "From: $name <$email>";
 
        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Gracias!, su mensaje ha sido enviado.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Algo salio mal, no se pudo enviar el mensaje.";
        }
 
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "hugo un problema, intente de nuevo.";
    }
 
?>