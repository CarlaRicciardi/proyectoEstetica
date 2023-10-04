const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, default: "user" },
  //appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

module.exports =  mongoose.model("User", UserSchema);