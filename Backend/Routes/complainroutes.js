const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  submitComplaint,
  getAllComplaints,
  getMyComplaints,
  updateStatus,
} = require("../controllers/complaintController");
console.log("reached")
// User submits complaint
router.post("/", protect, submitComplaint);

// User sees his own complaints
router.get("/my", protect, getMyComplaints);

// Admin: get all complaints
router.get("/all", protect, adminOnly, getAllComplaints);

// Admin: update complaint status
router.patch("/:id", protect, adminOnly, updateStatus);

module.exports = router;
