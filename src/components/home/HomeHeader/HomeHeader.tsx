// React

// Libraries
import { getDayOfYear, getDaysInYear, getYear } from "date-fns";

// Components
import ProgressBar from "../../ui/ProgressBar";

// Utils / constants

//Types

//Styles
import "./HomeHeader.css";

type HomeHeaderProps = {
  level?: number;
  currentXp?: number;
  nextLevelXp?: number;
};

export default function HomeHeader({
  level = 3,
  currentXp = 420,
  nextLevelXp = 500,
}: HomeHeaderProps) {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const totalDays = getDaysInYear(today);
  const humanEraYear = getYear(today) + 10000;

  return (
    <section className="home-header">
      <h1 className="home-header__title">ATRIA</h1>

      <p className="home-header__date">
        <span>
          DAY {dayOfYear} OF {totalDays}
        </span>

        <span className="home-header__date-separator" aria-hidden="true">
          ·
        </span>

        <span>YEAR {humanEraYear} H.E.</span>
      </p>

      <div className="home-header__progress">
        <div className="home-header__info">
          <h2 className="home-header__level">LVL {level}</h2>

          <p className="home-header__xp">
            XP {currentXp} / {nextLevelXp}
          </p>
        </div>
        <ProgressBar value={currentXp} max={nextLevelXp} />
      </div>
    </section>
  );
}
