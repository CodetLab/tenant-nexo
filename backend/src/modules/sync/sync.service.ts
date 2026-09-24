import { upsertSentinelProfile } from "./sync.repository";

export async function syncUser(
  tenantUserId: number,
  name: string,
  email: string,
) {
  return await upsertSentinelProfile(tenantUserId, name, email);
}
