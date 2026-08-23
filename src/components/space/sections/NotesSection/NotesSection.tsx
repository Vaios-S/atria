import type { Note } from "../../../../types/note";
import "./NotesSection.css";

type NotesSectionProps = {
  sectionId: string;
  title: string;
  note?: Note;
  onSelectedSection: (sectionId: string) => void;
};

export default function NotesSection({
  sectionId,
  title,
  note,
  onSelectedSection,
}: NotesSectionProps) {
  return (
    <section className="notes-section">
      <div className="notes-section__header">
        <h2 className="notes-section__title">{title}</h2>

        <button
          type="button"
          className="notes-section__menu-button"
          onClick={() => onSelectedSection(sectionId)}
          aria-label={`Actions for ${title}`}
        >
          ...
        </button>
      </div>

      <div className="notes-section__content">
        {note ? (
          <p className="notes-section__text">{note.content}</p>
        ) : (
          <p className="notes-section__empty">No notes yet.</p>
        )}
      </div>
    </section>
  );
}
