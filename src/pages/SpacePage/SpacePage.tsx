import { Link, useParams } from "react-router-dom";
import { mockQuests } from "../../data/mockQuests";
import { mockSpaces } from "../../data/mockSpaces";
import { mockQuestCompletions } from "../../data/mockQuestCompletions";
import "./SpacePage.css";
import SpaceHeader from "../../components/space/SpaceHeader";
import TodaySection from "../../components/space/TodaySection";
import CompletedSection from "../../components/space/CompletedSection";
import SpaceStats from "../../components/space/SpaceStats";

export default function SpacePage() {
  const { id } = useParams();

  const space = mockSpaces.find((space) => space.id === id);

  if (!space) {
    return <h1>Space not found</h1>;
  }

  const spaceQuests = mockQuests.filter((quest) => quest.spaceId === space.id);
  const activeQuests = spaceQuests.filter((quest) => !quest.completed);
  const completedquests = spaceQuests.filter(
    (quest) => quest.completed === true,
  );

  return (
    <main className="space-page">
      <Link to="/" className="space-page__back-link">
        ← Back
      </Link>
      <SpaceHeader
        space={space}
        quests={mockQuests}
        questCompletions={mockQuestCompletions}
      />
      <SpaceStats
        active={activeQuests.length}
        completed={completedquests.length}
      />
      <TodaySection quests={activeQuests} />
      <CompletedSection quests={completedquests} />
    </main>
  );
}
