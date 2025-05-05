const express = require('express');
const {obtenerTablaLiga, registrarResultadoPartido} = require("../controllers/statsController");
const router = express.Router();

router.get('/obtener-tabla-liga', obtenerTablaLiga);
router.post('/registrar-resultado', registrarResultadoPartido);

module.exports = router;