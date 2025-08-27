import "./ClothesSection.css";
import { defaultClothingItems } from "../../../utils/constants.js";
import ItemCard from "../../ItemCard/ItemCard.jsx";

const ClothesSection = ({ onCardClick, clothingItems, onAddItemSubmit }) => {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
