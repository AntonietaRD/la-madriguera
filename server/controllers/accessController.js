const db = require('../utils/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
	const { nombre, apellido, email, telefono, usuario, password } = req.body;

	try {
		const hash = await bcrypt.hash(password, 10);

		const sql = 'INSERT INTO topos_usuario_administrador (nombre, apellido, email, telefono, usuario, password) VALUES (?, ?, ?, ?, ?, ?)';
		const values = [nombre, apellido, email, telefono, usuario, hash];
		await db.execute(sql, values);

		res.status(201).json({
			message: 'El usuario ha sido registrado con exito'
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Error interno del servidor'
		});
	}
}

exports.login = async function(req, res) {
	const {username, password} = req.body;

	try {
		const sql = 'SELECT id_admin, usuario, password FROM topos_usuario_administrador WHERE usuario = ?';
		const [results] = await db.query(sql, [username]);

		if (results.length === 0) {
			res.status(401).json({message: 'No se encontrado el usuario'});
		}

		const user = results[0];
		const isMatch = await bcrypt.compare(password, user.password);

		if (isMatch) {
			const token = jwt.sign({ id: user.id_admin, usuario: user.usuario }, JWT_SECRET, { expiresIn: '1h' });
			return res.json({token});
		} else {
			return res.status(401).json({message: 'Credenciales invalidas'});
		}
	} catch (e) {
		console.error(e.message);
		res.status(500).json({
			success: false,
		})
	}
}