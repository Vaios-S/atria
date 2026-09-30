// React

// Libraries
import { format, getDayOfYear, getDaysInYear, getYear } from "date-fns";

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
  const todayDateTime = format(today, "yyyy-MM-dd");

  const safeNextLevelXp = Math.max(nextLevelXp, 1);

  const safeCurrentXp = Math.min(Math.max(currentXp, 0), safeNextLevelXp);

  const progressPercentage = Math.round(
    (safeCurrentXp / safeNextLevelXp) * 100,
  );

  return (
    <section className="home-header" aria-labelledby="home-header-title">
      <div className="home-header__heading">
        <h1 id="home-header-title" className="home-header__title">
          ATRIA
        </h1>

        <time className="home-header__date" dateTime={todayDateTime}>
          <span>
            DAY {dayOfYear} OF {totalDays}
          </span>

          <span className="home-header__date-separator" aria-hidden="true">
            ·
          </span>

          <span>YEAR {humanEraYear} H.E.</span>
        </time>
      </div>

      <div
        className="home-header__progress"
        aria-label={`Level ${level} progress`}
      >
        <div className="home-header__info">
          <h2 className="home-header__level">LVL {level}</h2>

          <div className="home-header__xp-info">
            <p className="home-header__xp">
              XP {safeCurrentXp} / {safeNextLevelXp}
            </p>

            <span className="home-header__percentage">
              {progressPercentage}%
            </span>
          </div>
        </div>
        <ProgressBar value={safeCurrentXp} max={safeNextLevelXp} />
      </div>
    </section>
  );
}
