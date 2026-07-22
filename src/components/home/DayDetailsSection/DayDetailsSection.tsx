import "./DayDetailsSection.css";
import type { Quest } from "../../../types/quest";
import type { Space } from "../../../types/space";
import EmptyState from "../../ui/EmptyState";

type DayDetailsSectionProps = {
  selectedDay: number;
  quests: Quest[];
  spaces: Space[];
};

export default function DayDetailsSection({
  selectedDay,
  quests,
  spaces,
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
          todaysQuests.map((quest) => {
            const questSpace = spaces.find(
              (space) => space.id === quest.spaceId,
            );

            return (
              <div key={quest.id} className="day-details__item">
                <span className="day-details__space">
                  {questSpace?.icon} {questSpace?.title}
                </span>

                <input type="checkbox" checked={quest.completed} readOnly />

                <p>{quest.title}</p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
