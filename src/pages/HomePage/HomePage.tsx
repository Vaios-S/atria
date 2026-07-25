import HomeHeader from "../../components/home/HomeHeader";
import SpacesSection from "../../components/home/SpacesSection";
import { useState } from "react";
import CalendarSection from "../../components/home/CalendarSection";
import DayDetailsSection from "../../components/home/DayDetailsSection";
import { mockQuests } from "../../data/mockQuests";
import { mockSpaces } from "../../data/mockSpaces";
import { mockQuestCompletions } from "../../data/mockQuestCompletions";

export default function HomePage() {
  const [selectedDay, setSelectedDay] = useState(12);

  return (
    <>
      <HomeHeader />
      <SpacesSection spaces={mockSpaces} />
      <CalendarSection selectedDay={selectedDay} onDaySelect={setSelectedDay} />
      <DayDetailsSection
        selectedDay={selectedDay}
        quests={mockQuests}
        spaces={mockSpaces}
        questCompletions={mockQuestCompletions}
      />
    </>
  );
}
