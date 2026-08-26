import type { Quest } from "../../../../types/quest";
import "./QuestSection.css";
import { QUEST_DIFFICULTY_LABELS } from "../../../../constants/questDifficulties";

type QuestSectionProps = {
  todayQuests: Quest[];
  upcomingQuests: Quest[];
  overdueQuests: Quest[];
  completedQuests: Quest[];
  onToggleQuest: (questId: string) => void;
  onDeleteQuest: (quest: Quest) => void;
  onEditQuest: (quest: Quest) => void;
  onAddQuest: () => void;
  sectionId: string;
  title: string;
  onSelectedSection: (sectionId: string) => void;
  onMoveUp: (sectionId: string) => void;
  onMoveDown: (sectionId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

export default function QuestSection({
  todayQuests,
  upcomingQuests,
  overdueQuests,
  completedQuests,
  onToggleQuest,
  onDeleteQuest,
  onEditQuest,
  onAddQuest,
  sectionId,
  title,
  onSelectedSection,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: QuestSectionProps) {
  function renderQuestList(quests: Quest[], completed = false) {
    if (quests.length === 0) {
      return <p className="quest-section__empty">No quests here.</p>;
    }

    return (
      <div className="quest-section__list">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`quest-section__item ${
              completed ? "quest-section__item--completed" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggleQuest(quest.id)}
              aria-label={`Mark ${quest.title} as ${
                completed ? "active" : "completed"
              }`}
            />

            <div className="quest-section__item-content">
              <div className="quest-section__item-top">
                <p className="quest-section__item-title">{quest.title}</p>

                <span className="quest-section__item-difficulty">
                  {QUEST_DIFFICULTY_LABELS[quest.difficulty]}
                </span>
              </div>

              {quest.description && (
                <p className="quest-section__item-description">
                  {quest.description}
                </p>
              )}
            </div>

            <div className="quest-section__item-actions">
              <button
                type="button"
                className="quest-section__item-action"
                onClick={() => onEditQuest(quest)}
                aria-label={`Edit ${quest.title}`}
              >
                Edit
              </button>

              <button
                type="button"
                className="quest-section__item-action quest-section__item-action--danger"
                onClick={() => onDeleteQuest(quest)}
                aria-label={`Delete ${quest.title}`}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="quest-section">
      <div className="quest-section__header">
        <div>
          <h2 className="quest-section__title">{title}</h2>
          <p className="quest-section__subtitle">Plan and track your quests.</p>
        </div>

        <div className="quest-section__header-actions">
          <button
            type="button"
            className="quest-section__add-button"
            onClick={onAddQuest}
          >
            + Add
          </button>
          <button
            type="button"
            className="quest-section__move-button"
            onClick={() => onMoveUp(sectionId)}
            disabled={!canMoveUp}
            aria-label={`Move ${title} up`}
          >
            ↑
          </button>

          <button
            type="button"
            className="quest-section__move-button"
            onClick={() => onMoveDown(sectionId)}
            disabled={!canMoveDown}
            aria-label={`Move ${title} down`}
          >
            ↓
          </button>

          <button
            type="button"
            className="quest-section__menu-button"
            onClick={() => onSelectedSection(sectionId)}
            aria-label={`Actions for ${title}`}
          >
            ...
          </button>
        </div>
      </div>

      <div className="quest-section__groups">
        <div className="quest-section__group">
          <div className="quest-section__group-header">
            <h3 className="quest-section__group-title">Today</h3>
            <span className="quest-section__count">{todayQuests.length}</span>
          </div>

          {todayQuests.length === 0 ? (
            <p className="quest-section__empty">No quests for today.</p>
          ) : (
            renderQuestList(todayQuests)
          )}
        </div>

        <div className="quest-section__group">
          <div className="quest-section__group-header">
            <h3 className="quest-section__group-title">Upcoming</h3>
            <span className="quest-section__count">
              {upcomingQuests.length}
            </span>
          </div>

          {upcomingQuests.length === 0 ? (
            <p className="quest-section__empty">Nothing coming up.</p>
          ) : (
            renderQuestList(upcomingQuests)
          )}
        </div>

        <div className="quest-section__group">
          <div className="quest-section__group-header">
            <h3 className="quest-section__group-title">Overdue</h3>
            <span className="quest-section__count">{overdueQuests.length}</span>
          </div>

          {overdueQuests.length === 0 ? (
            <p className="quest-section__empty">No overdue quests.</p>
          ) : (
            renderQuestList(overdueQuests)
          )}
        </div>

        <div className="quest-section__group">
          <div className="quest-section__group-header">
            <h3 className="quest-section__group-title">Completed</h3>
            <span className="quest-section__count">
              {completedQuests.length}
            </span>
          </div>

          {completedQuests.length === 0 ? (
            <p className="quest-section__empty">No completed quests yet.</p>
          ) : (
            renderQuestList(completedQuests, true)
          )}
        </div>
      </div>
    </section>
  );
}
