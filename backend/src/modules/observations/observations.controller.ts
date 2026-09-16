// modules/observations/observations.controller.ts
import { ObservationsRepository } from "./observations.repository";

export const ObservationsController = {
  findByStudent: async (req: any, res: any) => {
    const data = await ObservationsRepository.findByStudent(
      req.params.studentId
    );
    res.json(data);
  },

  findAll: async (req: any, res: any) => {
    const data = await ObservationsRepository.findAllByOrg(
      req.organizationId
    );
    res.json(data);
  },

  create: async (req: any, res: any) => {
    const data = await ObservationsRepository.create({
      ...req.body,
      user_id: req.user.sub,
      organization_id: req.organizationId,
    });

    res.json(data);
  },
};