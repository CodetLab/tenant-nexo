// modules/meetings/meetings.repository.ts
import { supabase } from "../../db/supabase";

export const MeetingsRepository = {
  findAll: (organizationId: string) => {
    return supabase
      .from("meetings")
      .select("*")
      .eq("organization_id", organizationId);
  },

  create: (data: any) => {
    return supabase.from("meetings").insert(data).select("*").single();
  },

  findById: (id: string) => {
    return supabase.from("meetings").select("*").eq("id", id).single();
  },
};