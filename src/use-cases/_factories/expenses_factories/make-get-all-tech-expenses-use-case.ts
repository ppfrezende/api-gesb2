import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository';
import { GetAllTechExpensesListUseCase } from '@/use-cases/expenses/get-all-tech-expenses';

export function makeGetAllTechExpensesListUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const useCase = new GetAllTechExpensesListUseCase(prismaExpensesRepository);

  return useCase;
}
