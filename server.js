import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import reportesRouter from './routes/reportes.js';

dotenv.config();

const app = express();

// Configuración de CORS (permitiendo solo el frontend en Vercel)
const corsOptions = {
    origin: "https://ro-client-gamma.vercel.app", // Solo permite solicitudes desde el frontend
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ Error: MONGO_URI no está definida en .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/reportes', reportesRouter);

// Configuración del puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
