import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository';
import { DeleteExpenseUseCase } from '@/use-cases/expenses/delete-expense';

export function makeDeleteExpenseUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const useCase = new DeleteExpenseUseCase(prismaExpensesRepository);

  return useCase;
}
