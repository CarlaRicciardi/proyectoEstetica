const  mongoose = require("mongoose");

const appointmentNailsSchema = new mongoose.Schema(
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
    subservice:{type: String, enum: ["semipermanente", "kapping", "esculpidas"], required: true},
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

module.exports = mongoose.model("appointmentNails", appointmentNailsSchema);