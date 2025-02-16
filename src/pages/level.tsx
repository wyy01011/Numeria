import React, { useState, useEffect, useRef } from "react";
import "../styles/level.css"; // Import CSS
import { Link } from "react-router-dom";

const Level: React.FC = () => {
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
    <div className="page-container">
      {/* Scrollable Content */}
      <div className="content-container">
        <Link to="/">
          <img src="images/setting.png" alt="setting" className="settingButton" />
        </Link>

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

        {/* Island Image */}
        <div className="island1">
          <Link to = "/transition1"><button className="island1Button"><img src="images/island1.png" alt="island1" /></button></Link>
        </div>

        {/* Island Image */}
        <div className="islands">
          <img src="images/route.png" alt="islands" />
        </div>
      </div>

      {/* Fixed Bottom Container */}
      <div className="bottom-container">
        <span className="bottomText">
          Numeria is a magical place, full of hidden treasures. <br /> Ready to start the search?
        </span>
        
        
      </div>
    </div>
  );
};

export default Level;
