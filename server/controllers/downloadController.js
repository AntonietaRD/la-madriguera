const db = require("../utils/database");
const {createObjectCsvWriter} = require('csv-writer');
const fs = require("fs");
const path = require("path");
const writeAndSendCsv = require("../utils/writeAndSendCsv/writeAndSendCsv");

exports.downloadEquiposDetalles = async (req, res) => {
	const [results] = await db.query('SELECT * FROM view_detalles_equipos');

	writeAndSendCsv(results, res, 'datos_equipos.csv');
}

exports.downloadJugadoresDetalles = async (req, res) => {
	const [results] = await db.query('SELECT * FROM view_detalles_jugadores');

	writeAndSendCsv(results, res, 'datos_jugadores.csv');
}

exports.downloadReservas = async (req, res) => {
	const [results] = await db.query('SELECT * FROM reservas_csv');

	writeAndSendCsv(results, res, 'datos_reservas.csv');
}

exports.downloadTablaLiga = async (req, res) => {
	const [results] = await db.query('SELECT * FROM stats_liga');

	writeAndSendCsv(results, res, 'datos_tabla_liga.csv');
}