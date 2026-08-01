import { Link, useParams } from "react-router-dom";
import { mockQuests } from "../../data/mockQuests";
import { mockSpaces } from "../../data/mockSpaces";
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

export default function SpacePage() {
  const { id } = useParams();
  const [questCompletions, setQuestCompletions] =
    useState(mockQuestCompletions);

  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

  const [quests, setQuests] = useState(mockQuests);

  const [editingQuest, setEditingQuest] = useState<Quest | undefined>(
    undefined,
  );

  const space = mockSpaces.find((space) => space.id === id);

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

  function handleDeleteQuest(questId: string) {
    setQuests((prev) => prev.filter((quest) => quest.id !== questId));
    setQuestCompletions((prev) =>
      prev.filter((completion) => completion.questId !== questId),
    );
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
      <Button onClick={() => setIsQuestModalOpen(true)}>Add Quest</Button>
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
        onDeleteQuest={handleDeleteQuest}
        onEditQuest={handleEditQuest}
      />
      <CompletedSection
        quests={completedQuests}
        onToggleQuest={handleToggleQuest}
        onDeleteQuest={handleDeleteQuest}
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
    </main>
  );
}
