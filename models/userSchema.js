const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, default: "user", required: true },
  //appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

const User = mongoose.model("users", UserSchema);
module.exports =  User;