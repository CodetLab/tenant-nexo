import * as repository from "./organization.repository";

interface CreateOrganizationInput {
  name: string;
}

function generateSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

function isForeignKeyViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23503"
  );
}

export async function list(tenantUserId: number) {
  return repository.listOrganizations(tenantUserId);
}

export async function create(
  tenantUserId: number,
  input: CreateOrganizationInput,
) {
  const name = input.name.trim();

  if (!name || name.length > 120) {
    throw new Error("INVALID_ORGANIZATION_NAME");
  }

  const profile = await repository.findProfileByTenantUserId(tenantUserId);

  if (!profile) {
    throw new Error("PROFILE_NOT_FOUND");
  }

  const slug = generateSlug(name);

  if (!slug) {
    throw new Error("INVALID_ORGANIZATION_NAME");
  }

  const organization = await repository.createOrganization({
    name,
    slug,
    ownerProfileId: profile.id,
  });

  try {
    await repository.createOrganizationOwnerMembership(
      organization.id,
      profile.id,
    );
  } catch (error) {
    try {
      await repository.deleteOrganizationById(organization.id);
    } catch {
      throw new Error("ORGANIZATION_CREATION_ROLLBACK_FAILED");
    }

    throw error;
  }

  return organization;
}

export async function leave(tenantUserId: number, organizationId: string) {
  const profile = await repository.findProfileByTenantUserId(tenantUserId);

  if (!profile) {
    throw new Error("PROFILE_NOT_FOUND");
  }

  const organization = await repository.findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("ORGANIZATION_NOT_FOUND");
  }

  const membership = await repository.findOrganizationMembership(
    organizationId,
    profile.id,
  );

  if (!membership) {
    throw new Error("NOT_A_MEMBER");
  }

  if (organization.owner_profile_id === profile.id) {
    throw new Error("OWNER_MUST_DELETE_OR_TRANSFER");
  }

  try {
    await repository.deleteOrganizationMembership(organizationId, profile.id);
  } catch (error) {
    if (isForeignKeyViolation(error)) {
      throw new Error("ORGANIZATION_HAS_DEPENDENT_DATA");
    }

    throw error;
  }

  return { success: true };
}

export async function remove(tenantUserId: number, organizationId: string) {
  const profile = await repository.findProfileByTenantUserId(tenantUserId);

  if (!profile) {
    throw new Error("PROFILE_NOT_FOUND");
  }

  const organization = await repository.findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("ORGANIZATION_NOT_FOUND");
  }

  if (organization.owner_profile_id !== profile.id) {
    throw new Error("NOT_ORGANIZATION_OWNER");
  }

  try {
    await repository.deleteOrganizationById(organizationId);
  } catch (error) {
    if (isForeignKeyViolation(error)) {
      throw new Error("ORGANIZATION_HAS_DEPENDENT_DATA");
    }

    throw error;
  }
}

