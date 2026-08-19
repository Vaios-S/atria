import type { SpaceSectionType } from "../../../types/spaceSection";
import "./SectionPicker.css";

type SectionPickerProps = {
  onSelect: (type: SpaceSectionType) => void;
  onClose: () => void;
};

export default function SectionPicker({
  onSlect,
  onClose,
}: SectionPickerProps) {
  return (
    <section className="section-picker">
      <div className="section-picker__header">
        <h2 className="section-picker__title">Add a section</h2>

        <button
          type="button"
          className="section-picker__close"
          onClick={onClose}
          aria-label="Close section picker"
        >
          ×
        </button>
      </div>

      <div className="section-picker__options">
        <button
          type="button"
          className="section-picker__option"
          onClick={() => onSelect("quests")}
        >
          📜 Quests
        </button>

        <button
          type="button"
          className="section-picker__option"
          onClick={() => onSelect("checklist")}
        >
          ☑️ Checklist
        </button>

        <button
          type="button"
          className="section-picker__option"
          onClick={() => onSelect("notes")}
        >
          📝 Notes
        </button>
      </div>
    </section>
  );
}
