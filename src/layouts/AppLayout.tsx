import { Outlet } from "react-router-dom";
import MainNavbar from "../components/Navigation/MainNavBar/MainNavBar.tsx";
import SpaceNavBar from "../components/Navigation/SpaceNavBar.tsx";

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
