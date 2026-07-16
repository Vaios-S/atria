import { NavLink } from "react-router-dom";

export default function MainNavbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
}
