const express = require("express");
const Reporte = require("../models/Reporte.js"); // Asegúrate de que este modelo está definido correctamente
const router = express.Router();

router.use(express.json());

// Crear un nuevo reporte
router.post("/", async (req, res) => {
    try {
        const { fecha, reportes } = req.body;
        const nuevoReporte = new Reporte({ fecha, reportes });
        await nuevoReporte.save();
        res.status(201).json({ message: "Reporte guardado correctamente", reporte: nuevoReporte });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el reporte" });
    }
});

// Ruta para obtener todos los reportes
router.get('/', (req, res) => {
    res.json({ message: "Aquí están los reportes" });
  });
  
  
  // Ruta para obtener un reporte específico por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Reporte con ID ${id}` });
  });



// Obtener reportes por fecha
router.get("/:fecha", async (req, res) => {
    try {
        const { fecha } = req.params;
        const reporte = await Reporte.findOne({ fecha });

        if (!reporte) {
            return res.status(404).json({ message: "No hay reportes para esta fecha" });
        }

        res.json(reporte);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el reporte" });
    }
});

// Actualizar un reporte por fecha
router.put("/:fecha", async (req, res) => {
    try {
        const { fecha } = req.params;
        const { reportes } = req.body;

        const reporteActualizado = await Reporte.findOneAndUpdate(
            { fecha },
            { reportes },
            { new: true }
        );

        if (!reporteActualizado) {
            return res.status(404).json({ error: "Reporte no encontrado" });
        }

        res.json(reporteActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el reporte" });
    }
});

// Eliminar un reporte por fecha
router.delete("/:fecha", async (req, res) => {
    try {
        const { fecha } = req.params;
        const reporteEliminado = await Reporte.findOneAndDelete({ fecha });

        if (!reporteEliminado) {
            return res.status(404).json({ error: "Reporte no encontrado" });
        }

        res.json({ message: "Reporte eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el reporte" });
    }
});

module.exports = router;
