import express from 'express';
const router = express.Router();
import { crearReporte, obtenerReportes, updateReporte, deleteReporte } from '../controllers/reporteController.js'; // Asegúrate de agregar '.js'

// Ruta para obtener todos los reportes
router.get('/', obtenerReportes);

// Ruta para crear un nuevo reporte
router.post('/', crearReporte);

// Ruta para actualizar un reporte
router.put('/:id', updateReporte); // Cambié la ruta para que no repita /reportes

// Ruta para eliminar un reporte
router.delete('/:id', deleteReporte); // Usa la función deleteReporte desde el controlador

// Exporta el router como default
export default router;
