export type SpaceMemberRole = "owner" | "member" | "viewer";

export type SpaceMember = {
  id: string;
  spaceId: string;
  userId: string;
  role: SpaceMemberRole;
  joinedAt: string;
};
