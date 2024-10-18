const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer'); // Requerir Nodemailer
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
    auth: {
        user: 'hardwarehubros@gmail.com', // Coloca tu correo
        pass: 'xjtp hyng yada eqqz' // Coloca tu contraseña de correo
    }
});

// Ruta para manejar el formulario de contacto
app.post('/api/contacto', (req, res) => {
    const { nombre, apellido, edad, telefono, email, mensaje } = req.body;

    if (nombre && apellido && edad && telefono && email && mensaje) {
        // Configurar el correo electrónico
        const mailOptions = {
            from: email,
            to: 'hardwarehubros@gmail.com', // Coloca el correo donde deseas recibir los mensajes
            subject: `Nuevo mensaje de contacto de ${nombre} ${apellido}`,
            text: `
                Nombre: ${nombre} ${apellido}
                Edad: ${edad}
                Teléfono: ${telefono}
                Email: ${email}
                Mensaje: ${mensaje}
            `
        };

        // Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error enviando el correo.' });
            } else {
                console.log('Correo enviado: ' + info.response);
                return res.json({ message: 'Formulario enviado con éxito y correo enviado.' });
            }
        });
    } else {
        res.status(400).json({ message: 'Por favor completa todos los campos.' });
    }
});

// Servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
