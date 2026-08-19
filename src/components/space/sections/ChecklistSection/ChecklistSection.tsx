import type { ChecklistItem } from "../../../../types/checklistItem";
import Button from "../../../ui/Button";
import "./ChecklistSection.css";

type ChecklistSectionProps = {
  items: ChecklistItem[];
  title: string;
};

export default function ChecklistSection({
  items,
  title,
}: ChecklistSectionProps) {
  if (!items) return;

  return (
    <section className="checklist-section">
      <h2 className="checklist-section__title">{title}</h2>

      <div className="checklist-section__empty">
        {items.length === 0 && (
          <p className="checklist-section__empty-text">
            No checklist items yet.
          </p>
        )}

        {items.map((item) => (
          <div className="checklist-section__item">
            <input type="checkbox" />
            <p className="checklist-section__item-text">{item.text}</p>
          </div>
        ))}

        <div className="checklist-section__actions">
          <Button variant="primary">+ Add Item</Button>
        </div>
      </div>
    </section>
  );
}
