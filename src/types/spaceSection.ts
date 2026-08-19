export type SpaceSectionType = "quests" | "checklist" | "notes";

export type SpaceSection = {
  id: string;
  spaceId: string | undefined;
  type: SpaceSectionType;
  position: number;
  createdAt: string;
};
