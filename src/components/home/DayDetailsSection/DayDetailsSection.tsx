import "./DayDetailsSection.css";
import type { Quest } from "../../../types/quest";
import type { Space } from "../../../types/space";
import type { QuestCompletion } from "../../../types/questCompletion";
import EmptyState from "../../ui/EmptyState";
import Button from "../../ui/Button";

type DayDetailsSectionProps = {
  selectedDay: number;
  quests: Quest[];
  spaces: Space[];
  questCompletions: QuestCompletion[];
  onToggleQuest: (questId: string) => void;
  onAddQuest: () => void;
};

export default function DayDetailsSection({
  selectedDay,
  quests,
  spaces,
  questCompletions,
  onToggleQuest,
  onAddQuest,
}: DayDetailsSectionProps) {
  const selectedDate = `2026-07-${String(selectedDay).padStart(2, "0")}`;

  const todaysQuests = quests.filter(
    (quest) => quest.scheduledDate === selectedDate,
  );

  return (
    <section className="day-details">
      <h1 className="day-details__title">DAY DETAILS</h1>

      <h2 className="day-details__date">{selectedDay} JULY 2026</h2>

      <p className="day-details__count">
        {todaysQuests.length} quest{todaysQuests.length !== 1 ? "s" : ""}
      </p>
      <Button onClick={onAddQuest}>+ Add Quest</Button>

      <div className="day-details__list">
        {todaysQuests.length === 0 ? (
          <EmptyState
            icon="⚔️"
            title="No quests for this day"
            description="Enjoy your free day or add a new quest."
          />
        ) : (
          todaysQuests.map((quest) => {
            const questSpace = spaces.find(
              (space) => space.id === quest.spaceId,
            );

            const isCompleted = questCompletions.some(
              (completion) => completion.questId === quest.id,
            );

            return (
              <div key={quest.id} className="day-details__item">
                <span className="day-details__space">
                  {questSpace?.icon} {questSpace?.title}
                </span>

                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => onToggleQuest(quest.id)}
                />

                <p>{quest.title}</p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
