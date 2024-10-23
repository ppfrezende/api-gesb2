import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { GetInterventionExpensesListUseCase } from '@/use-cases/interventions/intervention-expenses/get-intervention-expenses-list';

export function makeGetInterventionExpensesListUseCase() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new GetInterventionExpensesListUseCase(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
