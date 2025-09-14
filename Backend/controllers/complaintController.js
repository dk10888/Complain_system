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

// Get all complaints (admin only)
exports.getAllComplaints = async (req, res) => {
  console.log("Admin fetching complaints...");
  try {
    const complaints = await Complaint.find()
      .populate({ path: "createdBy", select: "username email", strictPopulate: false })
      .lean();

    const safeComplaints = complaints.map(c => ({
      ...c,
      createdBy: c.createdBy || { username: "Deleted User", email: "-" },
    }));

    console.log("Complaints fetched:", safeComplaints);
    res.json(safeComplaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ message: "Failed to fetch complaints", error: err.message });
  }
};






// Get complaints of logged-in user
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your complaints", error: err.message });
  }
};

// Update complaint status (admin only)
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
