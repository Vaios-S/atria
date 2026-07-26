import "./Modal.css";
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
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <button
        className="modal__backdrop"
        type="button"
        aria-label="Close modal"
        onClick={onClose}
      />

      <div className="modal__content">
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>

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
