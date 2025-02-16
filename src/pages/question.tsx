import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/question.css";

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grade: "3", // Example grade (Replace dynamically)
        country: "USA",
        curriculum: "Basic Math Concepts",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received API response:", data); // ✅ Log entire API response
        if (data.questions && data.answers) {
          setQuestions(data.questions);
          setAnswers(data.answers);
          console.log("Questions received:", data.questions); // ✅ Log only questions
        } else {
          console.error("No questions received:", data);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);
  

  // Toggle Sound Function
  const toggleSound = () => {
    if (!isMuted) {
      audioRef.current?.pause(); // Mute sound
    } else {
      audioRef.current?.play(); // Unmute and play sound
    }
    setIsMuted(!isMuted);
  };

  // Effect to Load Audio
  useEffect(() => {
    audioRef.current = new Audio("/paper-planes-chill-future-beat-283956.mp3");
    audioRef.current.loop = true;
  }, []);

  // Handle Answer Submission
  const handleSubmit = async () => {
    const response = await fetch("http://127.0.0.1:5000/check-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: questions[currentIndex], userAnswer }),
    });

    const data = await response.json();

    if (data.correct) {
      alert("Correct!");
      setCorrectCount(correctCount + 1);

      if (correctCount + 1 === 4) {
        alert("Level up!");
        setCorrectCount(0);
      }

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer("");
      } else {
        navigate("/reward");
      }
    } else {
      alert(`${data.explanation} Wrong! Try again.`);
    }
  };

  return (
    <div className="question-container1">
      <button className="sound-button" onClick={toggleSound}>
        <img
          src={isMuted ? "/images/sound-off.png" : "/images/sound-on.png"}
          alt={isMuted ? "Muted" : "Unmuted"}
          className="sound-icon"
        />
      </button>

      <audio ref={audioRef} src="/paper-planes-chill-future-beat-283956.mp3" />

      <div className="question-upper">
        <h2 className="question-title">Question:</h2>
        <p className="question-text">
          {questions.length > 0 ? questions[currentIndex] : "Loading question..."}
        </p>
      </div>

      <div className="question-lower">
        <input
          type="text"
          placeholder="Type your answer here..."
          className="answer-input"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>

      <img src="/images/eagle.png" alt="Eagle Character" className="eagle-character" />
      <img src="/images/setting.png" alt="Settings" className="settingButton" />
    </div>
  );
};

export default Question;
