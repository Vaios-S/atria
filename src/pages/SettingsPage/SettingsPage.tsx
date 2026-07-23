import SettingsHeader from "../../components/settings/SettingsHeader";
import SettingsItem from "../../components/settings/SettingsItem";
import "./SettingsPage.css";

export default function SettingsPage() {
  return (
    <>
      <main className="settings-page">
        <SettingsHeader />
        <section className="settings-page__list">
          <SettingsItem
            icon="👤"
            title="Profile"
            description="Manage your account."
          />

          <SettingsItem
            icon="🎨"
            title="Appearance"
            description="Theme and display settings."
          />

          <SettingsItem
            icon="🔔"
            title="Notifications"
            description="Control reminders and alerts."
          />

          <SettingsItem
            icon="🗄️"
            title="Data"
            description="Import, export and backups."
          />

          <SettingsItem
            icon="ℹ️"
            title="About"
            description="Version and app information."
          />
        </section>
      </main>
    </>
  );
}
