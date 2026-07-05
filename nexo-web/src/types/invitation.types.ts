export type InvitationStatus =
    | "pending"
    | "accepted"
    | "declined"
    | "expired"

export type InvitationRole =
    | "owner"
    | "admin"
    | "member"

export interface InvitationOrganization {
    id: number;
    name: string;
}

export interface InvitationWorkspace {
    id: string;
    name: string;
    slug: string;
}

export interface Invitation {
    id: number;
    token: string;
    email: string;
    role: InvitationRole;
    status: InvitationStatus;

    organization?: InvitationOrganization;
    workspace?: InvitationWorkspace;

    createdAt: string;
    expiresAt: string;

    invitedBy?: {
        id: number;
        name: string;
        email: string;
    };
}