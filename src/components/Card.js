function Card(card, onCardClick) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element"
        key={card._id}
        onClick={handleClick}
    >
      <img className="element__image"
           src={card.link}
           alt={card.name}
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__mark-block">
        <button className="element__mark"
                type="button"></button>
        <p className="element__mark-counter">{card.likes.length}</p>
      </div>
      <button className="element__trash"
              type="button"></button>
    </li>
  )
}

export default Card;