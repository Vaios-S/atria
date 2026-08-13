import { useState } from "react";
import * as React from "react";
import Button from "../../ui/Button";
import "./QuestForm.css";
import type { Quest, QuestDifficulty } from "../../../types/quest";
import { QUEST_DIFFICULTY_LABELS } from "../../../constants/questDifficulties";
import type { Space } from "../../../types/space";

export type QuestFormData = {
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  scheduledDate: string;
  spaceId?: string;
};

type QuestFormProps = {
  onSubmit: (formData: QuestFormData) => void;
  onCancel: () => void;
  initialValues?: Quest;
  submitLabel?: string;
  spaces?: Space[];
  initialDate?: string;
};

export default function QuestForm({
  onSubmit,
  onCancel,
  initialValues,
  submitLabel,
  spaces,
  initialDate,
}: QuestFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [difficulty, setDifficulty] = useState<QuestDifficulty>(
    initialValues?.difficulty ?? "easy",
  );
  const [scheduledDate, setScheduledDate] = useState(
    initialValues?.scheduledDate ??
      initialDate ??
      new Date().toISOString().split("T")[0],
  );
  const [error, setError] = useState("");

  const [spaceId, setSpaceId] = useState(initialValues?.spaceId ?? "");

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
      spaceId: spaceId || undefined,
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

        {spaces && (
          <div className="quest-form__field">
            <label className="quest-form__label" htmlFor="quest-space">
              Space
            </label>

            <select
              className="quest-form__select"
              id="quest-space"
              name="spaceId"
              value={spaceId}
              onChange={(event) => setSpaceId(event.target.value)}
            >
              <option value="">General</option>

              {spaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.title}
                </option>
              ))}
            </select>
          </div>
        )}

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
