const express = require('express');
const router = express.Router();
const Reporte = require('../models/Reporte'); // Importa el modelo de Reporte

// Ruta para obtener todos los reportes desde la base de datos
router.get('/reportes', async (req, res) => {
    try {
        const reportes = await Reporte.find(); // Consulta todos los reportes en la base de datos
        res.json(reportes); // Responde con los reportes en formato JSON
    } catch (error) {
        console.error('Error al obtener los reportes:', error);
        res.status(500).json({ error: 'Error al obtener los reportes' });
    }
});

module.exports = router;
