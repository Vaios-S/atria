import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import HomeHeader from "../components/home/HomeHeader/HomeHeader";
import SpacesSection from "../components/home/SpacesSection";
import { useState } from "react";
import CalendarSection from "../components/home/CalendarSection";

export default function HomePage() {
  type Space = {
    id: number;
    title: string;
    icon: string;
    activeQuests: number;
    progress: number;
  };
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

  const [selectedDay, setSelectedDay] = useState(12);

  return (
    <>
      <HomeHeader />
      <SpacesSection spaces={spaces} />
      <CalendarSection selectedDay={selectedDay} onDaySelect={setSelectedDay} />
    </>
  );
}
