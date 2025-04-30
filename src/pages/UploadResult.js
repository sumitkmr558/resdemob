import React, { useState } from "react";
import API from "../api/api";

function UploadResult() {
  const [formData, setFormData] = useState({
    student_id: "",
    semester: "",
    batch_year: "",
    GPA: "",
    CGPA: "",
    result_status: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/result/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Result uploaded successfully!");
      setFormData({
        student_id: "",
        semester: "",
        batch_year: "",
        GPA: "",
        CGPA: "",
        result_status: "",
      });
    } catch (err) {
      alert("Failed to upload result!");
    }
  };

  return (
    <div>
      <h2>Upload Student Result</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="student_id"
          placeholder="Student ID"
          value={formData.student_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
        />
        <input
          type="text"
          name="batch_year"
          placeholder="Batch Year"
          value={formData.batch_year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="GPA"
          placeholder="GPA"
          value={formData.GPA}
          onChange={handleChange}
        />
        <input
          type="text"
          name="CGPA"
          placeholder="CGPA"
          value={formData.CGPA}
          onChange={handleChange}
        />
        <input
          type="text"
          name="result_status"
          placeholder="Result Status (Pass/Fail)"
          value={formData.result_status}
          onChange={handleChange}
        />
        <button type="submit">Upload Result</button>
      </form>
    </div>
  );
}

export default UploadResult;
