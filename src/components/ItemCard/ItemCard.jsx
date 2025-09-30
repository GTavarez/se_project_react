import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const isLiked = item.likes.some((id) => id === currentUser._id); // Placeholder for like status
  console.log(item);
  console.log(currentUser);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      ></img>
      <button
        className={itemLikeButtonClassName}
        type="button"
        onClick={handleLike}
      ></button>
    </li>
  );
}
export default ItemCard;
