import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/input.css";

const Input: React.FC = () => {
  const [grade, setGrade] = useState("");
  const [country, setCountry] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input fields
    if (!grade || !country || !curriculum.trim()) {
      setErrorMessage("⚠️ Please fill in all fields before proceeding.");
      return;
    }

    setErrorMessage(""); // Clear previous errors if any

    const requestData = { grade, country, curriculum };

    try {
      const response = await fetch("http://127.0.0.1:5000/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("Received Questions:", data);

      if (data.questions && data.answers) {
        localStorage.setItem("questions", JSON.stringify(data.questions));
        localStorage.setItem("answers", JSON.stringify(data.answers));
        navigate("/question"); // Navigate to the question screen
      } else {
        console.error("Invalid data format", data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div className="input-container">
      <div className="input-form">
        <h1 className="title">Set Your Child’s Curriculum</h1>
        <p className="description">
          NUMERIA customizes your child’s learning experience. Upload curriculum to generate personalized questions.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Enter Grade Level (1-5):</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} required>
              <option value="">Select Grade</option>
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>Grade {level}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Country:</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} required>
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Enter Custom Curriculum:</label>
            <textarea value={curriculum} onChange={(e) => setCurriculum(e.target.value)} placeholder="Paste curriculum here" required />
          </div>

          {/* Display error message if any */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="submit-btn">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Input;
