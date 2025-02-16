import React, { useState, useEffect, useRef } from "react";
import "../styles/readySet.css"; // Import CSS
import { Link } from "react-router-dom";

const ReadySet: React.FC = () => {
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

      <div className ="bottom-container">
        <span className="bottomTextRS"> READY, SET... </span>
        <br/>
        <Link to="/readySet"><button><img src = "images/sound-on.png" alt = "start"></img></button></Link>
    </div>

      
    </div>
  );
};

export default ReadySet;
