import "./HomeHeader.css";
import ProgressBar from "../../ui/ProgressBar";

export default function HomeHeader() {
  const dayOfYear = 198;
  const totalDays = 365;
  const humanEraYear = 12026;

  const level = 3;
  const currentXp = 420;
  const nextLevelXp = 500;

  return (
    <section className="home-header">
      <h1 className="home-header__title">ATRIA</h1>

      <p className="home-header__date">
        DAY {dayOfYear} OF {totalDays} · YEAR {humanEraYear} H.E.
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
