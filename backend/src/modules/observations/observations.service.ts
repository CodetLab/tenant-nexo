import { ObservationsRepository } from "./observations.repository";

export const ObservationsService = {
  findByStudent: (studentId: string) => {
    return ObservationsRepository.findByStudent(studentId);
  },

  create: (data: any) => {
    return ObservationsRepository.create(data);
  },
};