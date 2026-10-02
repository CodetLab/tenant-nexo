import axios from "axios";

import type {
    Invitation,
    CreateInvitationInput,
} from "./invitation.types";

const CODET_API_URL =
    "http://localhost:5000";

const NEXO_APP_ID =
    Number(process.env.CODET_APP_ID);

function api(authHeader: string) {
    return axios.create({
        baseURL: CODET_API_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
        },
    });
}

export async function create(
    input: CreateInvitationInput,
    authHeader: string
) {
    const response =
        await api(authHeader).post<{
            invitation: Invitation;
            token: string;
        }>(
            "/api/invitations",
            {
                appId: NEXO_APP_ID,

                email: input.email,

                resourceType:
                    input.resourceType,

                resourceId:
                    input.resourceId,

                resourceAction:
                    input.resourceAction ??
                    "join",

                role: input.role,
            }
        );

    return response.data;
}

export async function listByResource(
    resourceType: string,
    resourceId: string,
    authHeader: string
) {
    const response =
        await api(authHeader).get<Invitation[]>(
            "/api/invitations",
            {
                params: {
                    appId: NEXO_APP_ID,
                    resourceType,
                    resourceId,
                },
            }
        );

    return response.data;
}

export async function listMine(
    authHeader: string
) {
    const response =
        await api(authHeader).get<Invitation[]>(
            "/api/invitations/mine"
        );

    return response.data;
}

export async function getByToken(
    token: string,
    authHeader: string
) {
    const response =
        await api(authHeader).get<Invitation>(
            `/api/invitations/token/${token}`
        );

    return response.data;
}

export async function validate(
    token: string,
    authHeader: string
) {
    const response =
        await api(authHeader).get<Invitation>(
            `/api/invitations/token/${token}/validate`
        );

    return response.data;
}

export async function accept(
    invitationId: string,
    authHeader: string
) {
    const response =
        await api(authHeader).post<Invitation>(
            `/api/invitations/${invitationId}/accept`
        );

    return response.data;
}

export async function decline(
    invitationId: string,
    authHeader: string
) {
    const response =
        await api(authHeader).post<Invitation>(
            `/api/invitations/${invitationId}/decline`
        );

    return response.data;
}

export async function revoke(
    invitationId: string,
    authHeader: string
) {
    const response =
        await api(authHeader).post<Invitation>(
            `/api/invitations/${invitationId}/revoke`
        );

    return response.data;
}