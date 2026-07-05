import * as repository from "./organization.repository";
import * as invitationService from "../invitations/invitation.service";
export async function create(
    name: string,
    slug: string,
    profileId: number
) {
    return repository.createOrganization(
        name,
        slug,
        profileId
    );
}

export async function my(
    profileId: number
) {
    return repository.findMyOrganization(
        profileId
    );
}

export async function leaveO(
    organizationId: string,
    profileId: number
) {
    return repository.leaveOrganization(
        organizationId,
        profileId
    );
}

export async function list(profileId: number) {
    return repository.listOrganizations(profileId);
}
export async function update(
    id: string,
    name: string,
    slug: string
) {
    return repository.updateOrganization(
        id,
        name,
        slug
    );
}

export async function members(
    organizationId: string
) {
    return repository.getMembers(
        organizationId
    );
}


export async function invite(
    organizationId: string,
    email: string,
    role: string,
    invitedBy: number
) {
    const memberRole =
        await repository.findMemberRole(
            organizationId,
            invitedBy
        );

    if (
        memberRole !== "owner" &&
        memberRole !== "admin"
    ) {
        throw new Error(
            "Only owners and admins can invite members."
        );
    }

    return invitationService.create(
        organizationId,
        "organization",
        email,
        role,
        invitedBy
    );
}