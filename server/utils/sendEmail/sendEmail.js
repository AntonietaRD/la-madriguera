const nodemailer = require('nodemailer');
const { frontendUrl } = require('../../config');


function sendEmail(sourceEmail, destinationEmail, subject, text) {
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: 'derick85@ethereal.email',
			pass: '9DAH73n6HVjPDPQ3Kz'
		}
	});

	const mailOptions = {
		from: sourceEmail,
		to: destinationEmail,
		subject: subject,
		text: text
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error al enviar correo:', error);
		} else {
			console.log('Correo enviado:', info.response);
		}
	});
}

module.exports = {
	sendEmail,
	sendRegistrationEmail: (destinationEmail, token, inscriptionId, equipoId) => sendEmail('derick85@ethereal.email', destinationEmail, 'Registro individual de liga',`Ingresa al siguiente link para completar tu registro individual al equipo: ${frontendUrl}/#/formulario-ind?token=${token}&inscripcionId=${inscriptionId}&equipoId=${equipoId}`)
};