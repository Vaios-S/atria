import HomeHeader from "../../components/home/HomeHeader";
import SpacesSection from "../../components/home/SpacesSection";
import { useState } from "react";
import CalendarSection from "../../components/home/CalendarSection";
import DayDetailsSection from "../../components/home/DayDetailsSection";
import { mockQuests } from "../../data/mockQuests";
import { mockQuestCompletions } from "../../data/mockQuestCompletions";
import Modal from "../../components/ui/Modal";
import SpaceForm from "../../components/home/SpaceForm";
import type { SpaceFormData } from "../../components/home/SpaceForm/SpaceForm";
import type { Space } from "../../types/space";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

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

  const [editingSpace, setEditingSpace] = useState<Space | undefined>(
    undefined,
  );

  function handleUpdateSpace(formData: SpaceFormData) {
    if (!editingSpace) return;
    const updatedSpace = {
      ...editingSpace,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      icon: formData.icon,
      color: formData.color,
    };

    setSpaces((prev) =>
      prev.map((space) =>
        space.id === updatedSpace.id ? updatedSpace : space,
      ),
    );
    setIsSpaceModalOpen(false);
    setEditingSpace(undefined);
  }

  function onEditSpace(space: Space) {
    setEditingSpace(space);
    setIsSpaceModalOpen(true);
  }

  function handleDeleteSpace() {
    if (!spaceToDelete) return;
    setSpaces((prev) => prev.filter((space) => space.id !== spaceToDelete.id));
    setIsDeleteModalOpen(false);
    setSpaceToDelete(undefined);
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [spaceToDelete, setSpaceToDelete] = useState<Space | undefined>(
    undefined,
  );
  function onDeleteSpace(space: Space) {
    setSpaceToDelete(space);
    setIsDeleteModalOpen(true);
  }
  return (
    <>
      <HomeHeader />
      <SpacesSection
        spaces={spaces}
        quests={mockQuests}
        questCompletions={mockQuestCompletions}
        onAddSpace={openSpaceModal}
        onEditSpace={onEditSpace}
        onDeleteSpace={onDeleteSpace}
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
        title={editingSpace ? "Edit Space" : "Add Space"}
        onClose={() => {
          setIsSpaceModalOpen(false);
          setEditingSpace(undefined);
        }}
      >
        <SpaceForm
          initialValues={editingSpace}
          submitLabel={editingSpace ? "Save Changes" : "Add Space"}
          onSubmit={editingSpace ? handleUpdateSpace : handleAddSpace}
          onCancel={() => setIsSpaceModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Space"
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEditingSpace(undefined);
        }}
      >
        <ConfirmDialog
          title="Delete Space"
          message="Are you sure you want to delete this space?"
          onConfirm={handleDeleteSpace}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </>
  );
}
