import "./TodaySection.css";
import type { Quest } from "../../../types/quest";

type TodaySectionProps = {
  quests: Quest[];
};

export default function TodaySection({ quests }: TodaySectionProps) {
  return (
    <section className="today-section">
      <h2 className="today-section__title">TODAY</h2>

      <div className="today-section__list">
        {quests.map((quest) => (
          <div key={quest.id} className="today-section__item">
            <input type="checkbox" checked={quest.completed} readOnly />

            <p className="today-section__quest-title">{quest.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
