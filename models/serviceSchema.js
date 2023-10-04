const  mongoose = require("mongoose");
const staffSchema = require("./staffSchema.js")

const subserviceSchema =new mongoose.Schema(
    {
        name: { type: String},
        price: { type: Number, required: true },
    }
)

const serviceSchema = new mongoose.Schema(
  {
    staff: [staffSchema], //array de todo el staff que realiza este serivicio
    subservices: [subserviceSchema], //array de subservicios con name y price
  },
  { timestamps: true }
);

//usos de este esquema:
//agregar o quitar empleados que realicen este servicio
//agregar o quitar subservicios
//modificar precio de subservicios
//acceso es solo para admin

module.exports = mongoose.model("Service", serviceSchema);