// React
import { useState } from "react";

// Libraries

// Components
import Button from "../../ui/Button";

// Utils / constants
import { SPACE_CATEGORY_LABELS } from "../../../constants/spaceCategories";
import { SPACE_COLORS } from "../../../constants/spaceColors";
import { SPACE_ICONS } from "../../../constants/spaceIcons";

//Types
import type { Space, SpaceCategory } from "../../../types/space";
import type { SpaceFormData } from "../../../types/spaceForm";
import type { SpaceColor } from "../../../constants/spaceColors";
import type { SpaceIcon } from "../../../constants/spaceIcons";

//Styles
import "./SpaceForm.css";

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
  const [icon, setIcon] = useState<SpaceIcon>(initialValues?.icon ?? "home");

  const [color, setColor] = useState<SpaceColor>(
    initialValues?.color ?? "#4D7C3F",
  );

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

  const selectedIcon = SPACE_ICONS.find((item) => item.id === icon);
  const SelectedIcon = selectedIcon?.icon;

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
          aria-invalid={Boolean(titleError)}
          aria-describedby={titleError ? "space-title-error" : undefined}
        />

        {titleError && (
          <p id="space-title-error" className="space-form__error">
            {titleError}
          </p>
        )}
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

      <div className="space-form__field">
        <p className="space-form__label">Icon</p>

        <div className="space-form__icon-picker">
          {SPACE_ICONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`space-form__icon-option ${
                icon === id ? "space-form__icon-option--selected" : ""
              }`}
              type="button"
              onClick={() => setIcon(id)}
              aria-label={label}
              aria-pressed={icon === id}
            >
              <Icon aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-form__field">
        <p className="space-form__label">Color</p>

        <div className="space-form__color-picker">
          {SPACE_COLORS.map(({ label, value }) => (
            <button
              key={value}
              className={`space-form__color-option ${
                color === value ? "space-form__color-option--selected" : ""
              }`}
              type="button"
              onClick={() => setColor(value)}
              aria-label={label}
              aria-pressed={color === value}
              style={{ backgroundColor: value }}
            />
          ))}
        </div>
      </div>

      <div className="space-form__preview">
        <span className="space-form__preview-icon" style={{ color }}>
          {SelectedIcon && <SelectedIcon aria-hidden="true" />}
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
