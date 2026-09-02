// React

// Libraries
import { Outlet } from "react-router-dom";

// Components
import MainNavbar from "../components/ui/MainNavBar/MainNavBar.tsx";

// Utils / constants

//Types

//Styles
export default function AppLayout() {
  return (
    <>
      <Outlet />
      <MainNavbar />
    </>
  );
}
