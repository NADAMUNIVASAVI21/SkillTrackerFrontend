import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar-wrapper">
      <ul className="navbar">
        <li><NavLink to="/tasks">Tasks</NavLink></li>
        <li><NavLink to="/resource-hub">Resource Hub</NavLink></li>
        <li><NavLink to="/skill-tracker">Skill Tracker</NavLink></li>
        <li><NavLink to="/mock-interview">Mock Interview</NavLink></li>
        <li><NavLink to="/ai-bot">AI Bot</NavLink></li>
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
