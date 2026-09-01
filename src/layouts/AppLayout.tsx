// React

// Libraries
import { Outlet } from "react-router-dom";

// Components
import MainNavbar from "../components/ui/MainNavBar/MainNavBar.tsx";
import SpaceNavBar from "../components/unused/SpaceNavBar.tsx";

// Utils / constants

//Types

//Styles

export default function AppLayout() {
  return (
    <div>
      <h1>Atria</h1>
      <MainNavbar />
      <SpaceNavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
