// React

// Libraries
import { format } from "date-fns";
import { Link } from "react-router-dom";

// Components
import EmptyState from "../../ui/EmptyState";
import Button from "../../ui/Button";

// Utils / constants
import { QUEST_DIFFICULTY_LABELS } from "../../../constants/questDifficulties";

//Types
import type { Quest } from "../../../types/quest";
import type { Space } from "../../../types/space";
import type { QuestCompletion } from "../../../types/questCompletion";

//Styles
import "./DayDetailsSection.css";

type DayDetailsSectionProps = {
  selectedDate: Date;
  quests: Quest[];
  spaces: Space[];
  questCompletions: QuestCompletion[];
  onToggleQuest: (questId: string) => void;
  onAddQuest: () => void;
  onSelectedQuest: (quest: Quest) => void;
};

export default function DayDetailsSection({
  selectedDate,
  quests,
  spaces,
  questCompletions,
  onToggleQuest,
  onAddQuest,
  onSelectedQuest,
}: DayDetailsSectionProps) {
  const todaysQuests = quests.filter(
    (quest) => quest.scheduledDate === format(selectedDate, "yyyy-MM-dd"),
  );
  const completedQuestsCount = todaysQuests.filter((quest) =>
    questCompletions.some((completion) => completion.questId === quest.id),
  ).length;

  return (
    <section className="day-details">
      <h1 className="day-details__title">DAY DETAILS</h1>

      <h2 className="day-details__date">
        {format(selectedDate, "EEEE, MMMM d, yyyy")}
      </h2>

      <p className="day-details__count">
        {completedQuestsCount} of {todaysQuests.length} quest
        {todaysQuests.length !== 1 ? "s" : ""} completed
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
                  aria-label={`Mark ${quest.title} as ${
                    isCompleted ? "incomplete" : "completed"
                  }`}
                />

                <p className="day-details__quest-title">{quest.title}</p>
                <span className="day-details__difficulty">
                  {QUEST_DIFFICULTY_LABELS[quest.difficulty]}
                </span>
                <button
                  type="button"
                  className="day-details__actions-button"
                  aria-label={`Open actions for ${quest.title}`}
                  onClick={() => onSelectedQuest(quest)}
                >
                  ...
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
