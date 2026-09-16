import { StudentsRepository } from "./students.repository";

export const StudentsService = {
  findAll: (orgId: string) => {
    return StudentsRepository.findAll(orgId);
  },

  findById: (id: string) => {
    return StudentsRepository.findById(id);
  },

  create: (data: any) => {
    return StudentsRepository.create(data);
  },
};