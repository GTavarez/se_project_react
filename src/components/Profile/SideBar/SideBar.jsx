import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../../context/CurrentUserContext";

const SideBar = ({ onUpdate, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) {
    return null;
  }
  const renderAvatar = () => {
    if (currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
      );
    } else {
      const firstLetter = currentUser.name
        ? currentUser.name.charAt(0).toUpperCase()
        : "";
      return <div className="sidebar__avatar">{firstLetter}</div>;
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__display">
        {renderAvatar()}

        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <div className="edit__profile-buttons">
        <button
          type="button"
          className="edit__profile_save-button"
          onClick={onUpdate}
        >
          Change profile data
        </button>
        <button
          type="submit"
          className="edit__profile_close-button"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
