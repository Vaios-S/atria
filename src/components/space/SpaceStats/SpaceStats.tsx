import "./SpaceStats.css";

type SpaceStatsProps = {
  active: number;
  completed: number;
};

export default function SpaceStats({ active, completed }: SpaceStatsProps) {
  return (
    <section className="space-stats">
      <article className="space-stats__card">
        <span className="space-stats__icon">!</span>

        <div className="space-stats__content">
          <span className="space-stats__value">{active}</span>
          <span className="space-stats__label">Active</span>
        </div>
      </article>

      <article className="space-stats__card">
        <span className="space-stats__icon">✓</span>

        <div className="space-stats__content">
          <span className="space-stats__value">{completed}</span>
          <span className="space-stats__label">Completed</span>
        </div>
      </article>
    </section>
  );
}
