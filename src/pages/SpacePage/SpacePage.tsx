import { Link, useParams } from "react-router-dom";
import { spaces } from "../../data/spaces";
import { quests } from "../../data/quests";
import "./SpacePage.css";
import SpaceHeader from "../../components/space/SpaceHeader";
import TodaySection from "../../components/space/TodaySection";

export default function SpacePage() {
  const { id } = useParams();

  const space = spaces.find((space) => space.id === Number(id));

  const spaceQuests = quests.filter((quest) => quest.spaceId === space.id);

  if (!space) {
    return <h1>Space not found</h1>;
  }

  return (
    <main className="space-page">
      <Link to="/" className="space-page__back-link">
        ← Back
      </Link>
      <SpaceHeader space={space} />
      <TodaySection quests={spaceQuests} />
    </main>
  );
}
