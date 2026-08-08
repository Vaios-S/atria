import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.tsx";
import SpacePage from "./pages/SpacePage/SpacePage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import MainNavbar from "./components/ui/MainNavBar/MainNavBar.tsx";
import { useState } from "react";
import { mockSpaces } from "./data/mockSpaces.ts";
import { mockQuests } from "./data/mockQuests.ts";
import { mockQuestCompletions } from "./data/mockQuestCompletions.ts";

function App() {
  const [spaces, setSpaces] = useState(mockSpaces);
  const [quests, setQuests] = useState(mockQuests);
  const [questCompletions, setQuestCompletions] =
    useState(mockQuestCompletions);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              spaces={spaces}
              setSpaces={setSpaces}
              quests={quests}
              setQuests={setQuests}
              questCompletions={questCompletions}
              setQuestCompletions={setQuestCompletions}
            />
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/space/:id"
          element={
            <SpacePage
              spaces={spaces}
              setSpaces={setSpaces}
              quests={quests}
              setQuests={setQuests}
              questCompletions={questCompletions}
              setQuestCompletions={setQuestCompletions}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <MainNavbar />
    </>
  );
}

export default App;
