const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  reportes: [
    {
      ubicacion: { type: String, required: true },
      mareaAlta: { horario: String, medida: Number },
      mareaBaja: { horario: String, medida: Number },
      puntacion: Number,
      tempMax: Number,
      tempMin: Number,
      clima: String,
      tempMar: Number,
      dirViento: String,
      velocidadViento: Number,
      dirSwell: String,
      olaPeriodo: { altura: Number, segundos: Number },
      descripcion: String,
      noReporte: { type: Boolean, default: false }, // Campo para N/R
    },
  ],
});

const Reporte = mongoose.model('Reporte', reporteSchema);

module.exports = Reporte;
