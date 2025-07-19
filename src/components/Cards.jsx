import PropTypes from 'prop-types';

function Cards({ images, handleClick, animateAll, onAnimationEnd }) {
  
const handleCardTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; // mouse X inside card
  const y = e.clientY - rect.top;  // mouse Y inside card

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = -(y - centerY) / 5; // Negative to invert direction
  const rotateY = (x - centerX) / 5;

  card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetTilt = (e) => {
  const card = e.currentTarget;
  card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
};

  return (
    <div className="cards-container">
      {images.map((image) => (
        <img
         onMouseMove={handleCardTilt}
         onMouseOut={resetTilt}
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
