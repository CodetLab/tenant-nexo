
import * as repository from "./organization.repository";

interface CreateOrganizationInput {
    name: string;
}

export async function list(tenantUserId: number) {
    return repository.listOrganizations(tenantUserId);
}

export async function create(
    tenantUserId: number,
    input: CreateOrganizationInput
) {
    const name = input.name.trim();

    if (!name || name.length > 120) {
        throw new Error("INVALID_ORGANIZATION_NAME");
    }

    const profile = await repository.findProfileByTenantUserId(
        tenantUserId
    );

    if (!profile) {
        throw new Error("PROFILE_NOT_FOUND");
    }

    const slug = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80)
        .replace(/-+$/g, "");

    if (!slug) {
        throw new Error("INVALID_ORGANIZATION_NAME");
    }

    return repository.createOrganization({
        name,
        slug,
        ownerProfileId: profile.id,
    });
}


export async function leave(