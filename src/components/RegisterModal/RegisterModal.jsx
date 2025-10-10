import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

export default function RegisterModal({
  onRegister,
  onClose,
  isOpen,
  onLogin,
}) {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
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
      avatar: values.avatar,
    });
  };

  return (
    <ModalWithForm
      buttonText="Sign up"
      title="Sign up"
      name="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      hideSubmitButton={true}
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
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          name="avatar"
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar link"
          required
          minLength="1"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
      <div className="modal__auth-buttons">
        {
          <button
            type="submit"
            onClick={handleSubmit}
            className="modal__signup-button"
          >
            Sign Up
          </button>
        }
        <button
          type="button"
          onClick={() => {
            onClose();
            onLogin();
          }}
          className="modal__login-button"
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
