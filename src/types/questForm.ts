import type { QuestDifficulty } from "./quest";

export type QuestFormData = {
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  scheduledDate: string;
  spaceId?: string;
};
