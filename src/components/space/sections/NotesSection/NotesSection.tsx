// React
import { useState } from "react";

// Libraries

// Components
import Button from "../../../ui/Button";

// Utils / constants

//Types
import type { Note } from "../../../../types/note";

//Styles
import "./NotesSection.css";

type NotesSectionProps = {
  sectionId: string;
  title: string;
  note?: Note;
  onSelectedSection: (sectionId: string) => void;
  onSaveNote: (sectionId: string, content: string) => void;
  onMoveUp: (sectionId: string) => void;
  onMoveDown: (sectionId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

export default function NotesSection({
  sectionId,
  title,
  note,
  onSelectedSection,
  onSaveNote,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: NotesSectionProps) {
  const [noteContent, setNoteContent] = useState(note?.content ?? "");
  return (
    <section className="notes-section">
      <div className="notes-section__header">
        <h2 className="notes-section__title">{title}</h2>

        <div className="section-actions">
          <button
            type="button"
            className="section-actions__move"
            onClick={() => onMoveUp(sectionId)}
            disabled={!canMoveUp}
            aria-label={`Move ${title} up`}
          >
            ↑
          </button>

          <button
            type="button"
            className="section-actions__move"
            onClick={() => onMoveDown(sectionId)}
            disabled={!canMoveDown}
            aria-label={`Move ${title} down`}
          >
            ↓
          </button>

          <button
            type="button"
            className="section-actions__menu"
            onClick={() => onSelectedSection(sectionId)}
            aria-label={`Actions for ${title}`}
          >
            ...
          </button>
        </div>
      </div>

      <div className="notes-section__editor">
        <label htmlFor={`note-${sectionId}`} className="notes-section__label">
          Note
        </label>

        <textarea
          id={`note-${sectionId}`}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="notes-section__textarea"
          placeholder="Write anything here..."
          rows={6}
        />

        <div className="notes-section__actions">
          <Button
            type="button"
            variant="primary"
            onClick={() => onSaveNote(sectionId, noteContent)}
            disabled={
              note?.content === noteContent || noteContent.trim() === ""
            }
          >
            Save
          </Button>
        </div>
      </div>
    </section>
  );
}
