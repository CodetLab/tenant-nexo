import localApi from "../api/local.client";
import type { Invitation } from "../types/invitation.types";

export const invitationService = {
    getByToken(token: string): Promise<Invitation> {
        return localApi
            .get<Invitation>(`/invitations/token/${token}`)
            .then(res => res.data);
    },

    accept(token: string): Promise<void> {
        return localApi
            .post(`/invitations/token/${token}/accept`)
            .then(res => res.data);
    },

    reject(token: string): Promise<void> {
        return localApi
            .post(`/invitations/token/${token}/reject`)
            .then(res => res.data);
    },
};