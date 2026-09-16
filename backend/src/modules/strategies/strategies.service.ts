import { StrategiesRepository } from "./strategies.repository";

export const StrategiesService = {
  findAll: (organizationId: string) => {
    return StrategiesRepository.findAll(organizationId);
  },

  findById: (id: string) => {
    return StrategiesRepository.findById(id);
  },

  create: (data: any) => {
    if (!data.title || !data.description) {
      throw new Error("missing fields");
    }

    return StrategiesRepository.create(data);
  },
};