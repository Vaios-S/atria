import "./DayDetailsSection.css";
import type { Quest } from "../../../types/quest";
import EmptyState from "../../ui/EmptyState";

type DayDetailsSectionProps = {
  selectedDay: number;
  quests: Quest[];
};

export default function DayDetailsSection({
  selectedDay,
  quests,
}: DayDetailsSectionProps) {
  const todaysQuests = quests.filter((quest) => quest.day === selectedDay);

  return (
    <section className="day-details">
      <h1 className="day-details__title">DAY DETAILS</h1>

      <h2 className="day-details__date">{selectedDay} JULY 2026</h2>

      <p className="day-details__count">
        {todaysQuests.length} quest{todaysQuests.length !== 1 ? "s" : ""}
      </p>

      <div className="day-details__list">
        {todaysQuests.length === 0 ? (
          <EmptyState
            icon="⚔️"
            title="No quests for this day"
            description="Enjoy your free day or add a new quest."
          />
        ) : (
          todaysQuests.map((quest) => (
            <div key={quest.id} className="day-details__item">
              <input type="checkbox" checked={quest.completed} readOnly />

              <p className="day-details__quest-title">{quest.title}</p>
            </div>
          ))
        )}
        {}
      </div>
    </section>
  );
}
