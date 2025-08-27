import "./ClothesSection.css";
import { defaultClothingItems } from "../../../utils/constants.js";
import ItemCard from "../../ItemCard/ItemCard.jsx";

const ClothesSection = ({ onCardClick, clothingItems }) => {
  return (
    <div className="clothes__section">
      <div className="clothes__section-options">
        <p>Your Items</p>
        <button type="button" className="clothes__section__add-btn">+ Add New</button>
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
