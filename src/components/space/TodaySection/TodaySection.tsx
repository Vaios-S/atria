import "./TodaySection.css";
import type { Quest } from "../../../types/quest";
import EmptyState from "../../ui/EmptyState";
import Button from "../../ui/Button";

type TodaySectionProps = {
  quests: Quest[];
  onToggleQuest: (questId: string) => void;
  onDeleteQuest: (questId: string) => void;
  onEditQuest: (quest: Quest) => void;
};

export default function TodaySection({
  quests,
  onToggleQuest,
  onDeleteQuest,
  onEditQuest,
}: TodaySectionProps) {
  return (
    <section className="today-section">
      <h2 className="today-section__title">TODAY ({quests.length})</h2>
      {quests.length === 0 ? (
        <EmptyState
          icon="📜"
          title="No active quests"
          description="You're all caught up for now."
          action={<Button variant="primary">Add Quest</Button>}
        />
      ) : (
        <div className="today-section__list">
          {quests.map((quest) => (
            <div key={quest.id} className="today-section__item">
              <input type="checkbox" onChange={() => onToggleQuest(quest.id)} />

              <p className="today-section__quest-title">{quest.title}</p>
              <Button variant="danger" onClick={() => onDeleteQuest(quest.id)}>
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
