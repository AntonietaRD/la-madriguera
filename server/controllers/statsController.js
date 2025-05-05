const connectToDb = require("../connectDb");
const db = require("../utils/database");

exports.obtenerTablaLiga = async function(req, res) {
	const { id_liga } = req.query

	try {
		const sql = 'SELECT equipo_nombre, JJ, PG, PP, PE, GF, GC, DF, PTS FROM stats_liga WHERE id_liga = ?';
		const [results] = await db.query(sql, [id_liga]);

		res.status(200).json({
			success: true,
			results: results
		})
	} catch (e) {
		console.error('Error al solicitar las estadisticas de la tabla de liga:', e);
		res.status(500).json({
			success: false,
			error: e.message
		})
	}
}

exports.registrarResultadoPartido = async function(req, res) {
	const { id_torneo, equipo_1, equipo_2, goles_equipo_1, goles_equipo_2 } = req.body;

	try {
		connectToDb(db); // Asumiendo que esta función establece la conexión 'db'

		// Insertar el partido
		const sqlPartido = 'INSERT INTO topos_partido (id_liga, equipo_1, equipo_2) VALUES (?, ?, ?)';
		const valuesPartido = [id_torneo, equipo_1, equipo_2];
		const [partidoResult] = await db.execute(sqlPartido, valuesPartido);
		const id_partido = partidoResult.insertId; // Obtener el ID del partido insertado

		// Insertar el resultado del partido
		const sqlResultado = 'INSERT INTO topos_partido_resultado (id_partido, goles_equipo_1, goles_equipo_2) VALUES (?, ?, ?)';
		const valuesResultado = [id_partido, goles_equipo_1, goles_equipo_2];
		await db.execute(sqlResultado, valuesResultado);

		// Enviar respuesta de éxito
		res.status(201).json({
			success: true,
			message: 'Resultado del partido registrado con éxito.',
		});
	} catch (error) {
		console.error('Error al registrar el partido y resultado:', error);
		res.status(500).json({
			success: false,
			message: 'Ocurrió un error al registrar el resultado del partido.',
			error: error.message
		});
	}
}