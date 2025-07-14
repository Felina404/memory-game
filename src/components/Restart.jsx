import propTypes from 'prop-types';

function Restart({ restart, winState }) {
  return (
    <div className="restart">
      <h3>Game Over</h3>
      <p>{winState ? "You Won" : "You Lost"}</p>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

Restart.propTypes = {
  restart: propTypes.func.isRequired,
  winState: propTypes.bool.isRequired,
}

export default Restart;
