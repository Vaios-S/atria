import { NavLink } from "react-router-dom";
import { spaces } from "../../mockSpaces.ts";

export default function SpaceNavBar() {
  return (
    <nav>
      {spaces.map((space) => (
        <NavLink key={space.id} to={`/space/${space.id}`}>
          {space.title}
        </NavLink>
      ))}
    </nav>
  );
}
