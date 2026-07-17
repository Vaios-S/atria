import "./HomeHeader.css";

export default function HomeHeader() {
  const dayOfYear = 198;
  const totalDays = 365;
  const humanEraYear = 12026;

  const level = 3;
  const currentXp = 420;
  const nextLevelXp = 500;

  const progress = (currentXp / nextLevelXp) * 100;

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

        <div className="home-header__bar">
          <div
            className="home-header__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
