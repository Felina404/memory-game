function Restart({ restart, winState }) {
  return (
    <div className="restart">
      <h3>Game Over</h3>
      <p>{winState ? "You Won" : "You Lost"}</p>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

export default Restart;
