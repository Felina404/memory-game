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

  useEffect(() => {
    let x;
    const interval = setInterval(() => {
      x = document.querySelectorAll(".card").forEach((image) => {
        image.classList.add("clicked-card");
      }, 2000);
    });

    return () =>
      document.querySelectorAll(".card").forEach((image) => {
        image.classList.remove("clicked-card");
      });
  }, [[images.clicked]]);

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

  const handleClick = (e) => {
    let x;
    let idValue = e.target.attributes[3].value;
    images.forEach((ele, i) => {
      ele.id == idValue ? (x = i) : null;
    });

    images[x].clicked
      ? (setGameOver(true), setWinState(false))
      : ((images[x].clicked = true),
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
          <Cards images={images} handleClick={handleClick}></Cards>
        ) : null}
        {gameOver === true ? (
          <Restart restart={restart} winState={winState}></Restart>
        ) : null}
      </div>
    </div>
  );
}

export default App;
