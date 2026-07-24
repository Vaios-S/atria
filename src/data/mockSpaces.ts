import type { Space } from "../types/space";

export const mockSpacrs: Space[] = [
  {
    id: "space-personal",
    userId: "user-1",
    title: "Personal",
    description: "Daily habits and personal growth.",
    category: "personal",
    icon: "🌱",
    createdAt: "2026-07-24T10:00:00.000Z",
  },
  {
    id: "space-work",
    userId: "user-1",
    title: "Atria",
    description: "Development of the Atria application.",
    category: "work",
    icon: "💻",
    createdAt: "2026-07-24T10:10:00.000Z",
  },
  {
    id: "space-study",
    userId: "user-1",
    title: "Learning",
    description: "Frontend and software engineering.",
    category: "study",
    icon: "📚",
    createdAt: "2026-07-24T10:20:00.000Z",
  },
  {
    id: "space-fitness",
    userId: "user-1",
    title: "Fitness",
    description: "Health, training and nutrition.",
    category: "fitness",
    icon: "💪",
    createdAt: "2026-07-24T10:30:00.000Z",
  },
  {
    id: "space-travel",
    userId: "user-1",
    title: "Travel",
    description: "Trips and future adventures.",
    category: "travel",
    icon: "✈️",
    createdAt: "2026-07-24T10:40:00.000Z",
  },
];
