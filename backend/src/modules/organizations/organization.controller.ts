import { Request, Response } from "express";
import * as service from "./organization.service";

export async function list(req: Request, res: Response) {
  try {
    const tenantUserId = req.context?.userId;

    if (!tenantUserId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const organizations = await service.list(tenantUserId);
    console.dir(organizations, { depth: null });
    return res.status(200).json(organizations);
  } catch (error) {
    console.error("[ORGANIZATIONS:LIST]", error);

    return res.status(500).json({
      error: "Failed to fetch organizations",
    });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const tenantUserId = req.context?.userId;

    if (!tenantUserId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const { name } = req.body ?? {};

    if (
      typeof name !== "string" ||
      name.trim().length === 0 ||
      name.trim().length > 120
    ) {
      return res.status(400).json({
        error: "Name must be between 1 and 120 characters",
      });
    }

    const organization = await service.create(tenantUserId, {
      name: name.trim(),
    });

    return res.status(201).json(organization);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "PROFILE_NOT_FOUND") {
        return res.status(404).json({
          error: "User profile not found",
        });
      }

      if (error.message === "ORGANIZATION_SLUG_CONFLICT") {
        return res.status(409).json({
          error: "Organization slug already exists",
        });
      }

      if (error.message === "INVALID_ORGANIZATION_NAME") {
        return res.status(400).json({
          error: "Invalid organization name",
        });
      }
    }

    console.error("[ORGANIZATIONS:CREATE]", error);

    return res.status(500).json({
      error: "Failed to create organization",
    });
  }
}

export async function leave(req: Request, res: Response) {
  try {
    const tenantUserId = req.context?.userId;

    if (!tenantUserId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        error: "El identificador de la organización no es válido.",
      });
      return;
    }

    await service.leave(tenantUserId, id);

    return res.status(200).json({
      message: "Left organization successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "ORGANIZATION_NOT_FOUND") {
        return res.status(404).json({
          error: "Organization not found",
        });
      }

      if (error.message === "NOT_A_MEMBER") {
        return res.status(403).json({
          error: "You are not a member of this organization",
        });
      }

      if (error.message === "OWNER_MUST_DELETE_OR_TRANSFER") {
        return res.status(409).json({
          error: "The owner must delete the organization or transfer ownership",
        });
      }

      if (error.message === "ORGANIZATION_HAS_DEPENDENT_DATA") {
        return res.status(409).json({
          error:
            "The organization contains related data and cannot be deleted automatically",
        });
      }
    }

    console.error("[ORGANIZATIONS:LEAVE]", error);

    return res.status(500).json({
      error: "Failed to leave organization",
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const tenantUserId = req.context?.userId;

    if (!tenantUserId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        error: "El identificador de la organización no es válido.",
      });
      return;
    }

    await service.remove(tenantUserId, id);

    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "ORGANIZATION_NOT_FOUND") {
        return res.status(404).json({
          error: "Organization not found",
        });
      }

      if (error.message === "NOT_ORGANIZATION_OWNER") {
        return res.status(403).json({
          error: "Only the organization owner can delete it",
        });
      }

      if (error.message === "ORGANIZATION_HAS_DEPENDENT_DATA") {
        return res.status(409).json({
          error:
            "Delete or migrate the related data before deleting this organization",
        });
      }
    }

    console.error("[ORGANIZATIONS:DELETE]", error);

    return res.status(500).json({
      error: "Failed to delete organization",
    });
  }
}
