export const SPACE_COLORS = [
  { label: "Forest", value: "#4D7C3F" },
  { label: "Moss", value: "#6B7D45" },
  { label: "Teal", value: "#2F7D6D" },
  { label: "Ocean", value: "#3E7080" },

  { label: "Blue", value: "#4669A6" },
  { label: "Indigo", value: "#5B5FA8" },
  { label: "Purple", value: "#7257A6" },
  { label: "Berry", value: "#9A5278" },

  { label: "Red", value: "#A9473B" },
  { label: "Terracotta", value: "#B85F45" },
  { label: "Orange", value: "#C97835" },
  { label: "Gold", value: "#B98B17" },

  { label: "Brown", value: "#80613E" },
  { label: "Olive", value: "#68704A" },
  { label: "Slate", value: "#59646F" },
  { label: "Dusty Rose", value: "#8B647D" },
] as const;

export type SpaceColor = (typeof SPACE_COLORS)[number]["value"];
