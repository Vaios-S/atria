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
  onMoveUp: (sectionId: string) => void;
  onMoveDown: (sectionId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
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
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: QuestSectionProps) {
  return (
    <section>
      <div className="section-actions">
        <button
          type="button"
          className="section-actions__move"
          onClick={() => onMoveUp(sectionId)}
          disabled={!canMoveUp}
          aria-label={`Move ${title} up`}
        >
          ↑
        </button>

        <button
          type="button"
          className="section-actions__move"
          onClick={() => onMoveDown(sectionId)}
          disabled={!canMoveDown}
          aria-label={`Move ${title} down`}
        >
          ↓
        </button>

        <button
          type="button"
          className="section-actions__menu"
          onClick={() => onSelectedSection(sectionId)}
          aria-label={`Actions for ${title}`}
        >
          ...
        </button>
      </div>
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
