import React, { useState, useEffect, useRef } from "react";
import "../styles/last.css"; // Import CSS
import { Link } from "react-router-dom";

const Last: React.FC = () => {
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
    <div className="question-container">
      {/* Setting Button */}
      <Link to="/">
        <img src="images/setting.png" alt="setting" className="settingButton" />
      </Link>

      {/* Sound Button */}
      <button className="sound-button" onClick={toggleSound}>
        <img
          src={isMuted ? "/images/sound-off.png" : "/images/sound-on.png"}
          alt={isMuted ? "Muted" : "Unmuted"}
          className="sound-icon"
        />
      </button>

      {/* Background Audio */}
      <audio ref={audioRef} src="/paper-planes-chill-future-beat-283956.mp3" />

      {/* Container for Island & Text */}
      <div className="island-container">
        {/* Image of Completed Island */}
        <img
          className="completedImg"
          src="/images/Islands_Completed_Quest.png"
          alt="Island Completed"
        />

        {/* Message Container */}
        <div className="messageContainer">
          <p>Great work, today! Come back tomorrow to unlock treasure on <span className="bolding">Data Island</span></p>
          
        </div>
      </div>
    </div>
  );
};

export default Last;
