import {
  createStudent,
  listStudents,
  findStudentById,
} from "./students.repository";

export interface CreateStudentServiceInput {
  firstName: string;
  lastName: string;
}

export class StudentsServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "StudentsServiceError";
  }
}

export async function createStudentService(
  input: CreateStudentServiceInput,
  organizationId: string,
) {
  if (!organizationId) {
    throw new StudentsServiceError(
      "Organización no autorizada.",
      "ORGANIZATION_FORBIDDEN",
      403,
    );
  }

  const firstName = input.firstName?.trim();
  const lastName = input.lastName?.trim();

  if (!firstName) {
    throw new StudentsServiceError(
      "El nombre del estudiante es obligatorio.",
      "STUDENT_FIRST_NAME_REQUIRED",
      400,
    );
  }

  if (!lastName) {
    throw new StudentsServiceError(
      "El apellido del estudiante es obligatorio.",
      "STUDENT_LAST_NAME_REQUIRED",
      400,
    );
  }

  return createStudent({
    organizationId,
    firstName,
    lastName,
  });
}

export async function listStudentsService(organizationId: string) {
  if (!organizationId) {
    throw new StudentsServiceError(
      "Organización no autorizada.",
      "ORGANIZATION_FORBIDDEN",
      403,
    );
  }

  return listStudents(organizationId);
}

export async function findStudentByIdService(
  studentId: string,
  organizationId: string,
) {
  if (!organizationId) {
    throw new StudentsServiceError(
      "Organización no autorizada.",
      "ORGANIZATION_FORBIDDEN",
      403,
    );
  }

  if (
    !studentId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      studentId,
    )
  ) {
    throw new StudentsServiceError(
      "El identificador del estudiante no es válido.",
      "STUDENT_ID_INVALID",
      400,
    );
  }

  const student = await findStudentById(studentId, organizationId);

  if (!student) {
    throw new StudentsServiceError(
      "Estudiante no encontrado.",
      "STUDENT_NOT_FOUND",
      404,
    );
  }

  return student;
}
