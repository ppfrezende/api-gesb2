import { TechnicianExpense, Prisma } from '@prisma/client';

export interface TechnicianExpensesRepository {
  findById(id: string): Promise<TechnicianExpense | null>;
  listMany(page: number): Promise<TechnicianExpense[]>;
  listAllTechnicianExpensesTrash(): Promise<TechnicianExpense[]>;
  listManyByTechnicianId(
    technicianId: string,
    page: number,
  ): Promise<TechnicianExpense[]>;
  totalAnualTechniciansExpensesValue(year: number): Promise<number>;
  totalMonthlyTechniciansExpensesValue(
    year: number,
    month: number,
  ): Promise<number>;
  createMany(data: Prisma.TechnicianExpenseCreateManyInput[]): Promise<void>;
  delete(id: string, deletedBy: string): Promise<unknown>;
  deleteMany(technicianId: string, deletedBy: string): Promise<unknown>;
}
