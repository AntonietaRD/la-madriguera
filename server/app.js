const express = require('express');
const cors = require('cors');
const ligaRoutes = require('./routes/ligaRoutes');
const statsRoutes = require('./routes/statsRoutes');
const reservasRoutes = require('./routes/reservasRoutes');
const accessRoutes = require('./routes/accessRoutes');
const downloadRoutes = require('./routes/downloadRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/ligas', ligaRoutes);
app.use('/stats', statsRoutes);
app.use('/reservas', reservasRoutes);
app.use('/access', accessRoutes);
app.use('/descargas', downloadRoutes);

module.exports = app;