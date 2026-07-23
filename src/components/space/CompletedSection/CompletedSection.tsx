import "./CompletedSection.css";
import type { Quest } from "../../../types/quest";
import EmptyState from "../../ui/EmptyState";

type CompletedSectionProps = {
  quests: Quest[];
};

export default function CompletedSection({ quests }: CompletedSectionProps) {
  return (
    <section className="completed-section">
      <h2 className="completed-section__title">COMPLETED ({quests.length})</h2>

      {quests.length === 0 ? (
        <EmptyState
          icon="⭐"
          title="No completed quests yet"
          description="Finish a quest to start building your progress."
        />
      ) : (
        <div className="completed-section__list">
          {quests.map((quest) => (
            <div key={quest.id} className="completed-section__item">
              <input type="checkbox" checked readOnly />

              <p className="completed-section__quest-title">{quest.title}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
