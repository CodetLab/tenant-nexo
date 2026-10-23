import type { Request, Response, NextFunction } from "express";

import {
  createStudentService,
  listStudentsService,
  findStudentByIdService,
} from "./students.service";

import {
  findProfileByTenantUserId,
  findOrganizationMembership,
} from "../organizations/organization.repository";

interface AuthenticatedRequest extends Request {
  context?: {
    userId: number;
    appId: number;
    role?: string;
    email?: string;
    name?: string;
  };
}

function getStringParam(
  value: string | string[] | undefined,
  name: string,
): string {
  if (typeof value !== "string" || !value.trim()) {
    const error = new Error(`El parámetro ${name} es inválido.`) as Error & {
      statusCode: number;
    };

    error.statusCode = 400;
    throw error;
  }

  return value;
}

async function getAuthorizedOrganization(
  req: AuthenticatedRequest,
  organizationId: string,
): Promise<string> {
  const tenantUserId = req.context?.userId;

  if (tenantUserId == null) {
    const error = new Error("Usuario no autenticado.") as Error & {
      statusCode: number;
    };

    error.statusCode = 401;
    throw error;
  }

  const profile = await findProfileByTenantUserId(tenantUserId);

  if (!profile) {
    const error = new Error("Perfil no encontrado.") as Error & {
      statusCode: number;
    };

    error.statusCode = 403;
    throw error;
  }

  const membership = await findOrganizationMembership(
    organizationId,
    profile.id,
  );

  if (!membership) {
    const error = new Error(
      "No tienes acceso a esta organización.",
    ) as Error & { statusCode: number };

    error.statusCode = 403;
    throw error;
  }

  return organizationId;
}

export async function createStudentController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const organizationId = getStringParam(
      req.params.organizationId,
      "organizationId",
    );

    const authorizedOrganization = await getAuthorizedOrganization(
      req,
      organizationId,
    );

    const student = await createStudentService(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      authorizedOrganization,
    );

    res.status(201).json({
      data: student,
    });
  } catch (error) {
    next(error);
  }
}

export async function listStudentsController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const organizationId = getStringParam(
      req.params.organizationId,
      "organizationId",
    );

    const authorizedOrganization = await getAuthorizedOrganization(
      req,
      organizationId,
    );

    const students = await listStudentsService(authorizedOrganization);

    res.status(200).json({
      data: students,
    });
  } catch (error) {
    next(error);
  }
}

export async function findStudentByIdController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const organizationId = getStringParam(
      req.params.organizationId,
      "organizationId",
    );

    const studentId = getStringParam(req.params.studentId, "studentId");

    const authorizedOrganization = await getAuthorizedOrganization(
      req,
      organizationId,
    );

    const student = await findStudentByIdService(
      studentId,
      authorizedOrganization,
    );

    res.status(200).json({
      data: student,
    });
  } catch (error) {
    next(error);
  }
}
