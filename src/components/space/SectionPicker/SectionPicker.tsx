import type { SpaceSectionType } from "../../../types/spaceSection";
import "./SectionPicker.css";

type SectionPickerProps = {
  onSelect: (type: SpaceSectionType) => void;
  setNameOfSection: (name: string) => void;
  nameOfSection: string;
  hasQuestSection: boolean;
};

export default function SectionPicker({
  onSelect,
  setNameOfSection,
  nameOfSection,
  hasQuestSection,
}: SectionPickerProps) {
  const trimmedName = nameOfSection.trim();

  return (
    <section className="section-picker">
      <input
        className="section-picker__input"
        type="text"
        value={trimmedName}
        onChange={(e) => setNameOfSection(e.target.value)}
        placeholder="Name your section..."
      />
      <div className="section-picker__options">
        <button
          type="button"
          className="section-picker__option"
          onClick={() => onSelect("quests")}
          disabled={hasQuestSection}
        >
          📜 Quests
          {hasQuestSection && (
            <span className="section-picker__option-status">Already added</span>
          )}
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
