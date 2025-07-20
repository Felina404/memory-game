import { useState, useLayoutEffect, useEffect, useRef} from "react";
import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import images from "./components/images";
import Restart from "./components/Restart";
import Welcome from "./components/Welcome";
import { useSound } from "./SoundContext.jsx";
import flipcard from "./assets/sounds/flipcard.mp3";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winState, setWinState] = useState(false);
  const [clickedMap, setClickedMap] = useState({});
  const [animateAll, setAnimateAll] = useState(false);
  const [imagescp, setImagescp] = useState(() => images); // initial during the first render, no need to be in useLayouteffect
  const [clickDisabled, setClickDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("");

  const { soundEnabled } = useSound();
  const audioRef = useRef(new Audio(flipcard));

  //no flashing with first render
   useLayoutEffect(() => {
    // setImagescp(images);      
    setAnimateAll(true);        
  }, []);
  

  useEffect(() => {
    const EASY_COUNT = 8;
    const MEDIUM_COUNT = 10;
    const HARD_COUNT = images.length;

    if (!gameStarted || !level) return;
    switch (level) {
      case "easy":
        setImagescp(images.slice(0, EASY_COUNT));
        break;
      case "medium":
        setImagescp(images.slice(0, MEDIUM_COUNT));
        break;
      case "hard":
        setImagescp(images.slice(0, HARD_COUNT));
        break;
      default:
        setImagescp(images);
    }
  },[gameStarted, level])

  const handleClick = (id) => {
    if (clickDisabled) return;

    setClickDisabled(true);
    setClickedMap((prevState) => ({
      ...prevState,
      [id]: true,
    }));

      setAnimateAll(false);       
      requestAnimationFrame(() =>  
      setAnimateAll(true)
       );
    
    
    shuffleImages();
    checkGameOver(id);  
  };

  const shuffleImages = () => {
      if (!imagescp.length) return;

      const shuffled = [...imagescp];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      setImagescp(shuffled);
  };

  const playSound = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!gameOver) 
      audioRef.current.play().catch(err => console.log("Playback failed:", err));
    }
  };

  const checkGameOver = (id) => {
     clickedMap[id]
      ? (setGameOver(true), setWinState(false))
      : (
        playSound(),
        setCurrentScore( c => c + 1),
        highScore < currentScore + 1 ? setHighScore(currentScore + 1) : null,
        currentScore >= imagescp.length - 1
          ? (setGameOver(true), setWinState(true))
          : null);
  };

  const restart = () => {
     setCurrentScore(0);
     setClickedMap({})
     setImagescp(images);  
     setGameOver(false);
     shuffleImages();
  };

  const reset = () => {
    setGameStarted(false);
    setLevel("");
    setGameOver(false);
    setWinState(false);
    setCurrentScore(0);
    setHighScore(0);
    setClickedMap({})
  }

  return (
     gameStarted ? 
    <div className="container">
      <Header
        current={currentScore}
        high={highScore}
      ></Header>
      <div className="main">
        {!gameOver ? (
          <>
          <Cards images={imagescp} clickedMap={clickedMap} handleClick={handleClick} animateAll={animateAll} onAnimationEnd={ () => setClickDisabled(false)}></Cards>
          <p className="percentage">{currentScore}/{imagescp.length}</p>
        </>
        ) : null}
        {gameOver === true ?(
          <Restart restart={restart} winState={winState} reset={reset}></Restart>
        ) : null}
        
      </div>
    </div>
    : <Welcome clickPlay={() => setGameStarted(true)} level={level} setLevel={setLevel} />
  );
}

export default App;
