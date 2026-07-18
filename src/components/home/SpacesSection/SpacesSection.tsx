import "./SpacesSection.css";
import Button from "../../ui/Button";
import SpaceCard from "../SpaceCard";

type Space = {
  id: number;
  title: string;
  icon: string;
  activeQuests: number;
  progress: number;
};

type SpacesSectionProps = {
  spaces: Space[];
};

export default function SpacesSection({ spaces }: SpacesSectionProps) {
  return (
    <>
      <section className="spaces-section">
        <header className="spaces-section__header">
          <h1 className="spaces-section__title">SPACES</h1>

          <Button>+</Button>
        </header>

        <div className="spaces-section__list">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </section>
    </>
  );
}
