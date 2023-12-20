function Cards({ images, handleClick }) {
  return (
    <div className="cards-container">
      {images.map((image) => (
        <img
          src={image.src}
          alt={image.name}
          key={image.id}
          className="card"
          id={image.id}
          onClick={handleClick}
        ></img>
      ))}
    </div>
  );
}

export default Cards;
