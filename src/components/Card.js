function Card({card, onCardClick}) {
  
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <img className="element__image"
           src={card.link}
           alt={card.name}
           onClick={handleClick}
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__mark-block">
        <button className="element__mark"
                type="button"/>
        <p className="element__mark-counter">{card.likes.length}</p>
      </div>
      <button className="element__trash"
              type="button"/>
    </li>
  )
}

export default Card;