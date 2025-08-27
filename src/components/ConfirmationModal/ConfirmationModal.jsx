import "./ConfirmationModal.css";
import { useState } from "react";

function ConfirmationModal({
  showConfirmation,
  onFirstButtonClick,
  onSecondButtonClick,
  card,
}) {

  return (
    <div className={`modal ${showConfirmation === true && "modal_opened"}`}>
      <div className="modal__content-delete">
        <h2 className="modal__question">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          onClick={() => onFirstButtonClick(card)}
          type="button"
          className="modal__delete_btn"
        >
          Yes, Delete item
        </button>
        <button
          onClick={onSecondButtonClick}
          type="button"
          className="modal__cancel_btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
