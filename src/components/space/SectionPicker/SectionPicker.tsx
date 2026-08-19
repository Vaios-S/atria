import type { SpaceSectionType } from "../../../types/spaceSection";
import "./SectionPicker.css";

type SectionPickerProps = {
  onSelect: (type: SpaceSectionType) => void;
  onClose: () => void;
};

export default function SectionPicker({
  onSelect,
  onClose,
}: SectionPickerProps) {
  return (
    <section className="section-picker">
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
