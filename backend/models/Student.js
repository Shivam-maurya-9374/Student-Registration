import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  phone: String,
  address: String,
  profileImage: String,
  marksheet: String,
  video: String,
  extraPdf: String,
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
