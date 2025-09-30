import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  /*  const defaultValues = {
    name: "",
    link: "",
    weather: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues); */

  /* useEffect(() => {
    if (activeModal) {
      setValues(defaultValues); // Reset form when modal opens
    }
  }, [activeModal, setValues]); */

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
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
    </ModalWithForm>
  );
}
