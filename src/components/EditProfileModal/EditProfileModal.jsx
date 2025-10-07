// src/components/EditProfileModal.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { updateProfile } from "../utils/userApi";
import "./EditProfileModal.css"; // 👈 import the CSS file

export default function EditProfileModal({ isOpen, onClose, currentUser, onUpdate }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    updateProfile({ name: name.trim(), avatar: avatar.trim() })
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <header className="modal-header">
          <h2>Edit profile</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={30}
            />
          </label>

          <label>
            Avatar URL
            <input
              name="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <div className="button-group">
            <button type="button" className="btn cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn save" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};
