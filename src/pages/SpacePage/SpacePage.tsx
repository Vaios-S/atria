import { Link, useParams } from "react-router-dom";
import { spaces } from "../../data/spaces";
import { quests } from "../../data/quests";
import "./SpacePage.css";
import SpaceHeader from "../../components/space/SpaceHeader";
import TodaySection from "../../components/space/TodaySection";
import CompletedSection from "../../components/space/CompletedSection";

export default function SpacePage() {
  const { id } = useParams();

  const space = spaces.find((space) => space.id === Number(id));

  if (!space) {
    return <h1>Space not found</h1>;
  }

  const spaceQuests = quests.filter((quest) => quest.spaceId === space.id);
  const activeQuests = spaceQuests.filter((quest) => !quest.completed);
  const completedquests = spaceQuests.filter(
    (quest) => quest.completed === true,
  );

  return (
    <main className="space-page">
      <Link to="/" className="space-page__back-link">
        ← Back
      </Link>
      <SpaceHeader space={space} />
      <TodaySection quests={activeQuests} />
      <CompletedSection quests={completedquests} />
    </main>
  );
}
