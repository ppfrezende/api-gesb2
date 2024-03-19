import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository';
import { GetExpensesListByInterventionIdUseCase } from '@/use-cases/expenses/get-expenses-list-by-intervention-id';

export function makeGetExpensesListByInterventionIdUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const useCase = new GetExpensesListByInterventionIdUseCase(
    prismaExpensesRepository,
  );

  return useCase;
}
