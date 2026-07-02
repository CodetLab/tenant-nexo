import localApi from "../api/local.client";

export type CreateOrganizationDto = {
    name: string;
    slug: string;
};

export type UpdateOrganizationDto = {
    name: string;
    slug: string;
};

export function getOrganizations() {
    return localApi
        .get("/organizations")
        .then((res) => res.data);
}

export function getMyOrganization() {
    return localApi
        .get("/organizations/my")
        .then((res) => res.data);
}

export function createOrganization(
    payload: CreateOrganizationDto
) {
    return localApi
        .post("/organizations", payload)
        .then((res) => res.data);
}

export function updateOrganization(
    id: string,
    payload: UpdateOrganizationDto
) {
    return localApi
        .patch(`/organizations/${id}`, payload)
        .then((res) => res.data);
}

export function getOrganizationMembers(
    id: string
) {
    return localApi
        .get(`/organizations/${id}/members`)
        .then((res) => res.data);
}

export function inviteMember(
    id: string,
    email: string
) {
    return localApi
        .post(`/organizations/${id}/invitations`, {
            email,
        })
        .then((res) => res.data);
}

export function getInvitations(
    id: string
) {
    return localApi
        .get(`/organizations/${id}/invitations`)
        .then((res) => res.data);
}

export function acceptInvitation(
    token: string
) {
    return localApi
        .post(`/organizations/invitations/${token}/accept`)
        .then((res) => res.data);
}

export function removeMember(
    organizationId: string,
    profileId: number
) {
    return localApi
        .delete(
            `/organizations/${organizationId}/members/${profileId}`
        )
        .then((res) => res.data);
}

export function leaveOrganization(
    organizationId: string
) {
    return localApi
        .delete(
            `/organizations/${organizationId}/leave`
        )
        .then((res) => res.data);
}