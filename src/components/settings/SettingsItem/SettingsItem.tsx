import "./SettingsItem.css";

type SettingsItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
};

export default function SettingsItem({
  icon,
  title,
  description,
  onClick,
}: SettingsItemProps) {
  return (
    <button className="settings-item">
      <span className="settings-item__icon">{icon}</span>

      <div className="settings-item__content">
        <h3 className="settings-item__title">{title}</h3>
        <p className="settings-item__description">{description}</p>
      </div>

      <span className="settings-item__arrow">›</span>
    </button>
  );
}
