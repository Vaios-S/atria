// Types
import type { SpaceColor } from "../constants/spaceColors";
import type { SpaceIcon } from "../constants/spaceIcons";

export type SpaceCategory =
  | "personal"
  | "work"
  | "study"
  | "fitness"
  | "relationships"
  | "travel"
  | "finance"
  | "custom";

export type Space = {
  id: string;
  createdBy: string;
  title: string;
  description?: string;
  category: SpaceCategory;
  color: SpaceColor;
  icon: SpaceIcon;
  createdAt: string;
};
