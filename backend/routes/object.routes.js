import express from "express";
import Object from "../models/object.model.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const objects = await Object.find({ isActive: true });
    res.json(objects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", protect, async (req, res) => {
  try {
    const objects = await Object.find();
    res.json(objects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const obj = await Object.findById(req.params.id);
    if (!obj) return res.status(404).json({ message: "Object not found" });
    res.json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/label/:cocoLabel", async (req, res) => {
  try {
    const obj = await Object.findOne({ cocoLabel: req.params.cocoLabel, isActive: true });
    if (!obj) return res.status(404).json({ message: "Not found" });
    res.json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const obj = await Object.create(req.body);
    res.status(201).json(obj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const obj = await Object.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!obj) return res.status(404).json({ message: "Object not found" });
    res.json(obj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const obj = await Object.findByIdAndDelete(req.params.id);
    if (!obj) return res.status(404).json({ message: "Object not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;