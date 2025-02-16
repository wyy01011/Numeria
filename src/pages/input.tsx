import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/input.css";

const Input: React.FC = () => {
  const [grade, setGrade] = useState("");
  const [country, setCountry] = useState("");
  const [curriculum, setCurriculum] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ grade, country, curriculum });
    // Handle form submission logic here
  };

  return (
    <div className="input-container">
      <div className="input-form">
        <h1 className="title">Set Your Child’s Curriculum</h1>
        <p className="description">
          NUMERIA equips and encourages parents to customize their child’s
          learning experience. By uploading curriculum, your child will be able
          to practice tailored lessons personalized to their learning needs and
          goals.
        </p>

        <form onSubmit={handleSubmit} className="form">
          {/* Grade Level */}
          <div className="form-group">
            <label>Enter Grade Level (1-5):</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              <option value="">Select Your Child’s Grade</option>
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  Grade {level}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div className="form-group">
            <label>Select Country:</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select Your Country of Residence</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Custom Curriculum */}
          <div className="form-group">
            <label>Enter Custom Curriculum:</label>
            <textarea
              value={curriculum}
              onChange={(e) => setCurriculum(e.target.value)}
              placeholder="Type or Copy and Paste Curriculum Here"
              required
            />
          </div>

          {/* Submit Button */}
          <span className = "submitBtnContainer">
            <Link to = "/avatar">
          <button type="submit" className="submit-btn">
            SUBMIT
          </button></Link></span>
        </form>
      </div>
    </div>
  );
};

export default Input;
