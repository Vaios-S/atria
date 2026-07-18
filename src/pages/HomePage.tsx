import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import HomeHeader from "../components/home/HomeHeader/HomeHeader";
import SpacesSection from "../components/home/SpacesSection";
import { useState } from "react";
import CalendarSection from "../components/home/CalendarSection";
import type { Space } from "../types/space";
import DayDetailsSection from "../components/home/DayDetailsSection";

export default function HomePage() {
  const spaces: Space[] = [
    {
      id: 1,
      title: "Work",
      icon: "⚔",
      activeQuests: 3,
      progress: 72,
    },
    {
      id: 2,
      title: "Fitness",
      icon: "♥",
      activeQuests: 2,
      progress: 45,
    },
    {
      id: 3,
      title: "Learning",
      icon: "✦",
      activeQuests: 5,
      progress: 60,
    },
    {
      id: 4,
      title: "Personal",
      icon: "◆",
      activeQuests: 1,
      progress: 30,
    },
  ];

  const quests = [
    {
      id: 1,
      title: "Finish React lesson",
      completed: false,
    },
    {
      id: 2,
      title: "Gym workout",
      completed: true,
    },
    {
      id: 3,
      title: "Read 20 pages",
      completed: false,
    },
  ];

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
