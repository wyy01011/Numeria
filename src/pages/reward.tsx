import React, { useState, useEffect } from "react";
import "../styles/reward.css";
import Last from "./last.tsx";

const Reward: React.FC = () => {
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    // Transition to Last.tsx after 3 seconds
    const timeout = setTimeout(() => {
      setTransition(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return transition ? (
    <Last /> // Switch to Last.tsx after 3 seconds
  ) : (
    <div className="reward-container fade-in">
      <h1 className="reward-title">🎉 Woohoo! 🎉</h1>
      <p className="reward-message">You got a delicious poutine! 🍟🧀</p>
      <img src="/images/poutine.png" alt="Poutine" className="poutine-image" />
    </div>
  );
};

export default Reward;
