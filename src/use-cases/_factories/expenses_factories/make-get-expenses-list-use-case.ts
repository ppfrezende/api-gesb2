import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository';
import { GetExpensesListUseCase } from '@/use-cases/expenses/get-expenses-list';

export function makeGetExpensesListUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const useCase = new GetExpensesListUseCase(prismaExpensesRepository);

  return useCase;
}
