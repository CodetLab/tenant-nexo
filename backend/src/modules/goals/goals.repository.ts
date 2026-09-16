// modules/goals/goals.repository.ts
import { supabase } from "../../db/supabase";

export const GoalsRepository = {
  findByStudent: (studentId: string) => {
    return supabase.from("goals").select("*").eq("student_id", studentId);
  },

  create: (data: any) => {
    return supabase.from("goals").insert(data).select("*").single();
  },
};