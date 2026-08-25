import { useState } from "react";
import type { Note } from "../../../../types/note";
import Button from "../../../ui/Button";
import "./NotesSection.css";
import { flushSync } from "react-dom";

type NotesSectionProps = {
  sectionId: string;
  title: string;
  note?: Note;
  onSelectedSection: (sectionId: string) => void;
  onSaveNote: (sectionId: string, content: string) => void;
};

export default function NotesSection({
  sectionId,
  title,
  note,
  onSelectedSection,
  onSaveNote,
}: NotesSectionProps) {
  const [noteContent, setNoteContent] = useState(note?.content ?? "");
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
