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

export async function list() {
    return repository.listOrganizations();
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
    const members =
        await repository.getMembers(
            organizationId
        );

    const alreadyMember =
        members.some(
            (member: any) =>
                member.profiles?.email === email
        );

    if (alreadyMember) {
        throw new Error(
            "User is already a member."
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