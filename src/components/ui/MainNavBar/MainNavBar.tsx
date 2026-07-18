import { NavLink } from "react-router-dom";
import "./MainNavBar.css";

export default function MainNavbar() {
  return (
    <nav className="main-navbar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `main-navbar__link ${isActive ? "main-navbar__link--active" : ""}`
        }
      >
        <span className="main-navbar__icon">🏠</span>
        <span className="main-navbar__label">Home</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `main-navbar__link ${isActive ? "main-navbar__link--active" : ""}`
        }
      >
        <span className="main-navbar__icon">⚙️</span>
        <span className="main-navbar__label">Settings</span>
      </NavLink>
    </nav>
  );
}
