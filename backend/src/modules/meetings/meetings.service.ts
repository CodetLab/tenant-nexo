import { MeetingsRepository } from "./meetings.repository";

export const MeetingsService = {
  findAll: (organizationId: string) => {
    return MeetingsRepository.findAll(organizationId);
  },

  findById: (id: string) => {
    return MeetingsRepository.findById(id);
  },

  create: (data: any) => {
    if (!data.title) {
      throw new Error("title required");
    }

    return MeetingsRepository.create(data);
  },
};