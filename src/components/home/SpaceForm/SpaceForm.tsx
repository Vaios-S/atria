import { useState } from "react";
import * as React from "react";
import Button from "../../ui/Button";
import type { Space, SpaceCategory } from "../../../types/space";
import "./SpaceForm.css";
import { SPACE_CATEGORY_LABELS } from "../../../constants/spaceCategories";

export type SpaceFormData = {
  title: string;
  description?: string;
  category: SpaceCategory;
  icon: string;
  color: string;
};

type SpaceFormProps = {
  onSubmit: (formData: SpaceFormData) => void;
  onCancel: () => void;
  initialValues?: Space;
  submitLabel?: string;
};

export default function SpaceForm({
  onSubmit,
  onCancel,
  initialValues,
  submitLabel,
}: SpaceFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [category, setCategory] = useState<SpaceCategory>(
    initialValues?.category ?? "personal",
  );
  const [icon, setIcon] = useState(initialValues?.icon ?? "🌿");
  const [color, setColor] = useState(initialValues?.color ?? "#7c8f73");

  const [titleError, setTitleError] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError("Space name is required.");
      return;
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      category,
      icon,
      color,
    });
  }

  return (
    <form className="space-form" onSubmit={handleSubmit}>
      <div className="space-form__field">
        <label className="space-form__label" htmlFor="space-title">
          Space name
        </label>

        <input
          className={`space-form__input ${
            titleError ? "space-form__input--error" : ""
          }`}
          id="space-title"
          type="text"
          placeholder="e.g. University"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);

            if (titleError) {
              setTitleError("");
            }
          }}
          autoFocus
          autoComplete="off"
        />

        {titleError && <p className="space-form__error">{titleError}</p>}
      </div>

      <div className="space-form__field">
        <label className="space-form__label" htmlFor="space-description">
          Description
        </label>

        <textarea
          className="space-form__textarea"
          id="space-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add more details..."
          rows={4}
        />
      </div>

      <div className="space-form__field">
        <label className="space-form__label" htmlFor="space-category">
          Category
        </label>

        <select
          className="space-form__select"
          id="space-category"
          value={category}
          onChange={(event) => setCategory(event.target.value as SpaceCategory)}
        >
          {Object.entries(SPACE_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-form__row">
        <div className="space-form__field">
          <label className="space-form__label" htmlFor="space-icon">
            Icon
          </label>

          <input
            className="space-form__input space-form__input--icon"
            id="space-icon"
            type="text"
            value={icon}
            maxLength={2}
            onChange={(event) => setIcon(event.target.value.slice(0, 2))}
          />
        </div>

        <div className="space-form__field">
          <label className="space-form__label" htmlFor="space-color">
            Color
          </label>

          <div className="space-form__color-control">
            <input
              className="space-form__color-input"
              id="space-color"
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />

            <span className="space-form__color-value">{color}</span>
          </div>
        </div>
      </div>

      <div className="space-form__preview">
        <span
          className="space-form__preview-icon"
          style={{ backgroundColor: color }}
        >
          {icon || "✨"}
        </span>

        <div>
          <p className="space-form__preview-label">Preview</p>

          <p className="space-form__preview-title">{title || "New Space"}</p>
        </div>
      </div>

      <div className="space-form__actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" variant="primary">
          {submitLabel ?? "Add Space"}
        </Button>
      </div>
    </form>
  );
}
