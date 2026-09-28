// modules/strategies/strategies.repository.ts
import { supabase } from "../../db/supabase";

export const StrategiesRepository = {
  findAll: (organizationId: string) => {
    return supabase
      .from("nexo_strategies")
      .select("*")
      .eq("organization_id", organizationId);
  },

  create: (data: any) => {
    return supabase.from("nexo_strategies").insert(data).select("*").single();
  },

  findById: (id: string) => {
    return supabase.from("nexo_strategies").select("*").eq("id", id).single();
  },
};