import { GoalsService } from "./goals.service";

export const GoalsController = {
  findByStudent: async (req: any, res: any) => {
    const data = await GoalsService.findByStudent(req.params.studentId);
    res.json(data);
  },

  create: async (req: any, res: any) => {
    const data = await GoalsService.create({
      ...req.body,
      organization_id: req.organizationId,
    });

    res.json(data);
  },
};