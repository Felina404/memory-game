import { useEffect, useState } from "react";
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

  useEffect (() => {
    images.forEach((el) => {
      setClickedMap((prevState) => ({
        ...prevState,
        [el.id]: false,
      }));
    })
  },[gameOver]);

  useEffect(() => {
    let currentIndex = images.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [images[currentIndex], images[randomIndex]] = [
        images[randomIndex],
        images[currentIndex],
      ];
    }
  }, [[images.clicked]]);

  const handleClick = (id) => {
    setClickedMap((prevState) => ({
      ...prevState,
      [id]: true,
    }));


      setAnimateAll(false);       
      requestAnimationFrame(() =>  
      setAnimateAll(true)
       );

    checkGameOver(id);
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
    images.forEach((el) => {
      el.clicked = false;
    });
    setCurrentScore(0);
    setGameOver(false);
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
          <Cards images={images} clickedMap={clickedMap} handleClick={handleClick} animateAll={animateAll}></Cards>
        ) : null}
        {gameOver === true ? (
          <Restart restart={restart} winState={winState}></Restart>
        ) : null}
      </div>
    </div>
  );
}

export default App;
