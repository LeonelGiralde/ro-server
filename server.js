const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware para depuración de CORS
app.use((req, _res, next) => {
  console.log(`Solicitud recibida desde: ${req.headers.origin || 'Directa (sin navegador)'}`);
  next();
});

// Configurar CORS para permitir el acceso desde el cliente
app.use(cors({
  origin: 'https://ro-client.vercel.app', // Permitir solo este dominio
  methods: ['GET, DELETE, POST, PUT, OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
}));

// Middleware para parsear JSON
app.use(express.json());

// Maneja la solicitud OPTIONS (Preflight)
app.options('*', cors());  // Responde a todas las solicitudes OPTIONS


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
