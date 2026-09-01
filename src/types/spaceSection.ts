export type SpaceSectionType = "quests" | "checklist" | "notes";

export type SpaceSection = {
  id: string;
  title: string;
  spaceId: string;
  type: SpaceSectionType;
  position: number;
  createdAt: string;
};
