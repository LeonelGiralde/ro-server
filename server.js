const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors()); // Permite solicitudes desde cualquier dominio

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

// Importar rutas
const reportesRoutes = require('./routes/reportesRoutes');
app.use('/api/reportes', reportesRoutes);

// Iniciar el servidor solo si no está en un entorno de servidor sin servidor (como Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

  // Configuración para evitar que Vercel cierre la conexión antes de tiempo
  server.keepAliveTimeout = 120 * 1000;
  server.headersTimeout = 125 * 1000;
}

// Exportar app para que Vercel lo reconozca
module.exports = app;
