import { MeetingsService } from "./meetings.service";

export const MeetingsController = {
  findAll: async (req: any, res: any) => {
    const data = await MeetingsService.findAll(req.organizationId);
    res.json(data);
  },

  findById: async (req: any, res: any) => {
    const data = await MeetingsService.findById(req.params.id);
    res.json(data);
  },

  create: async (req: any, res: any) => {
    const data = await MeetingsService.create({
      ...req.body,
      organization_id: req.organizationId,
      created_by: req.user.sub,
    });

    res.json(data);
  },
};