export type SpaceSectionType = "quests" | "checklist" | "notes";

export type SpaceSection = {
  id: string;
  spaceId: string;
  type: SpaceSectionType;
  position: number;
  createdAt: string;
};
