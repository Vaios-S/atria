import HomeHeader from "../components/home/HomeHeader";
import SpacesSection from "../components/home/SpacesSection";
import { useState } from "react";
import CalendarSection from "../components/home/CalendarSection";
import DayDetailsSection from "../components/home/DayDetailsSection";
import { quests } from "../data/quests";
import { spaces } from "../data/spaces";

export default function HomePage() {
  const [selectedDay, setSelectedDay] = useState(12);

  return (
    <>
      <HomeHeader />
      <SpacesSection spaces={spaces} />
      <CalendarSection selectedDay={selectedDay} onDaySelect={setSelectedDay} />
      <DayDetailsSection selectedDay={selectedDay} quests={quests} />
    </>
  );
}
