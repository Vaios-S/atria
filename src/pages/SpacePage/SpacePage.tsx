import { useParams } from "react-router-dom";
import { spaces } from "../../data/spaces";
import "./SpacePage.css";
import ProgressBar from "../../components/ui/ProgressBar";
import { Link } from "react-router-dom";

export default function SpacePage() {
  const { id } = useParams();

  const space = spaces.find((space) => space.id === Number(id));

  if (!space) {
    return <h1>Space not found</h1>;
  }

  return (
    <main className="space-page">
      <Link to="/" className="space-page__back-link">
        ← Back
      </Link>

      <header className="space-page__header">
        <p className="space-page__icon">{space.icon}</p>

        <div>
          <h1 className="space-page__title">{space.title}</h1>

          <p className="space-page__quests">
            {space.activeQuests} Active Quests
          </p>
        </div>
      </header>

      <section className="space-page__progress">
        <div className="space-page__progress-info">
          <span>Progress</span>
          <span>{space.progress}%</span>
        </div>

        <ProgressBar value={60} max={100} />
      </section>
    </main>
  );
}
