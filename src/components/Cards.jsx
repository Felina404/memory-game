import PropTypes from 'prop-types';

function Cards({ images, handleClick, animateAll, onAnimationEnd }) {
  
  return (
    <div className="cards-container">
      {images.map((image) => (
        <img
         className={`card ${animateAll ? 'clicked-card' : ''}`}
          src={image.src}
          alt={image.name}
          key={image.id}
          // className="card"
          id={image.id}
          onClick={() => handleClick(image.id)}
          onAnimationEnd={onAnimationEnd}
        ></img>
      ))}
    </div>
  );
}

Cards.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  animateAll: PropTypes.bool.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
}

export default Cards;
