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
    const storedQuestions = localStorage.getItem("questions");
    const storedAnswers = localStorage.getItem("answers");

    if (storedQuestions && storedAnswers) {
      setQuestions(JSON.parse(storedQuestions));
      setAnswers(JSON.parse(storedAnswers));
    }

    audioRef.current = new Audio("/paper-planes-chill-future-beat-283956.mp3");
    audioRef.current.loop = true;
    if (!isMuted) audioRef.current.play();
  }, []);

  const toggleSound = () => {
    if (!isMuted) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsMuted(!isMuted);
  };

  const fetchAnswer = async (question: string, userAnswer: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, userAnswer })
      });
      const data = await response.json();
      return data.correct;
    } catch (error) {
      console.error("Error fetching answer validation:", error);
      return false;
    }
  };

  const handleSubmit = async () => {
    const isCorrect = await fetchAnswer(questions[currentIndex], userAnswer);
    if (isCorrect) {
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
      alert("Wrong! Try again.");
    }
  };

  return (
    <div className="question-container1">
      <button className="sound-button" onClick={toggleSound}>
        <img src={isMuted ? "/images/sound-off.png" : "/images/sound-on.png"} alt="Sound" />
      </button>
      <audio ref={audioRef} src="/paper-planes-chill-future-beat-283956.mp3" />

      <div className="question-upper">
        <h2 className="question-title">Question:</h2>
        <p className="question-text">{questions[currentIndex]}</p>
      </div>

      <div className="question-lower">
        <input 
          type="text" 
          value={userAnswer} 
          onChange={(e) => setUserAnswer(e.target.value)} 
          placeholder="Type your answer here..." 
          className="answer-input"
        />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>

      <img src="/images/eagle.png" alt="Eagle Character" className="eagle-character" />
      <img src="/images/setting.png" alt="Settings" className="settingButton" />
    </div>
  );
};

export default Question;
