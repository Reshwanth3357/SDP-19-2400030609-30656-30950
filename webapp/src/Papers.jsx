// Papers.jsx
import React, { useState } from "react";
import "./Papers.css";

const Papers = () => {
  const [status, setStatus] = useState(null);

  const paper = {
    studentName: "Hemeswar Reddy",
    section: "CSE - A",
    rollNumber: "21CSE123",
    courseName: "Machine Learning"
  };

  return (
    <div className="paper-card">
      <h2>Paper Submission</h2>
      <p><strong>Student Name:</strong> {paper.studentName}</p>
      <p><strong>Section:</strong> {paper.section}</p>
      <p><strong>Roll Number:</strong> {paper.rollNumber}</p>
      <p><strong>Course Name:</strong> {paper.courseName}</p>

      <div className="actions">
        <button className="accept" onClick={() => setStatus("Accepted")}>
          Accept
        </button>
        <button className="reject" onClick={() => setStatus("Rejected")}>
          Reject
        </button>
      </div>

      {status && (
        <div className={`status ${status.toLowerCase()}`}>
          Paper has been <strong>{status}</strong>.
        </div>
      )}
    </div>
  );
};

export default Papers;
