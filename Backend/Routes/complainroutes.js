const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { submitComplaint, getAllComplaints, updateStatus } = require("../controllers/complaintController");

router.post("/", protect, submitComplaint);
router.get("/", protect, adminOnly, getAllComplaints);
router.patch("/:id", protect, adminOnly, updateStatus);

module.exports = router;
