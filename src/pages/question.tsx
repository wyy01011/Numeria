import React, { useState, useEffect, useRef } from "react";
import "../styles/question.css"; // Import CSS
import { Link } from "react-router-dom";

const Question: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    audioRef.current = new Audio("/paper-planes-chill-future-beat-283956.mp3"); // Ensure correct path
    audioRef.current.loop = true; // Loop the audio for background effect
  }, []);

  return (
    <div className="question-container1">
        <Link to ="/"><img src = "images/setting.png" alt="setting" className="settingButton"></img></Link>

      {/* Sound Button with Image */}
      <button className="sound-button" onClick={toggleSound}>
        <img
          src={isMuted ? "/images/sound-off.png" : "/images/sound-on.png"}
          alt={isMuted ? "Muted" : "Unmuted"}
          className="sound-icon"
        />
      </button>

      {/* Audio Element (Hidden) */}
      <audio ref={audioRef} src="/paper-planes-chill-future-beat-283956.mp3" />

      {/* Question Box */}
      <div className="question-upper">
        <h2 className="question-title">Question:</h2>
        <p className="question-text">
          A triangle has sides of 5 cm, 5 cm, and 6 cm. What type of triangle is it?
        </p>
      </div>

      {/* Answer Section */}
      <div className="question-lower">
        <input type="text" placeholder="Type your answer here..." className="answer-input" />
        <Link to = "/reward"><button className="submit-button">Submit</button></Link>
      </div>

      {/* Character Image */}
      <img src="/images/eagle4.png" alt="Eagle" className="eagle-character" />
    </div>
  );
};

export default Question;
