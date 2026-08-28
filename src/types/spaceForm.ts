import type { SpaceCategory } from "./space";

export type SpaceFormData = {
  title: string;
  description?: string;
  category: SpaceCategory;
  icon: string;
  color: string;
};
