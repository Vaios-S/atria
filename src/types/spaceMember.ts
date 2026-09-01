export type SpaceMemberRole = "owner" | "viewer";

export type SpaceMember = {
  id: string;
  spaceId: string;
  userId: string;
  role: SpaceMemberRole;
  joinedAt: string;
};
