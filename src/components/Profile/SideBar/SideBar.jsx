import "./SideBar.css";
import avatar from "/src/assets/avatar.png";
import { useContext } from "react";


const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
};

export default SideBar;
