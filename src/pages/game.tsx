import React, { useState } from "react";
import "../styles/global.css";

const Game = () => {
  const [question, setQuestion] = useState("What is 5 + 3?");
  const [answer, setAnswer] = useState("");

  const checkAnswer = () => {
    console.log("Checking:", answer);
  };

  return (
    <div className="container">
      <h2>🦸 Math Hero - Save the City!</h2>
      <p>{question}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={checkAnswer}>Submit</button>
    </div>
  );
};

export default Game;
