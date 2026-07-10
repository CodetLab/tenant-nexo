import localApi from "../api/local.client";

export type CreateOrganizationDto = {
    name: string;
    slug: string;
};

export type UpdateOrganizationDto = {
    name: string;
    slug: string;
};

export type InviteMemberDto = {
    email: string;
    role: string;
};

export function getOrganizations() {
    return localApi
        .get("/organizations")
        .then(res => res.data);
}

export function createOrganization(
    payload: CreateOrganizationDto
) {
    return localApi
        .post("/organizations", payload)
        .then(res => res.data);
}

export function updateOrganization(
    id: string,
    payload: UpdateOrganizationDto
) {
    return localApi
        .patch(`/organizations/${id}`, payload)
        .then(res => res.data);
}

export function getOrganizationMembers(
    organizationId: string
) {
    return localApi
        .get(`/organizations/${organizationId}/members`)
        .then(res => res.data);
}

export function inviteMember(
    organizationId: string,
    payload: InviteMemberDto
) {
    return localApi
        .post(
            `/organizations/${organizationId}/invitations`,
            payload
        )
        .then(res => res.data);
}

export function getInvitations(
    organizationId: string
) {
    return localApi
        .get(
            `/organizations/${organizationId}/invitations`
        )
        .then(res => res.data);
}

export function acceptInvitation(
    token: string
) {
    return localApi
        .post(`/invitations/${token}/accept`)
        .then(res => res.data);
}

export function declineInvitation(
    token: string
) {
    return localApi
        .post(`/invitations/${token}/decline`)
        .then(res => res.data);
}

export function revokeInvitation(
    invitationId: string
) {
    return localApi
        .patch(
            `/invitations/${invitationId}/revoke`
        )
        .then(res => res.data);
}

export function removeMember(
    organizationId: string,
    profileId: number
) {
    return localApi
        .delete(
            `/organizations/${organizationId}/members/${profileId}`
        )
        .then(res => res.data);
}

export function leaveOrganization(
    organizationId: string
) {
    return localApi
        .post(
            `/organizations/${organizationId}/leave`
        )
        .then(res => res.data);
}