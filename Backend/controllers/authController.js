const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { username, email, password, adminKey } = req.body;

    // check duplicate
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // check admin role
    const isAdmin = adminKey === process.env.ADMIN_KEY;


    // create user
    const user = await User.create({
      username,
      email,
      password: password, 
      isAdmin,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Signup failed:", err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// LOGIN - No changes needed, this part was correct
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Login failed: user not found for email:", email);
      return res.status(400).json({ message: "Invalid email" });
    }

    //console.log("Request password:", password);
    //console.log("Stored hash:", user.password);

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      console.log("Login failed: password mismatch");
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    //console.log("Login successful for:", email);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Login failed:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};