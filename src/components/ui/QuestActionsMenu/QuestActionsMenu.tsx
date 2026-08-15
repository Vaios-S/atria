import Button from "../Button";
import "./QuestActionsMenu.css";

type QuestActionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};

export default function QuestActionsMenu({
  onEdit,
  onDelete,
  onClose,
}: QuestActionsMenuProps) {
  return (
    <section className="quest-actions-menu">
      <div className="quest-actions-menu__header">
        <h2 className="quest-actions-menu__title">Quest Actions</h2>

        <button
          type="button"
          className="quest-actions-menu__close"
          onClick={onClose}
          aria-label="Close quest actions"
        >
          ×
        </button>
      </div>

      <div className="quest-actions-menu__actions">
        <Button variant="primary" onClick={onEdit}>
          Edit
        </Button>

        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </section>
  );
}
