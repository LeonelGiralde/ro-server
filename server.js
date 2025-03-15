const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reportesRoutes = require('./routes/reportesRoutes'); // Importa el archivo de rutas

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', reportesRoutes); // Monta las rutas bajo el prefijo '/api'

const cors = require("cors");

app.use(cors({
    origin: "https://ro-client.vercel.app", // Permitir solicitudes solo desde el frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});



