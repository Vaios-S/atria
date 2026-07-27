import type { Quest } from "../types/quest";
import type { QuestCompletion } from "../types/questCompletion";

export function getQuestsBySpace(quests: Quest[], spaceId: string) {
  return quests.filter((quest) => quest.spaceId === spaceId);
}

export function getActiveQuests(
  quests: Quest[],
  questCompletions: QuestCompletion[],
) {
  return quests.filter(
    (quest) =>
      !questCompletions.some((completion) => completion.questId === quest.id),
  );
}

export function getCompletedQuests(
  quests: Quest[],
  questCompletions: QuestCompletion[],
) {
  return quests.filter((quest) =>
    questCompletions.some((completion) => completion.questId === quest.id),
  );
}

export function getQuestProgress(quests: Quest[], completedQuests: Quest[]) {
  return quests.length === 0
    ? 0
    : Math.round((completedQuests.length / quests.length) * 100);
}
