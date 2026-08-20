import { useState } from "react";
import type { ChecklistItem } from "../../../../types/checklistItem";
import Button from "../../../ui/Button";
import "./ChecklistSection.css";

type ChecklistSectionProps = {
  items: ChecklistItem[];
  title: string;
  sectionId: string;
  handleAddItem: (sectionId: string, text: string) => void;
};

export default function ChecklistSection({
  items,
  title,
  sectionId,
  handleAddItem,
}: ChecklistSectionProps) {
  const [listItem, setListItem] = useState("");
  function handleSubmitItem() {
    const trimmedItem = listItem.trim();

    if (!trimmedItem) return;

    handleAddItem(sectionId, trimmedItem);
    setListItem("");
  }

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
          <div key={item.id} className="checklist-section__item">
            <input type="checkbox" />
            <p className="checklist-section__item-text">{item.text}</p>
          </div>
        ))}

        <div className="checklist-section__actions">
          <input
            type="text"
            value={listItem}
            onChange={(e) => setListItem(e.target.value)}
          />
          <Button variant="primary" onClick={handleSubmitItem}>
            + Add Item
          </Button>
        </div>
      </div>
    </section>
  );
}
