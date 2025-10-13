import "./LoginModal.css";
import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onSignupModal,
  onLogin,
}) {
  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: values.email,
      password: values.password,
    };
    onLogin(formData);
  };

  return (
    <ModalWithForm
      title="Log In"
      name="sign-in"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      hideSubmitButton={true}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          value={values.email}
          placeholder="Email"
          id="login-email"
          autoComplete="username"
          required
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          id="login-password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>

      <div className="login__auth-buttons">
        <button type="submit" className="login__signin-button">
          Log in
        </button>
        <button
          type="button"
          className="login__signup-button"
          onClick={() => {
            onClose();
            onSignupModal();
          }}
        >
          Or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}
