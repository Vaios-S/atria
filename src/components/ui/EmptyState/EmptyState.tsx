import "./EmptyState.css";

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
};

export default function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <section className="empty-state">
      <span className="empty-state__icon">{icon}</span>

      <h2 className="empty-state__title">{title}</h2>

      <p className="empty-state__description">{description}</p>
    </section>
  );
}
