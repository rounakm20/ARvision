import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  order:       { type: Number, required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
});

const objectSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, unique: true },
    emoji:       { type: String, default: "📦" },
    category:    { type: String, required: true },
    description: { type: String, required: true },
    usage:       { type: String, required: true },
    tags:        [String],
    steps:       [stepSchema],
    cocoLabel:   { type: String, required: true },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Object", objectSchema);