import { StudentsService } from "./students.service";

export const StudentsController = {
  findAll: async (req: any, res: any) => {
    const data = await StudentsService.findAll(req.organizationId);
    res.json(data);
  },

  findById: async (req: any, res: any) => {
    const data = await StudentsService.findById(req.params.id);
    res.json(data);
  },

  create: async (req: any, res: any) => {
    const payload = {
      ...req.body,
      organization_id: req.organizationId,
    };

    const data = await StudentsService.create(payload);
    res.json(data);
  },
};