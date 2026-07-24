export type QuestDifficulty = "easy" | "medium" | "hard";

export type Quest = {
  id: string;
  userId: string;
  spaceId: string;
  title: string;
  description?: string;
  difficulty: QuestDifficulty;
  scheduledDate?: string;
  createdAt: string;

  completed?: boolean;
  day?: number;
};
