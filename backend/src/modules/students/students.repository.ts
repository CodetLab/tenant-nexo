import { supabase } from "../../db/supabase";

export interface CreateStudentInput {
  organizationId: string;
  firstName: string;
  lastName: string;
}

export async function createStudent(input: CreateStudentInput) {
  const { data, error } = await supabase
    .from("nexo_students")
    .insert({
      organization_id: input.organizationId,
      first_name: input.firstName,
      last_name: input.lastName,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function listStudents(organizationId: string) {
  const { data, error } = await supabase
    .from("nexo_students")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function findStudentById(
  studentId: string,
  organizationId: string,
) {
  const { data, error } = await supabase
    .from("nexo_students")
    .select("*")
    .eq("id", studentId)
    .eq("organization_id", organizationId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
