import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard.jsx";
import React from "react";
import CurrentUserContext from "../../../context/CurrentUserContext.js";

const ClothesSection = ({
  onCardClick,
  clothingItems,
  onAddItemSubmit,
  onCardLike,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="clothes__section">
      <div className="clothes__section-options">
        <p>Your Items</p>
        <button
          onClick={onAddItemSubmit}
          type="button"
          className="clothes__section__add-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes__section-items">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
