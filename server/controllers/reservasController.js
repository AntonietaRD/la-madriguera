const connectToDb = require('../connectDb');
const db = require('../utils/database');
const { sendEmail } = require('../utils/sendEmail/sendEmail');
const toSQLDatetime = require('../utils/toSQLDatetime/toSQLDatetime');

exports.crearSolicitudReserva = async function (req, res) {
	let {
		descripcion,
		idTipoEvento,
		nombreReservador,
		apellidoReservador,
		emailReservador,
		telefonoReservador,
		timestampInicio,
		timestampFin,
	} = req.body;

	try {
		connectToDb(db);

		timestampInicio = toSQLDatetime(timestampInicio);
		timestampFin = toSQLDatetime(timestampFin);

		const sql = `INSERT INTO topos_reserva 
                        (descripcion, id_tipo_evento, nombre_reservador, apellido_reservador, email_reservador, telefono_reservador, timestamp_inicio, timestamp_fin) 
                     VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?)`;

		const values = [
			descripcion,
			idTipoEvento,
			nombreReservador,
			apellidoReservador,
			emailReservador,
			telefonoReservador,
			timestampInicio,
			timestampFin,
		];

		const [result, _fields] = await db.execute(sql, values);

		res.status(201).json({
			success: true,
			message: 'Tu solicitud de reserva se envió correctamente.',
			data: result.insertId,
		});
	} catch (e) {
		console.error(e.message);

		res.status(500).json({
			success: false,
			message: 'Ocurrió un error, inténtalo de nuevo.',
			error: e.message,
		});
	}
};

exports.obtenerReservasCalendario = async function (req, res) {
	try {
		connectToDb(db); // Asegúrate de que esta función establezca la conexión a db correctamente
		const sql =
			'SELECT tte.nombre, tr.timestamp_inicio, tr.timestamp_fin FROM topos_reserva tr JOIN topos_tipo_evento tte ON tr.id_tipo_evento = tte.id_tipo_evento';
		const [results, _fields] = await db.execute(sql);

		res.status(201).json({
			success: true,
			data: results,
			message: 'Reservations data fetched successfully.',
		});
	} catch (e) {
		// Enviando una respuesta de error al cliente
		res.status(500).json({
			success: false,
			message: 'An error occurred while fetching Reservations data.',
			error: e.message,
		});
	}
};

exports.obtenerReservasAdmin = async function (req, res) {
	try {
		connectToDb(db); // Asegúrate de que esta función establezca la conexión a db correctamente
		const sql =
			'SELECT tr.id_reserva, tr.estado, tr.descripcion, tte.nombre AS tipo_evento, tr.nombre_reservador, tr.apellido_reservador, tr.email_reservador, tr.telefono_reservador, tr.timestamp_inicio, tr.timestamp_fin FROM topos_reserva tr JOIN topos_tipo_evento tte ON tr.id_tipo_evento = tte.id_tipo_evento';
		const [results, _fields] = await db.execute(sql);

		res.status(201).json({
			success: true,
			data: results,
			message: 'Reservations data fetched successfully.',
		});
	} catch (e) {
		// Enviando una respuesta de error al cliente
		res.status(500).json({
			success: false,
			message: 'An error occurred while fetching Reservations data.',
			error: e.message,
		});
	}
};

exports.obtenerReservas = async function (req, res) {
	try {
		connectToDb(db); // Asegúrate de que esta función establezca la conexión a db correctamente
		const sql =
			'SELECT tte.nombre, tr.timestamp_inicio, tr.timestamp_fin FROM topos_reserva tr JOIN topos_tipo_evento tte ON tr.id_tipo_evento = tte.id_tipo_evento';
		const [results, _fields] = await db.execute(sql);

		res.status(201).json({
			success: true,
			data: results,
			message: 'Reservations data fetched successfully.',
		});
	} catch (e) {
		// Enviando una respuesta de error al cliente
		res.status(500).json({
			success: false,
			message: 'An error occurred while fetching Reservations data.',
			error: e.message,
		});
	}
};

// Ruta para modificar el estado de la reserva y enviar notificación por correo
exports.modificarEstadoReserva = async function (req, res) {
	try {
		// Obtener los datos necesarios de la solicitud
		const { reservaId, nuevoEstado } = req.body;

		// Validar que el nuevo estado sea válido
		if (
			nuevoEstado !== 'confirmada' &&
			nuevoEstado !== 'cancelada' &&
			nuevoEstado !== 'rechazada'
		) {
			return res
				.status(400)
				.json({ success: false, message: 'Estado de reserva no válido.' });
		}

		// Conectar a la base de datos
		connectToDb(db);

		// Actualizar el estado de la reserva en la base de datos
		const sql = 'UPDATE topos_reserva SET estado = ? WHERE id_reserva = ?';
		const values = [nuevoEstado, reservaId];
		await db.execute(sql, values);

		// Obtener información del reservante (por ejemplo, su correo electrónico) desde la base de datos
		const [reservanteInfo, _fields] = await db.query(
			'SELECT email_reservador FROM topos_reserva WHERE id_reserva = ?',
			[reservaId]
		);
		const emailReservador = reservanteInfo[0].email_reservador;

		sendEmail(
			'derick85@ethereal.email',
			emailReservador,
			'El estado de tu reserva ha cambiado',
			`El estado de tu reserva con ID ${reservaId} ha cambiado a ${nuevoEstado}.`
		);

		// Envía una respuesta de éxito al cliente
		res.status(200).json({
			success: true,
			message: 'Estado de reserva modificado exitosamente.',
		});
	} catch (error) {
		// Si ocurre algún error, envía una respuesta de error al cliente
		console.error('Error al modificar el estado de la reserva:', error);
		res.status(500).json({
			success: false,
			message: 'Ocurrió un error al modificar el estado de la reserva.',
		});
	}
};

exports.obtenerTiposEvento = async function (req, res) {
	try {
		const sql = 'SELECT * FROM topos_tipo_evento';
		const [results, _fields] = await db.execute(sql);

		res.status(201).json({
			success: true,
			data: results,
			message: 'Tipos de eventos obtenidos exitosamente.',
		});
	} catch (err) {
		console.error(
			'Error al obtener los tipos de evento para una reserva:',
			err
		);
		res.status(500).json({
			success: false,
			message:
				'Ocurrio un error al obtener los tipos de eventos para una reserva.',
		});
	}
};


