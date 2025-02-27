const mongoose = require('mongoose');


const ReporteSchema = new mongoose.Schema({
    fecha: { type: String, required: true },
    reportes: [{
        ubicacion: { type: String, required: true },
        noReporte: { type: Boolean, default: false },
        mareaAlta: String,
        mareaBaja: String,
        puntuacion: Number,
        tempMax: Number,
        tempMin: Number,
        clima: String,
        tempMar: Number,
        dirViento: String,
        velocidadViento: String,
        dirSwell: String,
        olaPeriodo: String,
        descripcion: String,
    }]
});

module.exports = mongoose.model('Reporte', ReporteSchema);
