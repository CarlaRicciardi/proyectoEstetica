const mongoose = require("mongoose");


const StaffSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, default: "staff" },
  photo: { type: String },
  service: { type: String },   // ver de que tome el  o nombre del servicio en la colección Service, de la forma type: mongoose.Types.ObjectId,
  bio: { type: String, maxLength: 150 },
  //timeSlots: { type: Array },
  //appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

const Staff = mongoose.model("staff", StaffSchema);
module.exports =  Staff;