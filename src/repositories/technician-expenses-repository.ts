import { TechnicianExpense, Prisma } from '@prisma/client';

export interface TechnicianExpensesRepository {
  findById(id: string): Promise<TechnicianExpense | null>;
  listMany(page: number): Promise<TechnicianExpense[]>;
  listManyByTechnicianId(
    technicianId: string,
    page: number,
  ): Promise<TechnicianExpense[]>;
  createMany(data: Prisma.TechnicianExpenseCreateManyInput[]): Promise<void>;
  delete(id: string): Promise<unknown>;
  deleteMany(technicianId: string): Promise<unknown>;
}
