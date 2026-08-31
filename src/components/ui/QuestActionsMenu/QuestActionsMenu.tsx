// React

// Libraries

// Components
import Button from "../Button";

// Utils / constants

//Types

//Styles
import "./QuestActionsMenu.css";

type QuestActionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function QuestActionsMenu({
  onEdit,
  onDelete,
}: QuestActionsMenuProps) {
  return (
    <section className="quest-actions-menu">
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
