import propTypes from 'prop-types';
import { useSound } from "../SoundContext.jsx";
import gameOverSound from "../assets/sounds/gameOverSound.mp3";
import { useEffect, useRef, useState} from 'react';


function Restart({ restart, winState, reset}) {

    const { soundEnabled } = useSound();
    const gameOverSoundRef = useRef(new Audio(gameOverSound));
    const [hasPlayed, setHasPlayed] = useState(false);
    
    useEffect(() => {
      if (!soundEnabled || hasPlayed) return;

      const audiotoPlay = gameOverSoundRef.current;

      // audiotoPlay.currentTime = 0;
      audiotoPlay.play().catch((e) => {
        console.error("Playback failed:", e);
      });

      audiotoPlay.onended = () => {
        setHasPlayed(true);
      };
       return () => {
        audiotoPlay.pause();
    };
    }, [soundEnabled, hasPlayed]);
  
  return (
    <div className={`restart ${winState ? "win" : "lost"}`}>
      <h3>Game Over</h3>
      <p>{winState ? "You Won" : "You Lost"}</p>
      <div className='restart-btns'>
        <button onClick={restart}>Restart</button>
        <button onClick={reset}>Quit</button>
      </div>
      
      </div>
  );
}

Restart.propTypes = {
  restart: propTypes.func.isRequired,
  winState: propTypes.bool.isRequired,
  reset: propTypes.func.isRequired,
}

export default Restart;
