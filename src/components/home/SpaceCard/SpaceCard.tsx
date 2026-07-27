import "./SpaceCard.css";
import type { Space } from "../../../types/space";
import { Link } from "react-router-dom";

type SpaceCardProps = {
  space: Space;
  activeQuests: number;
  progress: number;
};

export default function SpaceCard({
  space,
  activeQuests,
  progress,
}: SpaceCardProps) {
  return (
    <>
      <Link to={`/space/${space.id}`} className="space-card">
        <p className="space-card__icon">{space.icon}</p>

        <h2 className="space-card__title">{space.title}</h2>

        <p className="space-card__quests">{activeQuests} Active Quests</p>

        <p className="space-card__progress">{progress}% Complete</p>
      </Link>
    </>
  );
}
