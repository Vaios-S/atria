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
  userId: string;
  title: string;
  description?: string;
  category: SpaceCategory;
  createdAt: string;
  color?: string;
  icon: string;
};
