import "./header.css";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.svg";
function Header() {
  return (
    <>
      <h1 className="header">
        <img className="header__logo" src={logo} />
        <p className="header__date-and-location">DATE, LOCATION</p>
        <button className="header__add-clothes-btn">+ Add Clothes</button>
        <div className="header__user-container">
          <p className="header__username">Name</p>
          <img src={avatar} alt="" className="header__avatar" />
        </div>
      </h1>
    </>
  );
}

export default Header;
