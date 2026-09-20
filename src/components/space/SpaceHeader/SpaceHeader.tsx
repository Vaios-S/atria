// React

// Libraries

// Components
import Panel from "../../ui/Panel";
import ProgressBar from "../../ui/ProgressBar";

// Utils / constants
import { SPACE_ICONS } from "../../../constants/spaceIcons";

//Types
import type { Space } from "../../../types/space";
import type { SpaceMemberRole } from "../../../types/spaceMember";

//Styles
import "./SpaceHeader.css";

type SpaceHeaderProps = {
  space: Space;
  activeQuests: number;
  progress: number;
  role: SpaceMemberRole | null;
};
export default function SpaceHeader({
  space,
  activeQuests,
  progress,
  role,
}: SpaceHeaderProps) {
  const selectedIcon = SPACE_ICONS.find((item) => item.id === space.icon);
  const Icon = selectedIcon?.icon;

  return (
    <Panel>
      <header className="space-header">
        <div className="space-header__top">
          <div className="space-header__icon" style={{ color: space.color }}>
            {Icon && <Icon aria-hidden="true" />}
          </div>

          <div className="space-header__content">
            <h1 className="space-header__title">{space.title}</h1>

            <p className="space-header__subtitle">
              {activeQuests} Active Quest
              {activeQuests !== 1 ? "s" : ""}
            </p>

            {role && (
              <span className="space-header__role">
                {role === "owner" ? "Owner" : "View only"}
              </span>
            )}
          </div>
        </div>

        <div className="space-header__progress">
          <div className="space-header__progress-info">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <ProgressBar value={progress} max={100} />
        </div>
      </header>
    </Panel>
  );
}
