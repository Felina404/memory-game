import React, { useState, useEffect, useRef } from "react";
import intro from "../assets/sounds/intro.mp3";
import PropTypes from 'prop-types';
import SoundBtn from "./SoundBtn.jsx";
import { useSound } from "../SoundContext.jsx";

function Welcome({clickPlay, level, setLevel}) {
   const [loading, setLoading] = useState(false);  
   const [dots, setDots] = useState("");
   const { soundEnabled } = useSound();

   const audioRef = useRef(null);

 useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(intro);
      audioRef.current = audio;
      audio.loop = false;
    } else {
      audioRef.current.muted = !soundEnabled;
    }

  }, [soundEnabled, loading]);


  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
    
  const handleLevelSelect = (selection) => {
    if (loading || level) return;

    setLevel(selection);
    setLoading(true);

    /* If you want to remove the loading screen if sound if muted from
    the start, uncomment the if/else */

    // if (soundEnabled && audioRef.current) {
      const audio = audioRef.current;

      audio.play().catch(err => console.log("Playback failed:", err));
      audio.onended = () => {
        clickPlay();
      // };
    } 
    // else {
    //   // Start game immediately if no sound
    //   clickPlay();
    // }
};

 const handleSkip = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
  clickPlay();
};

  return (
    <div className="welcome">
      <SoundBtn />
      <h1>Select A level</h1>
      <div className="level-buttons">
      <button disabled={level && level !== "easy"} onClick={() => handleLevelSelect('easy')}>Easy</button>
      <button disabled={level && level !== "medium"} onClick={() => handleLevelSelect('medium')}>Medium</button>
      <button disabled={level && level !== "hard"} onClick={() => handleLevelSelect('hard')}>Hard</button>
      </div>
      { loading && 
      <div className="loading-container">
        <div className="loading-text-container">
           <p className="loading">Loading </p>
           <p className="loadingNumber">99.1%{dots}</p>
          </div>
        <button className="skip-btn" onClick={handleSkip}>Skip</button>
      </div>
      }
    </div>
  );
}

Welcome.propTypes = {
  clickPlay: PropTypes.func.isRequired,
  level: PropTypes.string,
  setLevel: PropTypes.func.isRequired,
}

export default Welcome;