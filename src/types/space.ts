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
  color: string;
  icon: string;
  createdAt: string;
};
