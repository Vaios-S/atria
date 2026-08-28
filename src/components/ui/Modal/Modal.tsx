import "./Modal.css";
import { useEffect } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({
  isOpen,
  title,
  children,

  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        className="modal__backdrop"
        type="button"
        tabIndex={-1}
        aria-label="Close modal"
        onClick={onClose}
      />

      <div className="modal__content">
        <header className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>

          <button
            className="modal__close"
            type="button"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
