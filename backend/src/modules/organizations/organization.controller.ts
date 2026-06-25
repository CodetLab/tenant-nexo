import { Request, Response } from "express";

import * as service from "./organization.service";

export async function create(
  req: Request,
  res: Response
) {
  const organization =
    await service.create(
      req.body.name,
      req.body.slug,
      req.context!.profileId!
    );

  res.status(201).json(
    organization
  );
}

export async function my(
  req: Request,
  res: Response
) {
  const organization =
    await service.my(
      req.context!.profileId!
    );

  res.json(organization);
}

export async function list(
  req: Request,
  res: Response
) {
  const organizations =
    await service.list();

  res.json(organizations);
}