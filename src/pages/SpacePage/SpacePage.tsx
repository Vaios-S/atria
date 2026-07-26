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

export default function SpacePage() {
  const { id } = useParams();
  const [questCompletions, setQuestCompletions] =
    useState(mockQuestCompletions);

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

  if (!space) {
    return <h1>Space not found</h1>;
  }

  const spaceQuests = mockQuests.filter((quest) => quest.spaceId === space.id);

  const activeQuests = spaceQuests.filter(
    (quest) =>
      !questCompletions.some((completion) => completion.questId === quest.id),
  );

  const completedQuests = spaceQuests.filter((quest) =>
    questCompletions.some((completion) => completion.questId === quest.id),
  );

  const progress =
    spaceQuests.length === 0
      ? 0
      : Math.round((completedQuests.length / spaceQuests.length) * 100);

  return (
    <main className="space-page">
      <Link to="/" className="space-page__back-link">
        ← Back
      </Link>
      <SpaceHeader
        space={space}
        activeQuests={activeQuests.length}
        progress={progress}
      />
      <SpaceStats
        active={activeQuests.length}
        completed={completedQuests.length}
      />
      <TodaySection quests={activeQuests} />
      <CompletedSection quests={completedQuests} />
    </main>
  );
}
