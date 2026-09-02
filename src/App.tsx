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
import SignupPage from "./pages/SignupPage/index.ts";

// Utils / constants / data
import { mockSpaces } from "./data/mockSpaces.ts";
import { mockQuests } from "./data/mockQuests.ts";
import { mockQuestCompletions } from "./data/mockQuestCompletions.ts";
import { mockSpaceSections } from "./data/mockSpaceSections.ts";
import { mockChecklistItems } from "./data/mockChecklistItems.ts";
import { mockNotes } from "./data/mockNotes.ts";

//Types

//Styles

import AppLayout from "./layouts/AppLayout.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute.tsx";

function App() {
  const [spaces, setSpaces] = useState(mockSpaces);
  const [quests, setQuests] = useState(mockQuests);
  const [questCompletions, setQuestCompletions] =
    useState(mockQuestCompletions);
  const [spaceSections, setSpaceSections] = useState(mockSpaceSections);
  const [checklistItems, setChecklistItems] = useState(mockChecklistItems);
  const [notes, setNotes] = useState(mockNotes);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

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
