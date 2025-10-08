import "./Header.css";
import avatar from "/src/assets/avatar.png";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import React from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({ handleAddClick, weatherData, onSignupModal, onLoginModal }) {
  const currentUser = React.useContext(CurrentUserContext);
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

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="header logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__toggle-switch-container">
        <ToggleSwitch />
      </div>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          {currentUser ? (
            <div className="header__user-info">
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-clothes-btn"
              >
                + Add clothes
              </button>
              <p className="header__username">{currentUser.name}</p>
              {renderAvatar()}
            </div>
          ) : (
            <div className="header__auth-buttons">
              <button
                className="header__signup-button"
                type="button"
                onClick={onSignupModal}
              >
                Sign Up
              </button>
              <button
                className="header__login-button"
                type="button"
                onClick={onLoginModal}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
