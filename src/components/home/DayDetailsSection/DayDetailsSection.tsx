import "./DayDetailsSection.css";
import type { Quest } from "../../../types/quest";

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

      <div className="day-details__list">
        {todaysQuests.map((quest) => (
          <div key={quest.id} className="day-details__item">
            <input type="checkbox" checked={quest.completed} readOnly />

            <p className="day-details__quest-title">{quest.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
