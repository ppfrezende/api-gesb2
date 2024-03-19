import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository';
import { GetExpensesListByTechIdUseCase } from '@/use-cases/expenses/get-expenses-list-by-tech-id';

export function makeGetExpensesListByTechIdUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const useCase = new GetExpensesListByTechIdUseCase(prismaExpensesRepository);

  return useCase;
}
