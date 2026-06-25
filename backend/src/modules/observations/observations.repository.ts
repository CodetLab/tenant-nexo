// modules/observations/observations.repository.ts
import { supabase } from "../../db/supabase";

export const ObservationsRepository = {
  findByStudent: (studentId: string) => {
    return supabase
      .from("observations")
      .select("*")
      .eq("student_id", studentId);
  },

  create: (data: any) => {
    return supabase.from("observations").insert(data).select("*").single();
  },

  findAllByOrg: (organizationId: string) => {
    return supabase
      .from("observations")
      .select("*")
      .eq("organization_id", organizationId);
  },
};