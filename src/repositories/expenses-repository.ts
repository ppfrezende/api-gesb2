import { Expense, Prisma } from '@prisma/client';

export interface ExpensesRepository {
  findById(id: string): Promise<Expense | null>;
  findByTechnicianId(technicianId: string): Promise<Expense[] | null>;
  findByInterventionId(interventionId: string): Promise<Expense[] | null>;
  listManyByTechnicianId(
    technicianId: string,
    page: number,
  ): Promise<Expense[]>;
  listManyByInterventionId(
    interventionId: string,
    page: number,
  ): Promise<Expense[]>;
  listMany(page: number): Promise<Expense[]>;
  createMany(data: Prisma.ExpenseCreateManyInput[]): Promise<void>;
  delete(id: string): Promise<unknown>;
  deleteMany(interventionId: string): Promise<unknown>;
}
