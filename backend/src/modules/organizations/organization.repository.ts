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

export async function listOrganizations(
    profileId: number
) {
    const { data, error } = await supabase
        .from("organizations")
        .select(`
      *,
      organization_members!inner (
        profile_id
      )
    `)
        .eq("organization_members.profile_id", profileId)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw error;
    }

    return data;
}

export async function updateOrganization(
    id: string,
    name: string,
    slug: string
) {
    const { data, error } = await supabase
        .from("organizations")
        .update({
            name,
            slug,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function getMembers(
    organizationId: string
) {
    const { data, error } = await supabase
        .from("organization_members")
        .select(`
      role,
      created_at,
      profiles (
        id,
        name,
        email
      )
    `)
        .eq("organization_id", organizationId);

    if (error) throw error;

    return data;
}
export async function findMemberRole(
    organizationId: string,
    profileId: number
) {
    const { data, error } = await supabase
        .from("organization_members")
        .select("role")
        .eq("organization_id", organizationId)
        .eq("profile_id", profileId)
        .maybeSingle();

    if (error) throw error;

    return data?.role ?? null;
}
export async function addMember(
    organizationId: string,
    profileId: number,
    role: string
) {
    const { data, error } = await supabase
        .from("organization_members")
        .insert({
            organization_id: organizationId,
            profile_id: profileId,
            role,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function removeMember(
    organizationId: string,
    profileId: number
) {
    const { error } = await supabase
        .from("organization_members")
        .delete()
        .eq("organization_id", organizationId)
        .eq("profile_id", profileId);

    if (error) throw error;
}

export async function leaveOrganization(
    organizationId: string,
    profileId: number
) {
    const { error } = await supabase
        .from("organization_members")
        .delete()
        .eq("organization_id", organizationId)
        .eq("profile_id", profileId);

}