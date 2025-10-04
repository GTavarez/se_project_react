import React, { useState } from "react";
import "./LoginModal.css";
import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* const defaultValues = {
    name: "",
    link: "",
    weather: "",
  };

  UseEffect(() => {
    if (activeModal) {
      setValues(defaultValues); // Reset form when modal opens
    }
  }, [activeModal, setValues]); */
  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    onSubmit(formData);
  };

  return (
    <ModalWithForm
      buttonText=""
      title="Log In"
      name="sign-in"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <input
        name="email"
        type="email"
        value={values.email}
        placeholder="Email"
        required
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
    </ModalWithForm>
  );
}
