const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  subject: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Complaint", complaintSchema);
