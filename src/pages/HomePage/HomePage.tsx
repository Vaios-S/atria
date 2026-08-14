import HomeHeader from "../../components/home/HomeHeader";
import SpacesSection from "../../components/home/SpacesSection";
import { useState } from "react";
import CalendarSection from "../../components/home/CalendarSection";
import DayDetailsSection from "../../components/home/DayDetailsSection";
import Modal from "../../components/ui/Modal";
import SpaceForm from "../../components/home/SpaceForm";
import type { SpaceFormData } from "../../components/home/SpaceForm/SpaceForm";
import type { Space } from "../../types/space";
import type { Quest } from "../../types/quest";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import type { QuestCompletion } from "../../types/questCompletion";
import QuestForm, {
  type QuestFormData,
} from "../../components/space/QuestForm";
import { format } from "date-fns";

type HomePageProps = {
  spaces: Space[];
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>;
  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
  questCompletions: QuestCompletion[];
  setQuestCompletions: React.Dispatch<React.SetStateAction<QuestCompletion[]>>;
};

export default function HomePage({
  spaces,
  setSpaces,
  quests,
  setQuests,
  questCompletions,
  setQuestCompletions,
}: HomePageProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);

  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

  const [editingSpace, setEditingSpace] = useState<Space | undefined>(
    undefined,
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [spaceToDelete, setSpaceToDelete] = useState<Space | undefined>(
    undefined,
  );

  function handleAddSpace(formData: SpaceFormData) {
    const newSpace = {
      id: crypto.randomUUID(),
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
    const questsIdsToDelete = quests
      .filter((quest) => quest.spaceId === spaceToDelete.id)
      .map((quest) => quest.id);

    setSpaces((prev) => prev.filter((space) => space.id !== spaceToDelete.id));

    setQuests((prev) =>
      prev.filter((quest) => quest.spaceId !== spaceToDelete.id),
    );

    setQuestCompletions((prev) =>
      prev.filter(
        (completion) => !questsIdsToDelete.includes(completion.questId),
      ),
    );

    setIsDeleteModalOpen(false);
    setSpaceToDelete(undefined);
  }

  function onDeleteSpace(space: Space) {
    setSpaceToDelete(space);
    setIsDeleteModalOpen(true);
  }

  function handleToggleQuest(questId: string) {
    const completionExists = questCompletions.some(
      (completion) => completion.questId === questId,
    );

    if (completionExists) {
      setQuestCompletions((prev) =>
        prev.filter((completion) => completion.questId !== questId),
      );
    } else {
      const newCompletion: QuestCompletion = {
        id: crypto.randomUUID(),
        userId: "user-1",
        questId: `${questId}`,
        completedAt: new Date().toISOString(),
      };
      setQuestCompletions((prev) => [...prev, newCompletion]);
    }
  }

  function handleAddQuest(formData: QuestFormData) {
    const newQuest: Quest = {
      id: crypto.randomUUID(),
      userId: "user-1",
      spaceId: formData.spaceId ?? undefined,
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      scheduledDate: formData.scheduledDate,
      createdAt: new Date().toISOString(),
    };
    setQuests((prev) => [...prev, newQuest]);

    setIsQuestModalOpen(false);
  }

  return (
    <>
      <HomeHeader />
      <SpacesSection
        spaces={spaces}
        quests={quests}
        questCompletions={questCompletions}
        onAddSpace={openSpaceModal}
        onEditSpace={onEditSpace}
        onDeleteSpace={onDeleteSpace}
      />
      <CalendarSection
        selectedDate={selectedDate}
        onDaySelect={setSelectedDate}
        quests={quests}
      />
      <DayDetailsSection
        selectedDate={selectedDate}
        quests={quests}
        spaces={spaces}
        questCompletions={questCompletions}
        onToggleQuest={handleToggleQuest}
        onAddQuest={() => setIsQuestModalOpen(true)}
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
          setSpaceToDelete(undefined);
        }}
      >
        <ConfirmDialog
          title="Delete Space"
          message="Are you sure you want to delete this space?"
          onConfirm={handleDeleteSpace}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setSpaceToDelete(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={isQuestModalOpen}
        title={"Add Quest"}
        onClose={() => {
          setIsQuestModalOpen(false);
        }}
      >
        <QuestForm
          submitLabel="Add Quest"
          onSubmit={handleAddQuest}
          onCancel={() => setIsQuestModalOpen(false)}
          spaces={spaces}
          initialDate={format(selectedDate, "yyyy-MM-dd")}
        />
      </Modal>
    </>
  );
}
