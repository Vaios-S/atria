// React

// Libraries
import { supabase } from "../../lib/supabase";

// Components
import SettingsHeader from "../../components/settings/SettingsHeader";
import SettingsItem from "../../components/settings/SettingsItem";
import AppInfo from "../../components/settings/AppInfo";

// Utils / constants

//Types

//Styles
import "./SettingsPage.css";

export default function SettingsPage() {
  const handleSignOut = async () => {
    const result = await supabase.auth.signOut();

    if (result.error) {
      console.error(result.error.message);
    }
  };
  return (
    <>
      <div className="app-container">
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
          <button
            className="settings-page__sign-out"
            type="button"
            onClick={handleSignOut}
          >
            Sign out
          </button>
          <AppInfo />
        </main>
      </div>
    </>
  );
}
