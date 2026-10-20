import { supabase } from "../../db/supabase";

export async function upsertNexoProfile(
    tenantUserId: number,
    name: string,
    email: string,
) {
    const { data, error } = await supabase
        .from("nexo_profiles")
        .upsert(
            {
                tenant_user_id: tenantUserId,
                name,
                email,
            },
            {
                onConflict: "tenant_user_id",
            },
        )
        .select("*")
        .single();

    if (error) {
        throw error;
    }

    return data;
}