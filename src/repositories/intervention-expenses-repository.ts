import { InterventionExpense, Prisma } from '@prisma/client';

export interface InterventionExpensesRepository {
  findById(id: string): Promise<InterventionExpense | null>;
  listMany(page: number): Promise<InterventionExpense[]>;
  listAll(): Promise<InterventionExpense[]>;
  listManyByInterventionId(
    interventionId: string,
    page: number,
  ): Promise<InterventionExpense[]>;
  createMany(data: Prisma.InterventionExpenseCreateManyInput[]): Promise<void>;
  delete(id: string): Promise<unknown>;
  deleteMany(interventionId: string): Promise<unknown>;
}
