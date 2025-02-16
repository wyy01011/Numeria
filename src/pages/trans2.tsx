import React, { useState, useEffect, useRef } from "react";
import "../styles/trans2.css"; // Import CSS
import { Link } from "react-router-dom";

const Trans3: React.FC = () => {
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
    
    <div className="question-containerT2">
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

      <div className="eagle-containerT2">
        <img className="eagleT2" src="images/eagle.png" alt="eagle" />
        </div>

      <div className="bottom-containerT2">
    <span className="bottomTextDesT2">Oh no! First, we must get past the bald eagle...</span>

    {/* Arrow button positioned correctly */}
    <Link to="/transition3">
        <button className="no-frame-button2">
            <img className="arrow" src="images/arrow.png" alt="continue" />
        </button>
    </Link>
</div>

      
    </div>
 
  );
};

export default Trans3;
