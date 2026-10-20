import { upsertNexoProfile } from "./sync.repository";

export async function syncNexoUser(
  tenantUserId: number,
  name: string,
  email: string,
) {
  return await upsertNexoProfile(tenantUserId, name, email);
}
