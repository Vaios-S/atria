// React

// Libraries

// Components
import Button from "../Button";

// Utils / constants

//Types

//Styles
import "./ConfirmDialog.css";

type ConfirmDialogProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="confirm-dialog">
      <h2 className="confirm-dialog__title">{title}</h2>

      <p className="confirm-dialog__message">{message}</p>

      <div className="confirm-dialog__actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}
