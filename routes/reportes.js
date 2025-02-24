import express from 'express';
const router = express.Router();
const { crearReporte, obtenerReportes, updateReporte, deleteReporte } = import('../controllers/reporteController');

// Ruta para obtener todos los reportes
router.get('/', obtenerReportes);

// Ruta para crear un nuevo reporte
router.post('/', crearReporte);

router.put('/:id', updateReporte); // Cambié la ruta para que no repita /reportes

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReporte = await Reporte.findByIdAndDelete(id);
        if (!deletedReporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        res.json({ message: 'Reporte eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el reporte', error });
    }
});

// Exporta el router como default
export default router;

