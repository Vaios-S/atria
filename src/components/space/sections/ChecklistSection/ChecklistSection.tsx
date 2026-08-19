import Button from "../../../ui/Button";
import "./ChecklistSection.css";

type ChecklistSectionProps = {
  checkItem?: string;
  setCheckItem?: (input: string) => void;
};

export default function ChecklistSection({
  ckeckItem,
  setCheckItem,
}: ChecklistSectionProps) {
  return (
    <section className="checklist-section">
      <h2 className="checklist-section__title">Checklist</h2>

      <div className="checklist-section__empty">
        <p className="checklist-section__empty-text">No checklist items yet.</p>

        <Button variant="primary">+ Add Item</Button>
      </div>
    </section>
  );
}
