import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import SpacePage from "./pages/SpacePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AppLayout from "./layouts/AppLayout.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/space/:id" element={<SpacePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
