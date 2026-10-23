import api from "../api/local.client";

export interface Student {
  id: string;
  organization_id: string;
  first_name: string;
  last_name: string;
  diagnosis: string | null;
  status: string;
  created_at: string;
}

export interface CreateStudentInput {
  firstName: string;
  lastName: string;
}

interface ApiResponse<T> {
  data: T;
}

export async function createStudent(
  organizationId: string,
  input: CreateStudentInput,
): Promise<Student> {
  const response = await api.post<ApiResponse<Student>>(
    `/organizations/${organizationId}/students`,
    input,
  );

  return response.data.data;
}

export async function listStudents(organizationId: string): Promise<Student[]> {
  const response = await api.get<ApiResponse<Student[]>>(
    `/organizations/${organizationId}/students`,
  );

  return response.data.data;
}

export async function findStudentById(
  organizationId: string,
  studentId: string,
): Promise<Student> {
  const response = await api.get<ApiResponse<Student>>(
    `/organizations/${organizationId}/students/${studentId}`,
  );

  return response.data.data;
}
