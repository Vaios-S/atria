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
  id: number;
  userId: string;
  title: string;
  description?: string;
  category: SpaceCategory;
  createdAt: string;

  icon: string;

  activeQuests?: number;
  progress?: number;
};
