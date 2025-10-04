import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

export default function RegisterModal({ onRegister, onClose, isOpen }) {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    link: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues); // Reset form when modal opens
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      password: values.password,
      email: values.email,
      link: values.link,
    });
  };

  return (
    <ModalWithForm
      buttonText=""
      title="Sign Up"
      name="register"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          minLength="1"
          value={values.password}
          onChange={handleChange}
        />
      </label>
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
        Avatar{" "}
        <input
          name="link"
          type="url"
          className="modal__input"
          id="link"
          placeholder="Avatar link"
          required
          minLength="1"
          value={values.link}
          onChange={handleChange}
        />
      </label>
      <button
        type="submit"
        onClick={handleSubmit}
        className="modal__signup-button"
      >
        Sign Up
      </button>
      <button type="button" onClick={onClose} className="modal__login-button">
        or Log In
      </button>
    </ModalWithForm>
  );
}
