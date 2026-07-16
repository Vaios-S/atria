import { Outlet } from "react-router-dom";
import MainNavbar from "../components/MainNavBar.tsx";
import SpaceNavBar from "../components/SpaceNavBar.tsx";

export default function AppLayout() {
  return (
    <div>
      <h1>Welcome to Atria</h1>
      <p>This is the home page of the Atria application.</p>
      <MainNavbar />
      <SpaceNavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
