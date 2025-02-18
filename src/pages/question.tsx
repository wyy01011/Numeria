import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/question.css";

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grade: "3",
        country: "USA",
        curriculum: "Basic Math Concepts",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received API response:", data);
        if (data.questions && data.answers) {
          setQuestions(data.questions);
          setAnswers(data.answers);
        } else {
          console.error("No questions received:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  const toggleSound = () => {
    if (!isMuted) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    audioRef.current = new Audio("/paper-planes-chill-future-beat-283956.mp3");
    audioRef.current.loop = true;
  }, []);

  const handleSubmit = async () => {
    if (questions.length === 0) {
      alert("No question available. Please try again.");
      return;
    }

    const response = await fetch("https://numeria-7m4h.onrender.com", {
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
        {loading ? (
          <p className="question-text">Loading question...</p>
        ) : questions.length > 0 ? (
          <p className="question-text">{questions[currentIndex]}</p>
        ) : (
          <div>
            <p className="question-text">No questions available.</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Retry
            </button>
          </div>
        )}
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
