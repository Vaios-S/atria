// React

// Libraries
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

// Components

// Utils / constants
import { SPACE_ICONS } from "../../../constants/spaceIcons";
import { SPACE_CATEGORY_LABELS } from "../../../constants/spaceCategories";

//Types
import type { Space } from "../../../types/space";

//Styles
import "./SpaceCard.css";

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
  const selectedIcon = SPACE_ICONS.find((item) => item.id === space.icon);
  const Icon = selectedIcon?.icon;

  return (
    <>
      <article className="space-card">
        <Link to={`/space/${space.id}`} className="space-card__link">
          <div className="space-card__header">
            <div className="space-card__icon" style={{ color: space.color }}>
              {Icon && <Icon aria-hidden="true" />}
            </div>
            <div className="space-card__info">
              <h2 className="space-card__title">{space.title}</h2>

              <span className="space-card__category">
                {SPACE_CATEGORY_LABELS[space.category]}
              </span>

              <p className="space-card__quests">
                {activeQuests} active {activeQuests === 1 ? "quest" : "quests"}
              </p>

              {space.description && (
                <p className="space-card__description">{space.description}</p>
              )}
            </div>
          </div>

          <div className="space-card__progress">
            <div className="space-card__progress-info">
              <span className="space-card__progress-label">Progress</span>

              <span className="space-card__progress-value">{progress}%</span>
            </div>

            <div className="space-card__progress-track">
              <div
                className="space-card__progress-bar"
                style={{
                  width: `${progress}%`,
                  backgroundColor: space.color,
                }}
              />
            </div>
          </div>
        </Link>

        <div className="space-card__actions">
          <button
            className="space-card__action-button"
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${space.title}`}
          >
            <Pencil aria-hidden="true" />
          </button>

          <button
            className="space-card__action-button space-card__action-button--danger"
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${space.title}`}
          >
            <Trash2 aria-hidden="true" />
          </button>
        </div>
      </article>
    </>
  );
}
