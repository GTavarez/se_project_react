import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({
  activeModal,
  onClose,
  onAddItemSubmit,
}) {
  const {values, handleChange} = useForm();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemSubmit({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  };

  return (
    <ModalWithForm
      buttonText=""
      title="New garment"
      name="new-card"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          maxLength="30"
          minLength="1"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="ImageUrl"
          required
          maxLength="30"
          minLength="1"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            alt=""
            className="modal__radio-input"
            value="hot"
            onChange={(e) => {
              setWeather(e.target.value);
            }}
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            onChange={(e) => {
              setWeather(e.target.value);
            }}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            onChange={(e) => {
              setWeather(e.target.value);
            }}
            checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
