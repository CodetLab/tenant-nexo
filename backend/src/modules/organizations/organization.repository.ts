import { supabase } from "../../db/supabase";

export async function createOrganization(
    name: string,
    slug: string,
    profileId: number
) {
    const { data: organization, error } =
        await supabase
            .from("organizations")
            .insert({
                name,
                slug,
                owner_profile_id: profileId,
            })
            .select()
            .single();

    if (error) {
        throw error;
    }

    const { error: memberError } =
        await supabase
            .from("organization_members")
            .insert({
                organization_id: organization.id,
                profile_id: profileId,
                role: "owner",
            });

    if (memberError) {
        throw memberError;
    }

    return organization;
}

export async function findMyOrganization(
    profileId: number
) {
    const { data: membership, error } =
        await supabase
            .from("organization_members")
            .select("organization_id")
            .eq("profile_id", profileId)
            .single();

    if (error || !membership) {
        return null;
    }

    const { data: organization, error: orgError } =
        await supabase
            .from("organizations")
            .select("*")
            .eq(
                "id",
                membership.organization_id
            )
            .single();

    if (orgError) {
        throw orgError;
    }

    return organization;
}

export async function listOrganizations() {
    const { data, error } =
        await supabase
            .from("organizations")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

    if (error) {
        throw error;
    }

    return data;
}