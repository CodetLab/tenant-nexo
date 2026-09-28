import { supabase } from "../../db/supabase";

export const StudentsRepository = {
  findAll: async (organizationId: string) => {
    return supabase.from("nexo_students").select("*").eq("organization_id", organizationId);
  },

  findById: async (id: string) => {
    return supabase.from("nexo_students").select("*").eq("id", id);
  },

  create: async (data: any) => {
    return supabase.from("nexo_students").insert(data).select("*").single();
  },
};