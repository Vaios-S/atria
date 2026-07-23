import "./SettingsHeader.css";

export default function SettingsHeader() {
  return (
    <header className="settings-header">
      <div className="settings-header__icon">⚙️</div>

      <div className="settings-header__content">
        <h1 className="settings-header__title">Settings</h1>

        <p className="settings-header__description">
          Customize your Atria experience.
        </p>
      </div>
    </header>
  );
}
