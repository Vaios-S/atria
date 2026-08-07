import HomeHeader from "../../components/home/HomeHeader";
import SpacesSection from "../../components/home/SpacesSection";
import { useState } from "react";
import CalendarSection from "../../components/home/CalendarSection";
import DayDetailsSection from "../../components/home/DayDetailsSection";
import { mockQuests } from "../../data/mockQuests";
import { mockSpaces } from "../../data/mockSpaces";
import { mockQuestCompletions } from "../../data/mockQuestCompletions";
import Modal from "../../components/ui/Modal";
import SpaceForm from "../../components/home/SpaceForm";
import type { SpaceFormData } from "../../components/home/SpaceForm/SpaceForm";
import type { Space } from "../../types/space";

type HomePageProps = {
  spaces: Space[];
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>;
};

export default function HomePage({ spaces, setSpaces }: HomePageProps) {
  const [selectedDay, setSelectedDay] = useState(24);

  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);

  function handleAddSpace(formData: SpaceFormData) {
    const newSpace = {
      id: `space-${formData.title.toLowerCase().replace(/\s+/g, "-")}`,
      userId: "user-1",
      title: formData.title,
      description: formData.description,
      category: formData.category,
      createdAt: new Date().toISOString(),
      color: formData.color,
      icon: formData.icon,
    };

    setSpaces((prev) => [...prev, newSpace]);
    setIsSpaceModalOpen(false);
  }

  function openSpaceModal() {
    setIsSpaceModalOpen(true);
  }

  return (
    <>
      <HomeHeader />
      <SpacesSection
        spaces={spaces}
        quests={mockQuests}
        questCompletions={mockQuestCompletions}
        onAddSpace={openSpaceModal}
      />
      <CalendarSection selectedDay={selectedDay} onDaySelect={setSelectedDay} />
      <DayDetailsSection
        selectedDay={selectedDay}
        quests={mockQuests}
        spaces={spaces}
        questCompletions={mockQuestCompletions}
      />

      <Modal
        isOpen={isSpaceModalOpen}
        title="Add Space"
        onClose={() => setIsSpaceModalOpen(false)}
      >
        <SpaceForm
          onSubmit={handleAddSpace}
          onCancel={() => setIsSpaceModalOpen(false)}
        />
      </Modal>
    </>
  );
}
