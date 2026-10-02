import { supabase } from "../../db/supabase";

export async function findProfileByTenantUserId(
    tenantUserId: number
) {
    const { data, error } = await supabase
        .from("nexo_profiles")
        .select("id")
        .eq("tenant_user_id", tenantUserId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
}

export async function listOrganizations(
    tenantUserId: number
) {
    const profile = await findProfileByTenantUserId(
        tenantUserId
    );

    if (!profile) {
        return [];
    }

    const { data, error } = await supabase
        .from("nexo_organizations")
        .select(`
            *,
            nexo_organization_members!inner (
                profile_id,
                role
            )
        `)
        .eq(
            "nexo_organization_members.profile_id",
            profile.id
        )
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw error;
    }

    return data;
}