function Header(props) {
  return (
    <div className="header">
      <div className="header-center">
        <h1>Memory Cards</h1>
        <p>Do not click the same image twice</p>
      </div>
      <div className="scoreboard">
        <p className="high-score">
          High Score : <span className="score"> {props.high}</span>
        </p>
        <p className="current-score">
          Current Score :<span className="score"> {props.current}</span>
        </p>
      </div>
    </div>
  );
}

export default Header;
