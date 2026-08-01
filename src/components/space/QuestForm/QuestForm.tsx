import { useState } from "react";
import * as React from "react";
import Button from "../../ui/Button";
import "./QuestForm.css";
import type { Quest, QuestDifficulty } from "../../../types/quest";
import { QUEST_DIFFICULTY_LABELS } from "../../../constants/questDifficulties";

export type QuestFormData = {
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  scheduledDate: string;
};

type QuestFormProps = {
  onSubmit: (formData: QuestFormData) => void;
  onCancel: () => void;
  initialValues?: Quest;
  submitLabel?: string;
};

export default function QuestForm({
  onSubmit,
  onCancel,
  initialValues,
  submitLabel,
}: QuestFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [difficulty, setDifficulty] = useState<QuestDifficulty>(
    initialValues?.difficulty ?? "easy",
  );
  const [scheduledDate, setScheduledDate] = useState(
    initialValues?.scheduledDate ?? new Date().toISOString().split("T")[0],
  );
  const [error, setError] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Quest title is required");
      return;
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      difficulty,
      scheduledDate,
    });
  }

  return (
    <form className="quest-form" onSubmit={handleSubmit}>
      <div className="quest-form__field">
        <label className="quest-form__label" htmlFor="quest-title">
          Quest title
        </label>

        <input
          className="quest-form__input"
          id="quest-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          placeholder="What needs to be done?"
          autoComplete="off"
          autoFocus
        />
        {error && <p className="quest-form__error">{error}</p>}
      </div>

      <div className="quest-form__field">
        <label className="quest-form__label" htmlFor="quest-description">
          Description
        </label>

        <textarea
          className="quest-form__textarea"
          id="quest-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add more details..."
          rows={4}
        />
      </div>

      <div className="quest-form__field">
        <label className="quest-form__label" htmlFor="quest-difficulty">
          Difficulty
        </label>

        <select
          className="quest-form__select"
          id="quest-difficulty"
          name="difficulty"
          value={difficulty}
          onChange={(event) =>
            setDifficulty(event.target.value as QuestDifficulty)
          }
        >
          {Object.entries(QUEST_DIFFICULTY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="quest-form__field">
        <label className="quest-form__label" htmlFor="quest-date">
          Scheduled date
        </label>

        <input
          className="quest-form__input"
          id="quest-date"
          name="scheduledDate"
          type="date"
          value={scheduledDate}
          onChange={(event) => setScheduledDate(event.target.value)}
        />
      </div>

      <div className="quest-form__actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" variant="primary">
          {submitLabel ?? "Add Quest"}
        </Button>
      </div>
    </form>
  );
}
