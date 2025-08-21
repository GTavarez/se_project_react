import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";

const ClothesSection = () => {
  return (
    <div className="clothes-section">
      <div className="clothes-section-options">
        <p>Your Items</p>
        <button>Add New</button>
      </div>
      <ul className="clothes__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              /* onCardClick={handleCardClick} */
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
