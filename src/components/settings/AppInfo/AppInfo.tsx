import "./AppInfo.css";
import {
  APP_NAME,
  APP_TAGLINE,
  APP_VERSION,
  APP_AUTHOR,
  APP_MOTO,
} from "../../../constants/app";

export default function AppInfo() {
  return (
    <section className="app-info">
      <h3 className="app-info__title">{APP_NAME}</h3>

      <span className="app-info__version">Version {APP_VERSION}</span>
      <p className="app-info__tagline">{APP_MOTO}</p>
      <p className="app-info__tagline">{APP_TAGLINE}</p>
      <p className="app-info__tagline">By {APP_AUTHOR}</p>
    </section>
  );
}
