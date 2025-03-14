import { connectToDatabase } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Función para obtener la base de datos
const getDB = async () => {
    const client = await connectToDatabase();
    return client.db('ReporteOlas'); // Cambia esto por el nombre real de tu BD
};

// Obtener todos los reportes
async function obtenerReportes() {
    const conexion = await fetch("https://ro-server-55omirja4-leonels-projects-bc6284c9.vercel.app/api/reportes")
    const conexionConvertida = conexion.json();

    return conexionConvertida
}
// Crear un reporte
{/*async function crearReporte(reportes) {
    const conexion = await fetch("https://ro-server-55omirja4-leonels-projects-bc6284c9.vercel.app/api/reportes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ubicacion: { type: String, required: true },
            noReporte: { type: Boolean, default: false },
            mareaAlta: { type: String, default: null },
            mareaBaja: { type: String, default: null },
            puntuacion: { type: Number, default: null },
            tempMax: { type: Number, default: null },
            tempMin: { type: Number, default: null },
            clima: { type: String, default: null },
            tempMar: { type: Number, default: null },
            dirViento: { type: String, default: null },
            velocidadViento: { type: String, default: null },
            dirSwell: { type: String, default: null },
            olaPeriodo: { type: String, default: null },
            descripcion: { type: String, default: null },

        })
    });
    const conexionConvertida = conexion.json();
    return conexionConvertida;
}
*/}

/*
// Actualizar un reporte
export const updateReporte = async (req, res) => {
    try {
        const db = await getDB();
        const collection = db.collection('reportes');

        const { id } = req.params;
        const updateData = req.body;

        // Validar datos
        if (!updateData.title && !updateData.content) {
            return res.status(400).json({ message: 'Se requiere al menos un campo para actualizar' });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.status(200).json({ message: 'Reporte actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el reporte', error });
    }
};

// Eliminar un reporte
export const deleteReporte = async (req, res) => {
    try {
        const db = await getDB();
        const collection = db.collection('reportes');

        const { id } = req.params;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.status(200).json({ message: 'Reporte eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el reporte', error });
    }
};*/
