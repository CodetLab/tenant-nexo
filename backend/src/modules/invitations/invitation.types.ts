export type InvitationStatus =
    | "pending"
    | "accepted"
    | "declined"
    | "revoked"
    | "expired";

export interface Invitation {
    id: string;

    appId: number;
    invitedBy: number;

    email: string;

    resourceType: string;
    resourceId: string;
    resourceAction: string;

    role: string | null;

    status: InvitationStatus;

    expiresAt: string;

    acceptedAt: string | null;
    acceptedBy: number | null;

    createdAt: string;
    updatedAt: string;
}

export interface CreateInvitationInput {
    resourceType: string;
    resourceId: string;
    resourceAction?: string;
    email: string;
    role: string;
}