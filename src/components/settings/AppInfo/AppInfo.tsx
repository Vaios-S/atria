import "./AppInfo.css";

export default function AppInfo() {
  return (
    <section className="app-info">
      <h3 className="app-info__title">Atria - Where all your spaces meet.</h3>

      <span className="app-info__version">Version 0.1.0</span>

      <p className="app-info__tagline">
        Built with ❤️ using React & TypeScript.
      </p>
    </section>
  );
}
