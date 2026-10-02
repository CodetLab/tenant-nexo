import * as repository from "./organization.repository";

export async function list(
    tenantUserId: number
) {
    return repository.listOrganizations(
        tenantUserId
    );
}