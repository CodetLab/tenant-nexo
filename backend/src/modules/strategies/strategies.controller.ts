import { StrategiesService } from "./strategies.service";

export const StrategiesController = {
  findAll: async (req: any, res: any) => {
    const data = await StrategiesService.findAll(req.organizationId);
    res.json(data);
  },

  findById: async (req: any, res: any) => {
    const data = await StrategiesService.findById(req.params.id);
    res.json(data);
  },

  create: async (req: any, res: any) => {
    const data = await StrategiesService.create({
      ...req.body,
      organization_id: req.organizationId,
      created_by: req.user.sub,
    });

    res.json(data);
  },
};