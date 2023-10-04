//lifting, extensión de pestañas

const  mongoose = require("mongoose");

const appointmentEyeLashesSchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subservice:{type: String, enum: ["lifting", "extensión de pestañas"], required: true},
    appointmentDate: {
      type: Date,
      required: true,
    },
    price: { type: Number, required: true },
    paymentMethod: {
      type: String, enum: ["efectivo", "transferencia", "débito", "crédito"], required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointmentEyeLashes", appointmentEyeLashesSchema);