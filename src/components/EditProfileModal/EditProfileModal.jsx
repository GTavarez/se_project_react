import { useState, useEffect } from "react"; // Add this line
import { updateProfile } from "../../utils/api.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // Add this import
import "./EditProfileModal.css";

export default function EditProfileModal({
  activeModal,
  onClose,
  onUpdate,
  currentUser,
  isOpen,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (activeModal) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
      setError("");
    }
  }, [activeModal, currentUser]);

  useEffect(() => {
    if (!activeModal) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeModal, onClose]);

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
    const token = localStorage.getItem("jwt");
    updateProfile({ name: name.trim(), avatar: avatar.trim(), token: token })
      .then((updatedUser) => {
        onUpdate(updatedUser);
        onClose();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
        setError(err.message || "Failed to update profile");
      })
      .finally(() => setLoading(false));
  };

  if (activeModal !== "edit-profile") return null;

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={activeModal === "edit-profile"}
      hideSubmitButton={" "}
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
        <button
          type="submit"
          className="modal__signin-button"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </ModalWithForm>
  );
}
