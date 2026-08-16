import "./TodaySection.css";
import type { Quest } from "../../../types/quest";
import EmptyState from "../../ui/EmptyState";
import Button from "../../ui/Button";

type TodaySectionProps = {
  title?: string;
  quests: Quest[];
  onToggleQuest: (questId: string) => void;
  onDeleteQuest: (quest: Quest) => void;
  onEditQuest: (quest: Quest) => void;
  onAddQuest?: () => void;
};

export default function TodaySection({
  title = "TODAY",
  quests,
  onToggleQuest,
  onDeleteQuest,
  onEditQuest,
  onAddQuest,
}: TodaySectionProps) {
  return (
    <section className="today-section">
      <h2 className="today-section__title">
        {title} ({quests.length})
      </h2>
      {quests.length === 0 ? (
        <EmptyState
          icon="📜"
          title="No active quests"
          description="You're all caught up for now."
          action={
            title === "TODAY" ? (
              <Button variant="primary" onClick={onAddQuest}>
                Add Quest
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="today-section__list">
          {quests.map((quest) => (
            <div key={quest.id} className="today-section__item">
              <input type="checkbox" onChange={() => onToggleQuest(quest.id)} />

              <p className="today-section__quest-title">{quest.title}</p>
              <Button variant="danger" onClick={() => onDeleteQuest(quest)}>
                X
              </Button>
              <Button variant="secondary" onClick={() => onEditQuest(quest)}>
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
