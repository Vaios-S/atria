import "./SpacesSection.css";
import Button from "../../ui/Button";
import SpaceCard from "../SpaceCard";
import type { Space } from "../../../types/space";
import type { Quest } from "../../../types/quest";
import type { QuestCompletion } from "../../../types/questCompletion";
import {
  getActiveQuests,
  getCompletedQuests,
  getQuestProgress,
  getQuestsBySpace,
} from "../../../utils/spaceQuestUtils";

type SpacesSectionProps = {
  spaces: Space[];
  quests: Quest[];
  questCompletions: QuestCompletion[];
};

export default function SpacesSection({
  spaces,
  quests,
  questCompletions,
}: SpacesSectionProps) {
  return (
    <>
      <section className="spaces-section">
        <header className="spaces-section__header">
          <h1 className="spaces-section__title">SPACES</h1>

          <Button>+</Button>
        </header>

        <div className="spaces-section__list">
          {spaces.map((space) => {
            const spaceQuests = getQuestsBySpace(quests, space.id);

            const activeQuests = getActiveQuests(spaceQuests, questCompletions);

            const completedQuests = getCompletedQuests(
              spaceQuests,
              questCompletions,
            );

            const progress = getQuestProgress(spaceQuests, completedQuests);
            return (
              <SpaceCard
                key={space.id}
                space={space}
                activeQuests={activeQuests.length}
                progress={progress}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
