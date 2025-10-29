import React, { useState } from "react";
import axios from "axios";
import "./StudentForm.css";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    address: "",
  });

  const [files, setFiles] = useState({
    profileImage: null,
    marksheet: null,
    video: null,
    extraPdf: null,
  });

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);

  // ✅ Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file uploads
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiles({ ...files, [e.target.name]: file });

    // 🎥 Image/Video preview
    if (file && e.target.name === "profileImage") {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    Object.entries(files).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/api/students/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      alert(res.data.message);
      setFormData({ name: "", email: "", course: "", phone: "", address: "" });
      setFiles({ profileImage: null, marksheet: null, video: null, extraPdf: null });
      setPreview(null);
      setProgress(0);
    } catch (err) {
      alert("❌ Error uploading student data");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">🎓 Student Registration</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="animated-form">
        {/* Preview */}
        {preview && <img src={preview} alt="Preview" className="preview" />}

        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} required />
        <input type="text" name="course" placeholder="Course Name" onChange={handleChange} value={formData.course} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} />
        <input type="text" name="address" placeholder="Full Address" onChange={handleChange} value={formData.address} />

        <label>📷 Profile Image</label>
        <input type="file" name="profileImage" accept="image/*" onChange={handleFileChange} />

        <label>🧾 Marksheet</label>
        <input type="file" name="marksheet" accept=".pdf,image/*" onChange={handleFileChange} />

        <label>🎥 Upload Video</label>
        <input type="file" name="video" accept="video/*" onChange={handleFileChange} />

        <label>📚 Extra PDF</label>
        <input type="file" name="extraPdf" accept=".pdf" onChange={handleFileChange} />

        {/* Upload Progress Bar */}
        {uploading && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
            <span>{progress}%</span>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
