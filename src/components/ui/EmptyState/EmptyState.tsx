// React
import type { ReactNode } from "react";

// Libraries

// Components

// Utils / constants

//Types

//Styles
import "./EmptyState.css";

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <section className="empty-state">
      <span className="empty-state__icon">{icon}</span>

      <h2 className="empty-state__title">{title}</h2>

      <p className="empty-state__description">{description}</p>

      {action && <div className="empty-state__action">{action}</div>}
    </section>
  );
}
