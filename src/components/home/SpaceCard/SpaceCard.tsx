import "./SpaceCard.css";
import type { Space } from "../../../types/space";

type SpaceCardProps = {
  space: Space;
};

export default function SpaceCard({ space }: SpaceCardProps) {
  return (
    <>
      <section className="space-card">
        <p className="space-card__icon">{space.icon}</p>

        <h2 className="space-card__title">{space.title}</h2>

        <p className="space-card__quests">{space.activeQuests} Active Quests</p>

        <p className="space-card__progress">{space.progress}% Complete</p>
      </section>
    </>
  );
}
