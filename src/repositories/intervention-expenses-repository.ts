import { InterventionExpense, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export interface InterventionExpensesRepository {
  findById(id: string): Promise<InterventionExpense | null>;
  listMany(page: number): Promise<InterventionExpense[]>;
  listAll(): Promise<InterventionExpense[]>;
  listAllInterventionExpensesTrash(): Promise<InterventionExpense[]>;
  listManyByInterventionId(
    interventionId: string,
    page: number,
  ): Promise<InterventionExpense[]>;
  totalAnualInterventionsExpensesValue(year: number): Promise<Decimal | 0>;
  totalMonthlyInterventionsExpensesValue(
    year: number,
    month: number,
  ): Promise<Decimal | 0>;
  createMany(data: Prisma.InterventionExpenseCreateManyInput[]): Promise<void>;
  delete(id: string, deletedBy: string): Promise<unknown>;
  deleteMany(interventionId: string, deletedBy: string): Promise<unknown>;
}
