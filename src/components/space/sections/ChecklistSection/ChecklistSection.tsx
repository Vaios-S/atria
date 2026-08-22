import { useState } from "react";
import type { ChecklistItem } from "../../../../types/checklistItem";
import Button from "../../../ui/Button";
import "./ChecklistSection.css";

type ChecklistSectionProps = {
  items: ChecklistItem[];
  title: string;
  sectionId: string;
  handleAddItem: (sectionId: string, text: string) => void;
  handleToggleItem: (itemId: string) => void;
  handleDeleteItem: (itemId: string) => void;
};

export default function ChecklistSection({
  items,
  title,
  sectionId,
  handleAddItem,
  handleToggleItem,
  handleDeleteItem,
}: ChecklistSectionProps) {
  const [listItem, setListItem] = useState("");
  function handleSubmitItem() {
    const trimmedItem = listItem.trim();

    if (!trimmedItem) return;

    handleAddItem(sectionId, trimmedItem);
    setListItem("");
  }

  const completedItems = items.filter((item) => item.completed === true);

  return (
    <section className="checklist-section">
      <h2 className="checklist-section__title">{title}</h2>
      {items.length > 0 && (
        <p className="checklist-section__progress">
          {completedItems.length} of {items.length} completed
        </p>
      )}

      <div className="checklist-section__empty">
        {items.length === 0 && (
          <p className="checklist-section__empty-text">
            No checklist items yet.
          </p>
        )}

        {items.map((item) => (
          <div key={item.id} className="checklist-section__item">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleItem(item.id)}
            />
            <p
              className={`checklist-section__item-text ${
                item.completed ? "checklist-section__item-text--completed" : ""
              }`}
            >
              {item.text}
            </p>
            <button
              type="button"
              className="checklist-section__delete"
              onClick={() => handleDeleteItem(item.id)}
              aria-label={`Delete ${item.text}`}
            >
              ×
            </button>
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
