import "./SideBar.css";
import avatar from "/src/assets/avatar.png";
import { useContext, React } from "react";
import CurrentUserContext from "../../../context/CurrentUserContext";

const SideBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const renderAvatar = () => {
    if (currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    } else {
      const firstLetter = currentUser.name
        ? currentUser.name.charAt(0).toUpperCase()
        : "";
      return <div className="header__avatar-placeholder">{firstLetter}</div>;
    }
  };
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt={currentUser}
      />
      <p className="sidebar__username">{currentUser.name}</p>
      {renderAvatar}
    </div>
  );
};

export default SideBar;
