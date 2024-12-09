import { InterventionExpense, Prisma } from '@prisma/client';

export interface InterventionExpensesRepository {
  findById(id: string): Promise<InterventionExpense | null>;
  listMany(page: number): Promise<InterventionExpense[]>;
  listAll(): Promise<InterventionExpense[]>;
  listAllInterventionExpensesTrash(): Promise<InterventionExpense[]>;
  listManyByInterventionId(
    interventionId: string,
    page: number,
  ): Promise<InterventionExpense[]>;
  totalAnualInterventionsExpensesValue(year: number): Promise<number>;
  totalMonthlyInterventionsExpensesValue(
    year: number,
    month: number,
  ): Promise<number>;
  createMany(data: Prisma.InterventionExpenseCreateManyInput[]): Promise<void>;
  delete(id: string, deletedBy: string): Promise<unknown>;
  deleteMany(interventionId: string, deletedBy: string): Promise<unknown>;
}
