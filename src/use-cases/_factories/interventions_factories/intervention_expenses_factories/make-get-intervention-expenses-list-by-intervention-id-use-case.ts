import { PrismaInterventionExpensesRepository } from '@/repositories/prisma/prisma-intervention-expenses-repository';
import { GetInterventionExpensesListByInterventionIdUseCase } from '@/use-cases/interventions/intervention-expenses/get-intervention-expenses-list-by-intervention-id';

export function makeGetInterventionExpensesListByInterventionIdUseCase() {
  const prismaInterventionExpensesRepository =
    new PrismaInterventionExpensesRepository();
  const useCase = new GetInterventionExpensesListByInterventionIdUseCase(
    prismaInterventionExpensesRepository,
  );

  return useCase;
}
