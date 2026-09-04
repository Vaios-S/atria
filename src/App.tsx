// React
import { useState } from "react";

// Libraries
import { Routes, Route } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage/HomePage.tsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.tsx";
import SpacePage from "./pages/SpacePage/SpacePage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./layouts/AppLayout.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute";

// Utils / constants / data
import { mockQuestCompletions } from "./data/mockQuestCompletions.ts";
import { mockSpaceSections } from "./data/mockSpaceSections.ts";
import { mockChecklistItems } from "./data/mockChecklistItems.ts";
import { mockNotes } from "./data/mockNotes.ts";

//Types
import type { Space } from "./types/space.ts";
import type { Quest } from "./types/quest.ts";

//Styles

function App() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questCompletions, setQuestCompletions] =
    useState(mockQuestCompletions);
  const [spaceSections, setSpaceSections] = useState(mockSpaceSections);
  const [checklistItems, setChecklistItems] = useState(mockChecklistItems);
  const [notes, setNotes] = useState(mockNotes);

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignupPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
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
                spaceSections={spaceSections}
                setSpaceSections={setSpaceSections}
                quests={quests}
                setQuests={setQuests}
                questCompletions={questCompletions}
                setQuestCompletions={setQuestCompletions}
                checklistItems={checklistItems}
                setChecklistItems={setChecklistItems}
                notes={notes}
                setNotes={setNotes}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
