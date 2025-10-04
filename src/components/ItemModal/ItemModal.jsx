import { deleteCard } from "../../utils/api";
import "./ItemModal.css";

function ItemModal({
  activeModal,
  onClose,
  card,
  onDeleteButtonClick,
  currentUser,
}) {
  if (!currentUser) return null;
  if (!card) return null;

  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close modal__close_type_preview"
          type="button"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              onClick={onDeleteButtonClick}
              className={itemDeleteButtonClassName}
              type="button"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
