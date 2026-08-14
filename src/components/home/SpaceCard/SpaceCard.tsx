import "./SpaceCard.css";
import type { Space } from "../../../types/space";
import { Link } from "react-router-dom";

type SpaceCardProps = {
  space: Space;
  activeQuests: number;
  progress: number;
  onEdit: () => void;
  onDelete: () => void;
};

export default function SpaceCard({
  space,
  activeQuests,
  progress,
  onEdit,
  onDelete,
}: SpaceCardProps) {
  return (
    <>
      <article className="space-card">
        <Link to={`/space/${space.id}`} className="space-card__link">
          <div className="space-card__header">
            <div
              className="space-card__icon"
              style={{ backgroundColor: space.color }}
            >
              {space.icon}
            </div>

            <div className="space-card__info">
              <h2 className="space-card__title">{space.title}</h2>
              <p className="space-card__quests">{activeQuests} Active Quests</p>
            </div>
          </div>

          <div className="space-card__progress">
            <div className="space-card__progress-info">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>

            <div className="space-card__progress-track">
              <div
                className="space-card__progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Link>

        <button
          className="space-card__edit-button"
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${space.title}`}
        >
          Edit
        </button>

        <button
          className="space-card__delete-button"
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${space.title}`}
        >
          Delete
        </button>
      </article>
    </>
  );
}
