import localApi from "../api/local.client";
import type { Invitation } from "../types/invitation.types";

export interface CreateInvitationInput {
    resourceType: string;
    resourceId: string;
    resourceAction?: string;
    email: string;
    role: string;
}

export const invitationService = {
    create(input: CreateInvitationInput) {
        return localApi
            .post<{
                invitation: Invitation;
                token: string;
            }>(
                "/invitations",
                input
            )
            .then(res => res.data);
    },

    listByResource(
        resourceType: string,
        resourceId: string
    ) {
        return localApi
            .get<Invitation[]>(
                "/invitations",
                {
                    params: {
                        resourceType,
                        resourceId,
                    },
                }
            )
            .then(res => res.data);
    },

    listMine() {
        return localApi
            .get<Invitation[]>(
                "/invitations/mine"
            )
            .then(res => res.data);
    },

    getByToken(token: string) {
        return localApi
            .get<Invitation>(
                `/invitations/token/${token}`
            )
            .then(res => res.data);
    },

    validate(token: string) {
        return localApi
            .get<Invitation>(
                `/invitations/token/${token}/validate`
            )
            .then(res => res.data);
    },

    accept(id: string) {
        return localApi
            .post<Invitation>(
                `/invitations/${id}/accept`
            )
            .then(res => res.data);
    },

    decline(id: string) {
        return localApi
            .post<Invitation>(
                `/invitations/${id}/decline`
            )
            .then(res => res.data);
    },

    revoke(id: string) {
        return localApi
            .post<Invitation>(
                `/invitations/${id}/revoke`
            )
            .then(res => res.data);
    },
};