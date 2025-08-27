import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

export default function AddItemModal({
  activeModal,
  onClose,
  onAddItemSubmit,
  onUpdateItem,
}) {
  const defaultValues = {
    name: "",
    link: "",
    weather: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (activeModal) {
      setValues(defaultValues); // Reset form when modal opens
    }
  }, [activeModal, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemSubmit({
      name: values.name,
      link: values.link,
      weather: values.weather,
    });
  };

  return (
    <ModalWithForm
      buttonText=""
      title="New garment"
      name="new-card"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdate={onUpdateItem}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          maxLength="30"
          minLength="1"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="link" className="modal__label">
        Image{" "}
        <input
          name="link"
          type="url"
          className="modal__input"
          id="link"
          placeholder="link"
          required
          minLength="1"
          value={values.link}
          onChange={handleChange}
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
            onChange={handleChange}
            checked={values.weather === "hot"}
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
            onChange={handleChange}
            checked={values.weather === "warm"}
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
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
