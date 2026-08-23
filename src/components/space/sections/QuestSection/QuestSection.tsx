import type { Quest } from "../../../../types/quest";
import "./QuestSection.css";
import TodaySection from "../../TodaySection";
import CompletedSection from "../../CompletedSection";

type QuestSectionProps = {
  todayQuests: Quest[];
  upcomingQuests: Quest[];
  overdueQuests: Quest[];
  completedQuests: Quest[];
  onToggleQuest: (questId: string) => void;
  onDeleteQuest: (quest: Quest) => void;
  onEditQuest: (quest: Quest) => void;
  onAddQuest: () => void;
  sectionId: string;
  title: string;
  onSelectedSection: (sectionId: string) => void;
};

export default function QuestSection({
  todayQuests,
  upcomingQuests,
  overdueQuests,
  completedQuests,
  onToggleQuest,
  onDeleteQuest,
  onEditQuest,
  onAddQuest,
  sectionId,
  title,
  onSelectedSection,
}: QuestSectionProps) {
  return (
    <section>
      <button
        type="button"
        className="quest-section__menu-button"
        aria-label={`Actions for ${title}`}
        onClick={() => onSelectedSection(sectionId)}
      >
        •••
      </button>
      <TodaySection
        quests={todayQuests}
        onToggleQuest={onToggleQuest}
        onDeleteQuest={onDeleteQuest}
        onEditQuest={onEditQuest}
        onAddQuest={onAddQuest}
      />

      <TodaySection
        title="UPCOMING"
        quests={upcomingQuests}
        onToggleQuest={onToggleQuest}
        onDeleteQuest={onDeleteQuest}
        onEditQuest={onEditQuest}
      />

      <TodaySection
        title="OVER DUE"
        quests={overdueQuests}
        onToggleQuest={onToggleQuest}
        onDeleteQuest={onDeleteQuest}
        onEditQuest={onEditQuest}
      />

      <CompletedSection
        quests={completedQuests}
        onToggleQuest={onToggleQuest}
        onDeleteQuest={onDeleteQuest}
        onEditQuest={onEditQuest}
      />
    </section>
  );
}
