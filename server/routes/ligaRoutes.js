const express = require('express');
const {obtenerInfoLigas, obtenerEquipos, matchmaking, inscribirEquipo, inscribirJugador, cancelarInscripcionEquipo,
	obtenerJugadores, cancelarInscripcionIndividual, obtenerPartidos, hayEquipoConMismoNombre
} = require("../controllers/ligaController");
const router = express.Router();

router.get('/obtener-info-ligas', obtenerInfoLigas);
router.get('/obtener-equipos', obtenerEquipos);
router.get('/obtener-jugadores', obtenerJugadores);
router.get('/obtener-partidos', obtenerPartidos);
router.post('/matchmaking', matchmaking);
router.post('/inscribir-equipo', inscribirEquipo);
router.post('/inscribir-jugador', inscribirJugador);
router.post('/cancelar-inscripcion-equipo', cancelarInscripcionEquipo);
router.post('/cancelar-inscripcion-individual', cancelarInscripcionIndividual);
router.post('/hay-equipo-con-mismo-nombre', hayEquipoConMismoNombre);

module.exports = router;