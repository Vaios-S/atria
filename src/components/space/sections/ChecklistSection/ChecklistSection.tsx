// React
import { useState } from "react";

// Libraries

// Components
import Button from "../../../ui/Button";

// Utils / constants

//Types
import type { ChecklistItem } from "../../../../types/checklistItem";

//Styles
import "./ChecklistSection.css";

type ChecklistSectionProps = {
  items: ChecklistItem[];
  title: string;
  sectionId: string;
  handleAddItem: (sectionId: string, text: string) => void;
  handleToggleItem: (itemId: string) => void;
  handleDeleteItem: (itemId: string) => void;
  onSelectedSection: (sectionId: string) => void;
  onMoveUp: (sectionId: string) => void;
  onMoveDown: (sectionId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

export default function ChecklistSection({
  items,
  title,
  sectionId,
  handleAddItem,
  handleToggleItem,
  handleDeleteItem,
  onSelectedSection,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
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

      <div className="section-actions">
        <button
          type="button"
          className="section-actions__move"
          onClick={() => onMoveUp(sectionId)}
          disabled={!canMoveUp}
          aria-label={`Move ${title} up`}
        >
          ↑
        </button>

        <button
          type="button"
          className="section-actions__move"
          onClick={() => onMoveDown(sectionId)}
          disabled={!canMoveDown}
          aria-label={`Move ${title} down`}
        >
          ↓
        </button>

        <button
          type="button"
          className="section-actions__menu"
          onClick={() => onSelectedSection(sectionId)}
          aria-label={`Actions for ${title}`}
        >
          ...
        </button>
      </div>

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
              aria-label={`Mark ${item.text} as ${
                item.completed ? "incomplete" : "completed"
              }`}
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
            aria-label="Add new checklist item"
          />
          <Button variant="primary" onClick={handleSubmitItem}>
            + Add Item
          </Button>
        </div>
      </div>
    </section>
  );
}
