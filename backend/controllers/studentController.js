import Student from "../models/Student.js";

export const registerStudent = async (req, res) => {
  try {
    const { name, email, course, phone, address } = req.body;

    const profileImage = req.files["profileImage"]
      ? req.files["profileImage"][0].path
      : null;
    const marksheet = req.files["marksheet"]
      ? req.files["marksheet"][0].path
      : null;
    const video = req.files["video"]
      ? req.files["video"][0].path
      : null;
    const extraPdf = req.files["extraPdf"]
      ? req.files["extraPdf"][0].path
      : null;

    const newStudent = new Student({
      name,
      email,
      course,
      phone,
      address,
      profileImage,
      marksheet,
      video,
      extraPdf,
    });

    await newStudent.save();
    res.status(201).json({ message: "✅ Student Registered with Files!", newStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
