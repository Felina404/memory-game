import { useState, useLayoutEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import images from "./components/images";
import Restart from "./components/Restart";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winState, setWinState] = useState(false);
  const [clickedMap, setClickedMap] = useState({});
  const [animateAll, setAnimateAll] = useState(false);
  const [imagescp, setImagescp] = useState([]);
  const [clickDisabled, setClickDisabled] = useState(false);

  //no flashing with first render
   useLayoutEffect(() => {
    setImagescp(images);      
    setAnimateAll(true);        
  }, []);


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

  const checkGameOver = (id) => {
    console.log(clickedMap[id]);
     clickedMap[id]
      ? (setGameOver(true), setWinState(false))
      : (
        setCurrentScore(currentScore + 1),
        highScore < currentScore + 1 ? setHighScore(currentScore + 1) : null,
        currentScore >= images.length - 1
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

  return (
    <div className="container">
      <Header
        current={currentScore}
        high={highScore}
        gameOver={gameOver}
      ></Header>
      <div className="main">
        {!gameOver ? (
          <Cards images={imagescp} clickedMap={clickedMap} handleClick={handleClick} animateAll={animateAll} onAnimationEnd={ () => setClickDisabled(false)}></Cards>
        ) : null}
        {gameOver === true ? (
          <Restart restart={restart} winState={winState}></Restart>
        ) : null}
      </div>
    </div>
  );
}

export default App;
