import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import path from "path";

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Serve uploaded files

app.use("/api/students", studentRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
