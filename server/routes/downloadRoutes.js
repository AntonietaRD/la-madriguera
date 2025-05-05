const express = require('express');
const {downloadEquiposDetalles, downloadJugadoresDetalles, downloadReservas, downloadTablaLiga} = require("../controllers/downloadController");
const router = express.Router();

router.get('/descargar-detalles-equipos', downloadEquiposDetalles);
router.get('/descargar-detalles-jugadores', downloadJugadoresDetalles);
router.get('/descargar-reservas', downloadReservas);
router.get('/descargar-tabla-liga', downloadTablaLiga);

module.exports = router;