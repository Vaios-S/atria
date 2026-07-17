import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";

export default function HomePage() {
  return (
    <>
      <main className="app-container">
        <Panel>
          <h1>ATRIA</h1>
          <p>DAY 01 · LVL 03</p>
        </Panel>
        <Button>Save</Button>
      </main>
    </>
  );
}
