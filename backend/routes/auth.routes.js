import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });
    const admin = await Admin.create({ username, email, password });
    res.status(201).json({ token: generateToken(admin._id), username: admin.username });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ token: generateToken(admin._id), username: admin.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/me", protect, (req, res) => {
  res.json({ username: req.admin.username, email: req.admin.email });
});

export default router;