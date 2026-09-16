import { Request, Response } from "express";

import * as service from "./organization.service";

type Params = {
  id: string;
};

export async function create(
  req: Request,
  res: Response
) {
  const organization = await service.create(
    req.body.name,
    req.body.slug,
    req.context!.profileId!
  );

  res.status(201).json(organization);
}

export async function list(
  req: Request,
  res: Response
) {
  const organizations = await service.list(
    req.context!.profileId!
  );

  res.json(organizations);
}
export async function update(
  req: Request<Params>,
  res: Response
) {
  const organization =
    await service.update(
      req.params.id,
      req.body.name,
      req.body.slug
    );

  res.json(organization);
}

export async function members(
  req: Request<Params>,
  res: Response
) {
  const members =
    await service.members(
      req.params.id
    );

  res.json(members);
}

export async function invite(
  req: Request<Params>,
  res: Response
) {
  const invitation =
    await service.invite(
      req.params.id,
      req.body.email,
      req.body.role,
      req.context!.profileId!
    );

  res.status(201).json(invitation);
}

export const leave = async (req: Request, res: Response) => {
  await service.leaveO(
    String(req.params.id),
    req.context!.profileId!
  );

  res.json({
    success: true,
  });
};