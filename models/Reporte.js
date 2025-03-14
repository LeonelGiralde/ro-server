const mongoose = require('mongoose');

const ReporteSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },  // Cambiado a Date para mejor manejo de fechas
    reportes: [{
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
    }]
});

module.exports = mongoose.model('Reporte', ReporteSchema);
