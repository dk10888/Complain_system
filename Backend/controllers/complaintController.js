const Complaint = require("../models/Complaint");

// Submit complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { date, subject, issue } = req.body;
    const complaint = await Complaint.create({
      date,
      subject,
      issue,
      createdBy: req.user.id,
    });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit complaint", error: err.message });
  }
};

// Get all complaints (admin)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("createdBy", "username email");
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints", error: err.message });
  }
};

// Update complaint status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;
    await complaint.save();

    res.json({ message: "Complaint updated", complaint });
  } catch (err) {
    res.status(500).json({ message: "Failed to update complaint", error: err.message });
  }
};
