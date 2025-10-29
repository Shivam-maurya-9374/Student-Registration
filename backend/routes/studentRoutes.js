import express from "express";
import multer from "multer";
import path from "path";
import { registerStudent, getStudents } from "../controllers/studentController.js";

const router = express.Router();

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post(
  "/register",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "marksheet", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "extraPdf", maxCount: 1 },
  ]),
  registerStudent
);

router.get("/all", getStudents);

export default router;
