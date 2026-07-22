import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import SpacePage from "./pages/SpacePage/SpacePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import MainNavbar from "./components/ui/MainNavBar/MainNavBar.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/space/:id" element={<SpacePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <MainNavbar />
    </>
  );
}

export default App;
