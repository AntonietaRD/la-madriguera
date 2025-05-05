const express = require('express');
const {obtenerReservasCalendario, obtenerReservasAdmin, modificarEstadoReserva, crearSolicitudReserva, obtenerTiposEvento} = require("../controllers/reservasController");
const router = express.Router();

router.post('/crear-solicitud-reserva', crearSolicitudReserva);
router.get('/obtener-reservas-calendario', obtenerReservasCalendario);
router.get('/obtener-reservas-admin', obtenerReservasAdmin);
router.post('/modificar-estado-reserva', modificarEstadoReserva);
router.get('/obtener-tipos-evento', obtenerTiposEvento);

module.exports = router;