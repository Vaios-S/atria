import type { SpaceMemberRole } from "./spaceMember";

export type SpaceInvitation = {
  id: string;
  spaceId: string;
  invitedEmail: string;
  invitedBy: string;
  role: SpaceMemberRole;
  status: "Pending" | "Accepted" | "Declined";
  token: string;
  createdAt: string;
  expiresAt: string;
  acceptedAt?: string;
};
