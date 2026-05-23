import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import objectRoutes from "./routes/object.routes.js";
import authRoutes from "./routes/auth.routes.js";
import wikiRoutes from "./routes/wiki.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/objects", objectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wiki", wikiRoutes);

app.get("/", (req, res) => res.json({ message: "ARVision API running" }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));