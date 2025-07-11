function Cards({ images, clickedMap,  handleClick, animateAll }) {
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
        ></img>
      ))}
    </div>
  );
}

export default Cards;
