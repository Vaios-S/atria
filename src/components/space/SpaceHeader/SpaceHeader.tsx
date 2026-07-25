import "./SpaceHeader.css";
import Panel from "../../ui/Panel";
import ProgressBar from "../../ui/ProgressBar";
import type { Space } from "../../../types/space";
import type { Quest } from "../../../types/quest";
import type { QuestCompletion } from "../../../types/questCompletion";

type SpaceHeaderProps = {
  space: Space[];
  quests: Quest[];
  questCompletions: QuestCompletion[];
};
export default function SpaceHeader({
  space,
  quests,
  questCompletions,
}: SpaceHeaderProps) {
  const spaceQuests = quests.filter((quest) => quest.spaceId === space.id);

  const completedQuests = spaceQuests.filter((quest) =>
    questCompletions.some((completion) => completion.questId === quest.id),
  );

  const activeQuests = spaceQuests.length - completedQuests.length;

  const progress =
    spaceQuests.length === 0
      ? 0
      : Math.round((completedQuests.length / spaceQuests.length) * 100);

  return (
    <Panel className="space-header">
      <header className="space-header">
        <div className="space-header__top">
          <div className="space-header__icon">{space.icon}</div>

          <div className="space-header__content">
            <h1 className="space-header__title">{space.title}</h1>

            <p className="space-header__subtitle">
              {activeQuests} Active Quest
              {activeQuests !== 1 ? "s" : ""}
            </p>
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
