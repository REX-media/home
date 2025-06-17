// =============================================================================
// JAVASCRIPT PARA FORMULARIO DE CONTACTO CON reCAPTCHA - REX MEDIA
// Archivo: js/contact-form.js
// =============================================================================

// Manejo del formulario con reCAPTCHA
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar reCAPTCHA
            var recaptchaResponse = grecaptcha.getResponse();
            
            if (recaptchaResponse.length === 0) {
                showMessage('Por favor, completa la verificación "No soy un robot"', 'error');
                return;
            }
            
            // Enviar formulario
            var formData = new FormData(this);
            formData.append('recaptcha_response', recaptchaResponse);
            
            showMessage('Enviando mensaje...', 'info');
            
            fetch('enviar_contacto.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                    contactForm.reset();
                    grecaptcha.reset();
                } else {
                    showMessage(data.message || 'Hubo un error al enviar el mensaje.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Error de conexión. Por favor, intenta nuevamente.', 'error');
            });
        });
    }
});

// Función para mostrar mensajes
function showMessage(message, type) {
    var messageDiv = document.querySelector('.form-message');
    if (messageDiv) {
        messageDiv.innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(function() {
            messageDiv.innerHTML = '';
        }, 5000);
    }
}