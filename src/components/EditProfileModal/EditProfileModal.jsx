import { useState, useEffect, React, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function EditProfileModal({ onClose, onUpdate, isOpen }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
      setError("");
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const validateUrl = (value) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!validateUrl(avatar)) {
      setError("Avatar must be a valid URL");
      return;
    }

    setLoading(true);
    onUpdate({ name: name.trim(), avatar: avatar.trim() })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        setError(err.message || "Failed to update profile");
      })
      .finally(() => setLoading(false));
    /* if (activeModal !== "edit-profile") return null; */
  };
  return (
    <ModalWithForm
      title="Change profile data"
      name="edit profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      hideSubmitButton={true}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          name="name"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          maxLength={30}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          name="avatar"
          className="modal__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
      <div className="modal__auth-buttons">
        {error && <p className="modal__error">{error}</p>}
        <button type="submit" className="modal__save-button" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </ModalWithForm>
  );
}
