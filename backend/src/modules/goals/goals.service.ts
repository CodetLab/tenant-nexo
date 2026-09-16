import { GoalsRepository } from "./goals.repository";

export const GoalsService = {
  findByStudent: (studentId: string) => {
    return GoalsRepository.findByStudent(studentId);
  },

  create: (data: any) => {
    if (!data.title) {
      throw new Error("title required");
    }

    return GoalsRepository.create(data);
  },
};