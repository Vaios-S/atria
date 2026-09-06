// Types
import type { SpaceColor } from "../constants/spaceColors";
import type { SpaceIcon } from "../constants/spaceIcons";
import type { SpaceCategory } from "./space";

export type SpaceFormData = {
  title: string;
  description?: string;
  category: SpaceCategory;
  icon: SpaceIcon;
  color: SpaceColor;
};
