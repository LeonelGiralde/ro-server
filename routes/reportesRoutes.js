import { connectToDatabase } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Función para obtener la base de datos
const getDB = async () => {
    const client = await connectToDatabase();
    return client.db('ReporteOlas'); // Cambia esto por el nombre real de tu BD
};

// Crear un reporte
export const crearReporte = async (req, res) => {
    try {
        const db = await getDB();
        const collection = db.collection('reportes'); 

        const nuevoReporte = req.body;

        // Validar datos
        if (!nuevoReporte.title || !nuevoReporte.content) {
            return res.status(400).json({ message: 'Título y contenido son requeridos' });
        }

        const result = await collection.insertOne(nuevoReporte);

        res.status(201).json({ message: 'Reporte creado con éxito', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el reporte', error });
    }
};

// Obtener todos los reportes
export const obtenerReportes = async (req, res) => {
    try {
        const db = await getDB();
        const collection = db.collection('reportes');

        const reportes = await collection.find().toArray();
        res.status(200).json(reportes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los reportes', error });
    }
};

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
};
