document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value
    };

    document.getElementById('response-message').textContent = "Enviando mensaje...";

    try {
        const response = await fetch('/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById('response-message').textContent = result.message;
    } catch (error) {
        document.getElementById('response-message').textContent = "Error enviando mensaje.";
    }
});
