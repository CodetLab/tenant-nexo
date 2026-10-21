import localApi from "../api/local.client";

export type CreateOrganizationDto = {
  name: string;
};

export type UpdateOrganizationDto = {
  name?: string;
};

export type InviteMemberDto = {
  email: string;
  role: string;
};

export async function getOrganizations() {
  const { data } = await localApi.get("/organizations");
  return data;
}

export async function createOrganization(payload: CreateOrganizationDto) {
  const { data } = await localApi.post("/organizations", {
    name: payload.name.trim(),
  });

  return data;
}

export async function updateOrganization(
  id: string,
  payload: UpdateOrganizationDto,
) {
  const { data } = await localApi.patch(`/organizations/${id}`, payload);

  return data;
}

export async function getOrganizationMembers(organizationId: string) {
  const { data } = await localApi.get(
    `/organizations/${organizationId}/members`,
  );

  return data;
}

export async function inviteMember(
  organizationId: string,
  payload: InviteMemberDto,
) {
  const { data } = await localApi.post(
    `/organizations/${organizationId}/invitations`,
    payload,
  );

  return data;
}

export async function getInvitations(organizationId: string) {
  const { data } = await localApi.get(
    `/organizations/${organizationId}/invitations`,
  );

  return data;
}

export async function acceptInvitation(token: string) {
  const { data } = await localApi.post(`/invitations/${token}/accept`);

  return data;
}

export async function declineInvitation(token: string) {
  const { data } = await localApi.post(`/invitations/${token}/decline`);

  return data;
}

export async function revokeInvitation(invitationId: string) {
  const { data } = await localApi.patch(`/invitations/${invitationId}/revoke`);

  return data;
}

export async function removeMember(organizationId: string, profileId: number) {
  const { data } = await localApi.delete(
    `/organizations/${organizationId}/members/${profileId}`,
  );

  return data;
}

export async function leaveOrganization(organizationId: string) {
  const { data } = await localApi.post(
    `/organizations/${organizationId}/leave`,
  );

  return data;
}

export async function deleteOrganization(organizationId: string) {
  const { data } = await localApi.delete(`/organizations/${organizationId}`);

  return data;
}

