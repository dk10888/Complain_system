const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public
router.post("/signup", signup);
router.post("/login", login);

// Example protected route
router.get("/profile", protect, (req, res) => {
  res.json({ message: "User profile", user: req.user });
});

// Example admin route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

module.exports = router;
