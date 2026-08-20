import type { SpaceSectionType } from "../../../types/spaceSection";
import "./SectionPicker.css";

type SectionPickerProps = {
  onSelect: (type: SpaceSectionType) => void;
  setNameOfSection: (name: string) => void;
  nameOfSection: string;
};

export default function SectionPicker({
  onSelect,
  setNameOfSection,
  nameOfSection,
}: SectionPickerProps) {
  return (
    <section className="section-picker">
      <input
        className="section-picker__input"
        type="text"
        value={nameOfSection}
        onChange={(e) => setNameOfSection(e.target.value.trim())}
        placeholder="Name your section..."
      />
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
