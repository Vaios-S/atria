import type { ChecklistItem } from "../types/checklistItem";

export const mockChecklistItems: ChecklistItem[] = [
  {
    id: "checklist-item-1",
    sectionId: "section-personal-checklist",
    text: "Buy groceries",
    completed: false,
    createdAt: "2026-08-19T12:00:00.000Z",
  },
  {
    id: "checklist-item-2",
    sectionId: "section-personal-checklist",
    text: "Call the dentist",
    completed: true,
    createdAt: "2026-08-19T12:10:00.000Z",
  },
];
