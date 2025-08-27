import "./ClothesSection.css";
import { defaultClothingItems } from "../../../utils/constants.js";
import ItemCard from "../../ItemCard/ItemCard.jsx";

const ClothesSection = ({ onCardClick, clothingItems }) => {
  return (
    <div className="clothes-section">
      <div className="clothes-section-options">
        <p>Your Items</p>
        <button>Add New</button>
      </div>
      <ul className="clothes-section__items">
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
