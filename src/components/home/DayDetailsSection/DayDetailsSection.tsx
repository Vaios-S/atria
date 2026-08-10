import "./DayDetailsSection.css";
import type { Quest } from "../../../types/quest";
import type { Space } from "../../../types/space";
import type { QuestCompletion } from "../../../types/questCompletion";
import EmptyState from "../../ui/EmptyState";
import Button from "../../ui/Button";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type DayDetailsSectionProps = {
  selectedDate: Date;
  quests: Quest[];
  spaces: Space[];
  questCompletions: QuestCompletion[];
  onToggleQuest: (questId: string) => void;
  onAddQuest: () => void;
};

export default function DayDetailsSection({
  selectedDate,
  quests,
  spaces,
  questCompletions,
  onToggleQuest,
  onAddQuest,
}: DayDetailsSectionProps) {
  const todaysQuests = quests.filter(
    (quest) => quest.scheduledDate === format(selectedDate, "yyyy-MM-dd"),
  );

  return (
    <section className="day-details">
      <h1 className="day-details__title">DAY DETAILS</h1>

      <h2 className="day-details__date">
        {format(selectedDate, "EEEE, MMMM d, yyyy")}
      </h2>

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
                {questSpace ? (
                  <Link
                    to={`/space/${quest.spaceId}`}
                    className="day-details__space-link"
                  >
                    {questSpace.icon} {questSpace.title}
                  </Link>
                ) : (
                  <span className="day-details__space">📜 General</span>
                )}

                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => onToggleQuest(quest.id)}
                />

                <p className="day-details__quest-title">{quest.title}</p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
