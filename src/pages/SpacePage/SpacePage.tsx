import { Link, useParams } from "react-router-dom";
import { mockQuests } from "../../data/mockQuests";
import { mockQuestCompletions } from "../../data/mockQuestCompletions";
import "./SpacePage.css";
import SpaceHeader from "../../components/space/SpaceHeader";
import TodaySection from "../../components/space/TodaySection";
import CompletedSection from "../../components/space/CompletedSection";
import SpaceStats from "../../components/space/SpaceStats";
import { useState } from "react";
import type { QuestCompletion } from "../../types/questCompletion";
import type { Quest } from "../../types/quest";
import Modal from "../../components/ui/Modal";
import QuestForm, {
  type QuestFormData,
} from "../../components/space/QuestForm";
import Button from "../../components/ui/Button";
import {
  getActiveQuests,
  getCompletedQuests,
  getQuestProgress,
  getQuestsBySpace,
} from "../../utils/spaceQuestUtils";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import type { Space } from "../../types/space";

type SpacePageProps = {
  spaces: Space[];
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>;
};

export default function SpacePage({ spaces, setSpaces }: SpacePageProps) {
  const { id } = useParams();
  const [questCompletions, setQuestCompletions] =
    useState(mockQuestCompletions);

  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

  const [quests, setQuests] = useState(mockQuests);

  const [editingQuest, setEditingQuest] = useState<Quest | undefined>(
    undefined,
  );

  const [questToDelete, setQuestToDelete] = useState<Quest | undefined>(
    undefined,
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const space = spaces.find((space) => space.id === id);

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
        id: `completed-${questCompletions.length + 1}`,
        userId: "user-1",
        questId: `${questId}`,
        completedAt: new Date().toISOString(),
      };
      setQuestCompletions((prev) => [...prev, newCompletion]);
    }
  }

  function onDeleteQuest(quest: Quest) {
    setQuestToDelete(quest);
    setIsDeleteModalOpen(true);
  }

  function handleDeleteQuest() {
    if (!questToDelete) return;

    setQuests((prev) => prev.filter((quest) => quest.id !== questToDelete.id));
    setQuestCompletions((prev) =>
      prev.filter((completion) => completion.questId !== questToDelete.id),
    );
    setIsDeleteModalOpen(false);
    setQuestToDelete(undefined);
  }

  function handleEditQuest(quest: Quest) {
    setEditingQuest(quest);
    setIsQuestModalOpen(true);
  }

  if (!space) {
    return <h1>Space not found</h1>;
  }

  const spaceQuests = getQuestsBySpace(quests, space.id);

  const activeQuests = getActiveQuests(spaceQuests, questCompletions);

  const completedQuests = getCompletedQuests(spaceQuests, questCompletions);

  const progress = getQuestProgress(spaceQuests, completedQuests);

  const spaceId = space.id;
  function handleAddQuest(formData: QuestFormData) {
    const newQuest: Quest = {
      id: `quest-${quests.length + 1}`,
      userId: "user-1",
      spaceId,
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      scheduledDate: formData.scheduledDate,
      createdAt: new Date().toISOString(),
    };
    setQuests((prev) => [...prev, newQuest]);
    setEditingQuest(undefined);
    setIsQuestModalOpen(false);
  }

  function handleUpdateQuest(formData: QuestFormData) {
    if (!editingQuest) return;

    const updatedQuest: Quest = {
      ...editingQuest,
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      scheduledDate: formData.scheduledDate,
    };
    setQuests((prev) =>
      prev.map((q) => (q.id === editingQuest.id ? updatedQuest : q)),
    );
    setIsQuestModalOpen(false);
    setEditingQuest(undefined);
  }

  return (
    <main className="space-page">
      <Link to="/" className="space-page__back-link">
        ← Back
      </Link>
      <Button
        onClick={() => {
          setEditingQuest(undefined);
          setIsQuestModalOpen(true);
        }}
      >
        Add Quest
      </Button>
      <SpaceHeader
        space={space}
        activeQuests={activeQuests.length}
        progress={progress}
      />
      <SpaceStats
        active={activeQuests.length}
        completed={completedQuests.length}
      />
      <TodaySection
        quests={activeQuests}
        onToggleQuest={handleToggleQuest}
        onDeleteQuest={onDeleteQuest}
        onEditQuest={handleEditQuest}
      />
      <CompletedSection
        quests={completedQuests}
        onToggleQuest={handleToggleQuest}
        onDeleteQuest={onDeleteQuest}
        onEditQuest={handleEditQuest}
      />

      <Modal
        isOpen={isQuestModalOpen}
        title={editingQuest ? "Edit Quest" : "Add Quest"}
        onClose={() => {
          setIsQuestModalOpen(false);
          setEditingQuest(undefined);
        }}
      >
        <QuestForm
          initialValues={editingQuest}
          submitLabel={editingQuest ? "Save Changes" : "Add Quest"}
          onSubmit={editingQuest ? handleUpdateQuest : handleAddQuest}
          onCancel={() => setIsQuestModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Quest"
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ConfirmDialog
          title="Delete Quest"
          message={`Are you sure you want to delete the quest "${questToDelete?.title}"?`}
          onConfirm={handleDeleteQuest}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </main>
  );
}
