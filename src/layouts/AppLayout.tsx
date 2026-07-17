import { Outlet } from "react-router-dom";
import MainNavbar from "../components/MainNavBar.tsx";
import SpaceNavBar from "../components/SpaceNavBar.tsx";

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
