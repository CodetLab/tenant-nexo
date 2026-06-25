import * as repository from "./organization.repository";

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