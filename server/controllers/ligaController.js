const connectToDb = require("../connectDb");
const db = require("../utils/database");
const isNumberTeamsValid = require("../utils/isNumberTeamsValid/isNumberTeamsValid");
const matchmaking = require("../matchmaking/matchmaking");
const generateToken = require("../utils/generateToken/generateToken");
const {sendRegistrationEmail} = require("../utils/sendEmail/sendEmail");
const {minPlayers} = require("../config")

/**
 * Obtiene de manera asíncrona datos de ligas desde la base de datos y los devuelve en una respuesta JSON.
 * @async
 * @function obtenerInfoLigas
 * @param {Object} req - El objeto de solicitud del cliente.
 * @param {Object} res - El objeto de respuesta para enviar datos al cliente.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando la respuesta es enviada.
 * @throws {Error} - Lanza un error si la consulta a la base de datos falla.
 */
exports.obtenerInfoLigas = async function (req, res) {
	try {
		connectToDb(db);
		const sql = 'SELECT tl.id_liga, tl.nombre, tl.descripcion, tc.genero, tm.tipo FROM topos_liga tl JOIN topos_categoria tc ON tl.categoria = tc.id_categoria JOIN topos_modalidad tm ON tl.modalidad = tm.id_modalidad';
		const [results, _fields] = await db.execute(sql);

		res.status(200).json({
			success: true,
			data: results,
			message: 'League data fetched successfully.',
		});

	} catch (e) {
		// Sending an error response to the client
		res.status(500).json({
			success: false,
			message: 'An error occurred while fetching league data.',
			error: 'Error interno del servidor' // Mensaje de error genérico para el cliente
		});
	}
}

/**
 * Obtiene de manera asíncrona los equipos inscritos en un torneo desde la base de datos y los devuelve en una respuesta JSON.
 *
 * @async
 * @function obtenerEquipos
 * @param {Object} req - El objeto de solicitud del cliente.
 * @param {Object} req.query - Los parámetros de consulta de la solicitud.
 * @param {string} req.query.id - El ID del torneo para el que se desean obtener los equipos.
 * @param {Object} res - El objeto de respuesta para enviar datos al cliente.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando la respuesta es enviada.
 * @throws {Error} - Lanza un error si la consulta a la base de datos falla.
 */
exports.obtenerEquipos = async function (req, res) {
	const torneoId = req.query.id;

	try {
		// Conectar a la base de datos
		connectToDb(db);

		const sql = `
			SELECT te.id_equipo, te.nombre, til.estado_inscripcion FROM topos_equipo te JOIN topos_inscripcion_equipo_liga til ON te.id_equipo = til.id_equipo
			WHERE til.id_liga = ?
      `;

		// Ejecutar la consulta con el ID del torneo obtenido de los parámetros de consulta
		const [equiposRows, _fields] = await db.execute(sql, [torneoId]);

		// Enviar los equipos inscritos como respuesta
		res.json(equiposRows);
	} catch (error) {
		console.error('Error al obtener equipos inscritos:', error);
		res.status(500).json({message: 'Error al obtener equipos inscritos'});
	}
}

exports.obtenerJugadores = async function (req, res) {
	const {idEquipo, idLiga} = req.query;
	console.log(idEquipo, idLiga);

	try {
		const sql = `SELECT te.nombre AS nombre_equipo, tie.correo, tie.nombre AS nombre_jugador, tie.apellido, tie.edad, tie.colonia, tie.telefono, tie.como_te_enteraste FROM topos_inscripcion_equipo_liga til JOIN topos_equipo te ON te.id_equipo = til.id_equipo JOIN topos_integrantes_de_equipo tie ON til.id_equipo = tie.id_equipo WHERE til.id_liga = ? AND til.id_equipo = ?`
		const [results] = await db.execute(sql, [idLiga, idEquipo]);
		res.status(200).json({
			results: results,
		})
	} catch (e) {
		console.error('Error al obtener los jugadores:', e);
		res.status(500).json({
			message: 'Error al obtener los jugadores',
		})
	}
}

exports.matchmaking = async function (req, res) {
	const torneoId = req.query.id;

	if (!torneoId) {
		return res.status(400).json({message: 'Tournament ID is required.'});
	}

	try {
		// Obtener equipos inscritos en el torneo
		const sql = 'SELECT id_equipo FROM topos_inscripcion_equipo_torneo WHERE id_torneo = ?';
		const values = [torneoId];
		const [teams] = await db.execute(sql, values);

		// Validar que el número de equipos sea adecuado para hacer matchmaking
		if (!isNumberTeamsValid(teams.length)) {
			return res.status(402).json({message: 'Invalid number of teams for matchmaking.'});
		}

		// Preparar los ID de los equipos para el matchmaking
		const teamIds = teams.map(team => team.id_equipo);
		const matches = matchmaking(teamIds);

		// Crear partidos en base de datos
		for (const match of matches) {
			let [team_1_id, team_2_id] = match
			const sql = 'INSERT INTO topos_partido (timestamp_inicio, id_torneo, equipo_1, equipo_2) VALUES (NOW(), ?, ?, ?)'
			const values = [torneoId, team_1_id, team_2_id]
			const [_results, _fields] = await db.execute(sql, values);
		}

		// Devolver el par de equipos que jugarán un partido
		res.status(200).json({
			"success": true,
			"message": "matchmaking done correctly and matches created"
		});
	} catch (error) {
		console.error('Error during matchmaking:', error);
		res.status(500).json({message: 'Internal server error while processing matchmaking.'});
	}
}

exports.inscribirEquipo = async function (req, res) {
	const idLiga = req.query.id;
	const {nombreEquipo, numeroJugadores, correosMiembros} = req.body;

	try {
		const sql = 'INSERT INTO topos_equipo (nombre, numero_jugadores) VALUES (?, ?)'
		const [teamResult] = await db.execute(sql, [nombreEquipo, numeroJugadores]);
		const teamId = teamResult.insertId;

		const sql2 = 'INSERT INTO topos_inscripcion_equipo_liga (id_liga, id_equipo) VALUES (?, ?)'
		const [inscripcionResult] = await db.execute(sql2, [idLiga, teamId]);
		const inscripcionId = inscripcionResult.insertId;

		for (const correoMiembro of correosMiembros) {
			const token = generateToken();
			await db.query('INSERT INTO topos_tokens_registro (email, token, id_inscripcion) VALUES (?, ?, ?)', [correoMiembro, token, inscripcionId]);
			sendRegistrationEmail(correoMiembro, token, inscripcionId, teamId);
		}

		res.status(201).send({
			success: true,
			id: inscripcionId,
			message: "Equipo registrado correctamente"
		});
	} catch (e) {
		console.error('Error al registrar el equipo:', e);
		res.status(500).send('Error al registrar el equipo');
	}
}

exports.inscribirJugador = async function (req, res) {
	const {
		correo,
		nombre,
		apellido,
		edad,
		colonia,
		telefono,
		como_te_enteraste,
		inscripcionId,
		equipoId,
		token
	} = req.body;

	try {
		// Validar token
		const [rows] = await db.query('SELECT * FROM topos_tokens_registro WHERE email = ? AND token = ? AND id_inscripcion = ?', [correo, token, inscripcionId]);
		if (rows.length === 0) {
			return res.status(400).json({error: 'Token inválido o expirado'});
		}

		// Eliminar el token después de la validación
		await db.query('DELETE FROM topos_tokens_registro WHERE email = ? AND token = ? AND id_inscripcion = ?', [correo, token, inscripcionId]);

		// Insertar el miembro del equipo en la base de datos
		const sql = 'INSERT INTO topos_integrantes_de_equipo (correo, nombre, apellido, edad, colonia, telefono, como_te_enteraste, id_equipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
		const values = [correo, nombre, apellido, edad, colonia, telefono, como_te_enteraste, equipoId];
		const [results] = await db.query(sql, values);

		// Revisar si la cantidad de jugadores ya inscritos es por lo menos el minimo de jugadores por equipo
		const sql2 = 'SELECT COUNT(tie.id_integrante) AS player_count FROM topos_equipo te JOIN topos_integrantes_de_equipo tie ON te.id_equipo = tie.id_equipo WHERE te.id_equipo = ?'
		const [{playerCount}] = await db.query(sql2, [equipoId]);

		// Actualizar estado de inscripcion a 'completa'
		if (playerCount >= minPlayers) {
			await db.query('UPDATE topos_inscripcion_equipo_liga SET estado_inscripcion = \'completa\' WHERE id_inscripcion = ?', [inscripcionId]);
		}

		res.status(201).json({
			success: true,
			id: results.insertId,
			message: "Jugador registrado correctamente"
		});
	} catch (e) {
		console.error('Error al registrar el miembro del equipo:', e);
		res.status(500).json({error: 'Internal server error'});
	}
};

exports.cancelarInscripcionEquipo = async function (req, res) {
	const {id} = req.body


	try {
		const sql = `UPDATE topos_inscripcion_equipo_liga SET estado_inscripcion = 'cancelada' WHERE id_inscripcion = ? `;
		const [results] = await db.query(sql, [id]);

		res.status(201).json({
			success: true,
			message: 'Inscripcion cancelada con exito'
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Error al cancelar inscripcion'
		})
	}
}

exports.cancelarInscripcionIndividual = async function (req, res) {
	const {id} = req.body

	try {
		const sql = `DELETE FROM topos_integrantes_de_equipo WHERE id_integrante = ? `;
		await db.query(sql, [id]);

		res.status(201).json({
			success: true,
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({error: 'Internal server error'});
	}
}

exports.obtenerPartidos = async function (req, res) {
	const ligaId = req.query.id;

	try {
		const sql = 'SELECT e1.nombre AS equipo_1, e2.nombre AS equipo_2, r.goles_equipo_1, r.goles_equipo_2, p.timestamp_inicio FROM topos_partido p JOIN topos_partido_resultado r ON p.id_partido = r.id_partido JOIN topos_equipo e1 ON p.equipo_1 = e1.id_equipo JOIN topos_equipo e2 ON p.equipo_2 = e2.id_equipo WHERE p.id_liga = ?'
		const [results] = await db.query(sql, [ligaId]);

		res.status(201).json({
			partidos: results
		})
	} catch (err) {
		console.error(err);
		res.status(500).json({error: 'Internal server error'});
	}
}

exports.hayEquipoConMismoNombre = async function (req, res) {
	const { nombreEquipo, idLiga } = req.body;

	if (!nombreEquipo || !idLiga) {
		return res.status(400).json({ error: 'Missing required body parameters: nombreEquipo and idLiga' });
	}

	try {
		const sql = `
			SELECT te.nombre 
			FROM topos_equipo te 
			JOIN topos_inscripcion_equipo_liga til ON te.id_equipo = til.id_equipo 
			WHERE til.id_liga = ? AND te.nombre = ?`;
		const [results] = await db.query(sql, [idLiga, nombreEquipo]);

		const hayEquipoConMismoNombre = results.length > 0;

		res.status(200).json({ hayEquipoConMismoNombre });
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: 'Internal server error' });
	}
};
